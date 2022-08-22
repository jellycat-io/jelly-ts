import * as map from "../core/resource_map";

/**
 * @module TextResource
 */

// Resource map functions refs
export const unload = map.unload;
export const has = map.has;
export const get = map.get;

/**
 * @description Decodes string from response
 * @param {Response} data The fetch response to decode
 * @returns {Promise<string>} the decoded string
 */
function decodeText(data: Response): Promise<string> {
  return data.text();
}

/**
 * @description Parses decoded string
 * @param {string} text The string to parse
 * @returns {Promise<string>} the parsed string
 */
function parseText(text: string): string {
  return text;
}

/**
 *
 * @param {string} path The resource file path
 * @returns {Promise<void>}
 */
export function load(path: string): Promise<void> | undefined {
  return map.loadDecodeParse<string>(path, decodeText, parseText);
}
