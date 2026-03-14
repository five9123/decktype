import type { Card } from '@/types';
import type { RawCard } from '@/lib/card-utils';

/**
 * Share codec — encodes/decodes deck card data for URL hash sharing.
 *
 * URL format: typee.app/play/typetris#<encoded>
 * Payload:  { v:1, n:"deck name", c:[{f,b,p}, ...] }
 * Encoding: JSON → UTF-8 → deflate-raw → base64url  (prefix "1")
 * Fallback: JSON → UTF-8 → base64url                 (prefix "0")
 */

const MAX_ENCODED_LENGTH = 3500;
const MAX_CARDS = 200;

// ── Base64url helpers ────────────────────────────────────────────────

function uint8ToBase64url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlToUint8(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

// ── Compression helpers ──────────────────────────────────────────────

async function compress(data: Uint8Array): Promise<Uint8Array> {
  const blob = new Blob([data.buffer as ArrayBuffer]);
  const stream = blob.stream().pipeThrough(new CompressionStream('deflate-raw'));
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}

async function decompress(data: Uint8Array): Promise<Uint8Array> {
  const blob = new Blob([data.buffer as ArrayBuffer]);
  const stream = blob.stream().pipeThrough(new DecompressionStream('deflate-raw'));
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}

// ── Public API ───────────────────────────────────────────────────────

export async function encodeDeckForShare(
  name: string,
  cards: Card[],
): Promise<string> {
  const basicCards = cards.filter((c) => c.note_type !== 'Cloze');
  if (basicCards.length === 0) throw new Error('No typeable cards in this deck.');
  if (basicCards.length > MAX_CARDS) throw new Error(`Too many cards (max ${MAX_CARDS}).`);

  const payload = {
    v: 1,
    n: name,
    c: basicCards.map((c) => ({ f: c.front, b: c.back, p: c.pronunciation || '' })),
  };
  const json = JSON.stringify(payload);
  const raw = new TextEncoder().encode(json);

  // Try compressed first
  let encoded: string;
  try {
    const deflated = await compress(raw);
    encoded = '1' + uint8ToBase64url(deflated);
  } catch {
    // Fallback: uncompressed
    encoded = '0' + uint8ToBase64url(raw);
  }

  if (encoded.length > MAX_ENCODED_LENGTH) {
    throw new Error('Deck is too large to share via link. Try reducing the number of cards.');
  }

  return encoded;
}

export async function decodeDeckFromShare(
  hash: string,
): Promise<{ deckName: string; cards: RawCard[] }> {
  if (hash.length < 2) throw new Error('Invalid share data.');

  const version = hash[0];
  const data = hash.slice(1);
  const bytes = base64urlToUint8(data);

  let json: string;
  if (version === '1') {
    const inflated = await decompress(bytes);
    json = new TextDecoder().decode(inflated);
  } else {
    json = new TextDecoder().decode(bytes);
  }

  const payload = JSON.parse(json);

  // Validate structure
  if (!payload || typeof payload.n !== 'string' || !Array.isArray(payload.c)) {
    throw new Error('Invalid share data format.');
  }
  if (payload.c.length === 0) throw new Error('No cards in shared deck.');
  if (payload.c.length > MAX_CARDS) throw new Error('Too many cards.');

  const cards: RawCard[] = payload.c.map(
    (c: { f?: string; b?: string; p?: string }, i: number) => ({
      id: `shared-${i}`,
      front: String(c.f ?? ''),
      back: String(c.b ?? ''),
      pronunciation: String(c.p ?? ''),
      noteType: 'Basic',
    }),
  );

  return { deckName: payload.n, cards };
}
