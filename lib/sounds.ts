// ── Typing Sound Effects Manager ──
// Uses Web Audio API for low-latency playback

type SoundType = 'mechanical' | 'soft' | 'typewriter';

let audioCtx: AudioContext | null = null;
const buffers = new Map<SoundType, AudioBuffer>();
let initialized = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/** Generate a short synthetic click sound */
function generateClickBuffer(ctx: AudioContext, type: SoundType): AudioBuffer {
  const sampleRate = ctx.sampleRate;

  // Duration and characteristics per sound type
  const configs: Record<SoundType, { duration: number; freq: number; decay: number; noise: number }> = {
    mechanical: { duration: 0.06, freq: 800, decay: 30, noise: 0.3 },
    soft: { duration: 0.03, freq: 400, decay: 50, noise: 0.1 },
    typewriter: { duration: 0.08, freq: 600, decay: 20, noise: 0.5 },
  };

  const config = configs[type];
  const length = Math.floor(sampleRate * config.duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    // Tone component
    const tone = Math.sin(2 * Math.PI * config.freq * t) * Math.exp(-config.decay * t);
    // Noise component
    const noise = (Math.random() * 2 - 1) * config.noise * Math.exp(-config.decay * 2 * t);
    data[i] = (tone + noise) * 0.15; // Keep volume low
  }

  return buffer;
}

/** Initialize audio buffers. Call on first user interaction. */
export function initSounds(): void {
  if (initialized) return;
  initialized = true;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Pre-generate all sound buffers
    const types: SoundType[] = ['mechanical', 'soft', 'typewriter'];
    for (const type of types) {
      buffers.set(type, generateClickBuffer(ctx, type));
    }
  } catch {
    // Web Audio API not available
  }
}

/** Play a keystroke sound */
export function playKeystroke(type: SoundType): void {
  if (!initialized) initSounds();

  try {
    const ctx = getAudioContext();
    const buffer = buffers.get(type);
    if (!buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  } catch {
    // Silently fail
  }
}
