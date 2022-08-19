import * as map from "../core/resource-map";

/**
 * @module XMLResource
 */

// Resource map functions refs
export const unload = map.unload;
export const has = map.has;
export const get = map.get;

const mParser = new DOMParser();

/**
 * @description Decodes string from response
 * @param {Response} data The fetch response to decode
 * @returns {Promise<string>} the decoded string
 */
function decodeXML(data: Response): Promise<string> {
  return data.text();
}

/**
 * @description Parses decoded string
 * @param {string} text The string to parse
 * @returns {Document} the parsed document
 */
function parseXML(text: string): XMLDocument {
  return mParser.parseFromString(text, "text/xml");
}

/**
 *
 * @param {string} path The resource file path
 * @returns {Promise<void>}
 */
export function load(path: string): Promise<void> | undefined {
  return map.loadDecodeParse<XMLDocument>(path, decodeXML, parseXML);
}
