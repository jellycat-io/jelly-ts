import * as map from "../core/resource_map";

/**
 * @module Audio
 */

// Resource map functions refs
export const unload = map.unload;
export const has = map.has;
export const get = map.get;

let mAudioContext: AudioContext | null;
let mBackgroundAudio: AudioBufferSourceNode | undefined;

// Volume control support
let mBackgroundGain: GainNode; // Background volume
let mCueGain: GainNode; // Cue / SFX volume
let mMasterGain: GainNode; // Master volume

const kDefaultInitGain = 0.1;

/**
 * @description Decode array buffer from response
 * @param {Response} data The response from the fetch
 * @returns {Promise<ArrayBuffer>} the array buffer containing audio source
 */
function decodeResource(data: Response): Promise<ArrayBuffer> {
  return data.arrayBuffer();
}

/**
 * @description Parses audio data from array buffer
 * @param {ArrayBuffer} data The audio data
 * @returns {Promise<AudioBuffer | undefined>} the parsed audio data
 */
async function parseResource(
  data: ArrayBuffer
): Promise<AudioBuffer | undefined> {
  return mAudioContext?.decodeAudioData(data);
}

/**
 * @description Loads audio source promise to be executed
 * @param {string} path The audio source file path
 * @returns {Promise<void> | undefined} the loaded promise
 */
export function load(path: string): Promise<void> | undefined {
  return map.loadDecodeParse<Promise<AudioBuffer | undefined>>(
    path,
    decodeResource,
    parseResource
  );
}

/**
 * @description Initializes Audio manager
 */
export function init() {
  try {
    mAudioContext = new AudioContext();

    // Connect master volume control
    mMasterGain = mAudioContext.createGain();
    mMasterGain.connect(mAudioContext.destination);
    // Set default master volume
    mMasterGain.gain.value = kDefaultInitGain;

    // Connect background volume control
    mBackgroundGain = mAudioContext.createGain();
    mBackgroundGain.connect(mAudioContext.destination);
    // Set default master volume
    mBackgroundGain.gain.value = 1.0;

    // Connect background volume control
    mCueGain = mAudioContext.createGain();
    mCueGain.connect(mAudioContext.destination);
    // Set default master volume
    mCueGain.gain.value = 1.0;
  } catch (e) {
    throw new Error("...");
  }
}

/**
 * @description Plays cue from file
 * @param {string} path The audio source file path
 * @param {number} volume The volume to set the cue on
 */
export function playCue(path: string, volume: number): void {
  const source = mAudioContext?.createBufferSource();
  if (source) {
    source.buffer = map.get(path);
    source.start(0);

    // Volume support for cue
    source.connect(mCueGain);
    mCueGain.gain.value = volume;
  }
}

/**
 * @description Plays background audio from file
 * @param {string} path The audio source file path
 * @param {number} volume The volume to set the background on
 */
export function playBackground(path: string, volume: number): void {
  if (has(path)) {
    stopBackground();
    mBackgroundAudio = mAudioContext?.createBufferSource();

    if (mBackgroundAudio) {
      mBackgroundAudio.buffer = map.get(path);
      mBackgroundAudio.loop = true;
      mBackgroundAudio.start(0);

      // Connect volume
      mBackgroundAudio.connect(mBackgroundGain);
      setBackgroundVolume(volume);
    }
  }
}

/**
 * @description Stops background sound
 */
export function stopBackground(): void {
  if (mBackgroundAudio) {
    mBackgroundAudio.stop(0);
    mBackgroundAudio = undefined;
  }
}

/**
 * @description Checks if background audio is playing
 * @returns {boolean} true if background is playing
 */
export function isBackgroundPlaying(): boolean {
  return mBackgroundAudio !== null;
}

/**
 * @description Sets the background audio volume
 * @param {number} volume The volume to set the background on
 */
export function setBackgroundVolume(volume: number): void {
  if (mBackgroundGain) {
    mBackgroundGain.gain.value = volume;
  }
}

/**
 * @description Increments the background audio volume
 * @param {number} n The amount to add to the background volume
 */
export function incBackgroundVolume(n: number): void {
  if (mBackgroundGain) {
    mBackgroundGain.gain.value += n;

    // Need this since volume increases when negative
    if (mBackgroundGain.gain.value < 0) {
      setBackgroundVolume(0);
    }
  }
}

/**
 * @description Sets the master audio volume
 * @param {number} volume The volume to set the master on
 */
export function setMasterVolume(volume: number): void {
  if (mMasterGain) {
    mMasterGain.gain.value = volume;
  }
}

/**
 * @description Increments the master audio volume
 * @param {number} n The amount to add to the master volume
 */
export function incMasterVolume(n: number): void {
  if (mMasterGain) {
    mMasterGain.gain.value += n;
  }

  // Need this since volume increases when negative
  if (mMasterGain.gain.value < 0) {
    setMasterVolume(0);
  }
}

/**
 * @description Cleans up audio manager
 */
export function cleanUp(): void {
  mAudioContext?.close();
  mAudioContext = null;
}
