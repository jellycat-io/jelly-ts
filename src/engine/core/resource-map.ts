/**
 * @module ResourceMap
 */

export class MapEntry {
  mData: unknown | null;
  mRefCount: number;

  /**
   * @param {unknown} data The data to load
   */
  constructor(data: unknown) {
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
   * @description Sets data to be loaded
   * @param {unknown} data The data to be loaded
   */
  set(data: unknown): void {
    this.mData = data;
  }

  /**
   * @description Gets loaded data from the resource map
   * @returns {unknown | null} loaded data if found
   */
  data(): unknown | null {
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

const mMap = new Map<string, MapEntry>();
let mOutstandingPromises: Array<Promise<unknown>> = [];

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
 * @param {string} path The resource file path
 * @returns {unknown | null} data if it exists in the map
 */
export function get(path: string): unknown | null {
  if (!has(path)) {
    throw new Error(`Error [${path}]: not loaded`);
  }

  return mMap.get(path)?.data();
}

/**
 *
 * @param {string} key The key to put data in the map at the correct place
 * @param {unknown} value The data to be added
 */
export function set(key: string, value: unknown): void {
  mMap.get(key)?.set(value);
}

/**
 *
 * @param {string} path The resource file path
 */
export function loadRequested(path: string): void {
  mMap.set(path, new MapEntry(null));
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
 *
 * @param {Promise<unknown>} p The promise to add to the array
 */
export function pushPromise(p: Promise<unknown>): void {
  mOutstandingPromises.push(p);
}

/**
 * @typedef
 * @callback DecodeResource
 * @param {Response} res
 * @returns {Promise<unknown>}
 */

/**
 * @typedef
 * @callback ParseResource
 * @param {unknown} data
 * @returns {Promise<unknown>}
 */

/**
 * @async
 * @description Generic loading function
 * 1: Fetch from server
 * 2: decodeResource on the loaded package
 * 3: parseResource on the decoded resource
 * 4: store result into the map
 * @param {string} path The resource file path
 * @param {DecodeResource} decodeResource The callback to decode the resource
 * @param {ParseResource} parseResource The callback to parse the resource
 * @returns {Promise<unknown> | null} the promise stored if data has not already been loaded
 */
export function loadDecodeParse(
  path: string,
  decodeResource: (res: Response) => Promise<unknown>,
  parseResource: (data: unknown) => Promise<unknown>
): Promise<unknown> | null {
  let fetchPromise = null;

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

    pushPromise(fetchPromise);
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
