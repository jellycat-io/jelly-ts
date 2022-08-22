/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @module ResourceMap
 */

export class MapEntry<T> {
  mData: T | null;
  mRefCount: number;

  /**
   * @class
   * @template T
   * @param {T} data The data to load
   */
  constructor(data: T | null) {
    this.mData = data;
    this.mRefCount = 1;
  }

  /**
   * @description Decrement the reference counter of the resource
   */
  decRef(): void {
    this.mRefCount--;
  }

  /**
   * @description Increment the reference counter of the resource
   */
  incRef(): void {
    this.mRefCount++;
  }

  /**
   * @template T
   * @description Sets data to be loaded
   * @param {T} data The data to be loaded
   */
  set(data: T): void {
    this.mData = data;
  }

  /**
   * @template T
   * @description Gets loaded data from the resource map
   * @returns {T | null} loaded data if found
   */
  data(): T | null {
    return this.mData;
  }

  /**
   * @description Checks if data can be removed
   * @returns {boolean} true if it can be
   */
  canRemove(): boolean {
    return this.mRefCount === 0;
  }
}

const mMap = new Map<string, MapEntry<any>>();
let mOutstandingPromises: Array<Promise<void>> = [];

/**
 *
 * @param {string} path The resource file path
 * @returns {boolean} true if data exists in the map
 */
export function has(path: string): boolean {
  return mMap.has(path);
}

/**
 *
 * @template T
 * @param {string} path The resource file path
 * @returns {T | null} data if it exists in the map
 */
export function get<T = any>(path: string): T | null {
  if (!has(path)) {
    throw new Error(`Error [${path}]: not loaded`);
  }

  return mMap.get(path)?.data();
}

/**
 * @template T
 * @param {string} key The key to put data in the map at the correct place
 * @param {T} value The data to be added
 */
export function set<T = any>(key: string, value: T): void {
  mMap.get(key)?.set(value);
}

/**
 *
 * @param {string} path The resource file path
 */
export function loadRequested<T = any>(path: string): void {
  mMap.set(path, new MapEntry<T>(null));
}

/**
 *
 * @param {string} path The resource file path
 */
export function incRef(path: string): void {
  mMap.get(path)?.incRef();
}

/**
 *
 * @param {string} path The resource file path
 * @returns {boolean | undefined} true if resource can be removed from the map
 */
export function unload(path: string): boolean | undefined {
  const entry = mMap.get(path);
  entry?.decRef();

  if (entry?.canRemove()) mMap.delete(path);

  return entry?.canRemove();
}

/**
 * @description Push outstanding promise into the array
 * @param {Promise<void>} p The promise to add to the array
 */
export function pushPromise(p: Promise<void>): void {
  mOutstandingPromises.push(p);
}

/**
 * @typedef
 * @template T
 * @callback DecodeResource
 * @param {Response} res
 * @returns {Promise<T>}
 */

/**
 * @typedef
 * @template T
 * @callback ParseResource
 * @param {T} data
 * @returns {T}
 */

/**
 * @async
 * @template T
 * @description Generic loading function
 * 1: Fetch from server
 * 2: decodeResource on the loaded package
 * 3: parseResource on the decoded resource
 * 4: store result into the map
 * @param {string} path The resource file path
 * @param {DecodeResource} decodeResource The callback to decode the resource
 * @param {ParseResource} parseResource The callback to parse the resource
 * @returns {Promise<void>} the promise stored if data has not already been loaded
 */
export function loadDecodeParse<T = any>(
  path: string,
  decodeResource: (res: Response) => Promise<any>,
  parseResource: (data: any) => T
): Promise<void> | undefined {
  let fetchPromise: Promise<void> | undefined = undefined;

  if (!has(path)) {
    loadRequested(path);

    fetchPromise = fetch(path)
      .then((res) => decodeResource(res))
      .then((data) => parseResource(data))
      .then((data) => {
        return set(path, data);
      })
      .catch((err) => {
        throw err;
      });

    fetchPromise && pushPromise(fetchPromise);
  } else {
    incRef(path);
  }

  return fetchPromise;
}

/**
 * @async
 * @description Waits for all promises to complete
 * @returns {Promise<void>}
 */
export async function waitOnPromises(): Promise<void> {
  await Promise.all(mOutstandingPromises);
  mOutstandingPromises = [];
}
