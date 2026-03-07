import JSZip from 'jszip';
import type { ParsedCard, ParsedDeck } from '@/types';
import { cleanCardText, parseClozeCards, isCloze } from './card-cleaner';

/** Anki field separator (ASCII Unit Separator) */
const FIELD_SEPARATOR = '\x1f';

interface AnkiModel {
  name: string;
  flds: { name: string; ord: number }[];
}

type AnkiModels = Record<string, AnkiModel>;

/**
 * Initialize sql.js and return the SQL module.
 * The WASM binary must be served from /sql-wasm.wasm
 */
async function initSql() {
  const initSqlJs = (await import('sql.js')).default;
  return initSqlJs({
    locateFile: () => '/sql-wasm.wasm',
  });
}

/**
 * Parse an .apkg file and extract flashcards.
 *
 * Flow:
 * 1. Unzip with JSZip
 * 2. Find collection.anki21 or collection.anki2
 * 3. Open with sql.js (WASM SQLite)
 * 4. Extract notes.flds, split by \x1f
 * 5. Parse col.models for field names
 * 6. Clean each field (HTML strip, cloze parse, media remove)
 */
export async function parseApkg(
  file: File,
  onProgress?: (step: string) => void,
): Promise<ParsedDeck> {
  // Step 1: Unzip
  onProgress?.('Unzipping file...');
  const zip = await JSZip.loadAsync(file);

  // Step 2: Find the database file
  onProgress?.('Reading database...');
  const dbFileName = zip.file('collection.anki21')
    ? 'collection.anki21'
    : zip.file('collection.anki2')
    ? 'collection.anki2'
    : null;

  if (!dbFileName) {
    throw new Error('Invalid .apkg file: no collection database found');
  }

  const dbData = await zip.file(dbFileName)!.async('uint8array');

  // Step 3: Open SQLite database
  const SQL = await initSql();
  const db = new SQL.Database(dbData);

  try {
    // Step 4: Parse col.models for field names
    onProgress?.('Reading card models...');
    const colResult = db.exec('SELECT models FROM col');
    let models: AnkiModels = {};
    let deckName = 'Imported Deck';

    if (colResult.length > 0 && colResult[0].values.length > 0) {
      const modelsJson = colResult[0].values[0][0] as string;
      models = JSON.parse(modelsJson);

      // Try to get deck name
      try {
        const deckResult = db.exec('SELECT decks FROM col');
        if (deckResult.length > 0) {
          const decks = JSON.parse(deckResult[0].values[0][0] as string);
          const deckEntries = Object.values(decks) as { name: string }[];
          const nonDefault = deckEntries.find((d) => d.name !== 'Default');
          deckName = nonDefault?.name ?? deckEntries[0]?.name ?? 'Imported Deck';
        }
      } catch {
        // Keep default name
      }
    }

    // Get first model's field names (most decks have one model)
    const firstModel = Object.values(models)[0];
    const fieldNames = firstModel
      ? firstModel.flds.sort((a, b) => a.ord - b.ord).map((f) => f.name)
      : ['Front', 'Back'];

    // Step 5: Extract notes
    onProgress?.('Extracting cards...');
    const notesResult = db.exec('SELECT flds, mid FROM notes');

    if (notesResult.length === 0 || notesResult[0].values.length === 0) {
      throw new Error('No cards found in this deck');
    }

    const cards: ParsedCard[] = [];
    let lastModelFieldNames = fieldNames;

    for (const row of notesResult[0].values) {
      const fldsRaw = row[0] as string;
      const modelId = String(row[1]);
      const fields = fldsRaw.split(FIELD_SEPARATOR);

      const model = models[modelId];
      if (model) {
        lastModelFieldNames = model.flds.sort((a, b) => a.ord - b.ord).map((f) => f.name);
      }

      const firstField = fields[0] ?? '';

      // Detect note type
      if (isCloze(firstField)) {
        // Cloze card: generate one card per cloze deletion
        const clozeCards = parseClozeCards(firstField);
        for (const cc of clozeCards) {
          cards.push({
            front: cc.display,
            back: cc.answer,
            extra: fields.slice(1).map(cleanCardText).filter(Boolean).join(' | '),
            noteType: 'Cloze',
            rawFields: fields,
          });
        }
      } else {
        // Basic card (or multi-field)
        const front = cleanCardText(fields[0] ?? '');
        const back = cleanCardText(fields[1] ?? '');
        const extra = fields.slice(2).map(cleanCardText).filter(Boolean).join(' | ');

        if (front || back) {
          cards.push({
            front,
            back,
            extra,
            noteType: fields.length > 2 ? 'Custom' : 'Basic',
            rawFields: fields,
          });
        }
      }
    }

    onProgress?.(`Found ${cards.length} cards`);

    // Determine dominant note type
    const typeCounts = cards.reduce(
      (acc, c) => { acc[c.noteType] = (acc[c.noteType] ?? 0) + 1; return acc; },
      {} as Record<string, number>,
    );
    const dominantType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Basic';

    return {
      name: deckName,
      cards,
      fieldNames: lastModelFieldNames,
      noteType: dominantType,
    };
  } finally {
    db.close();
  }
}
