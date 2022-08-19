import { vec2 } from "gl-matrix";
import * as Engine from "../engine";
import { Color, GLColorTuple, Palette } from "../utils/palette";

class SceneFileParser {
  xml: XMLDocument;

  constructor(xml: XMLDocument) {
    this.xml = xml;
  }

  parseCamera() {
    const camElm = getElm(this.xml, "Camera");
    const cx = Number(camElm[0].getAttribute("CenterX"));
    const cy = Number(camElm[0].getAttribute("CenterY"));
    const w = Number(camElm[0].getAttribute("Width"));

    const unparsedViewport = camElm[0].getAttribute("Viewport")?.split(" ");
    const viewport = unparsedViewport?.map((n) => Number(n)) as Float32List;

    const unparsedBgColor = camElm[0].getAttribute("BgColor")?.split(" ");

    const cam = new Engine.Camera(vec2.fromValues(cx, cy), w, viewport);
    cam.setBackgroundColor(parseColor(unparsedBgColor));

    return cam;
  }

  parseSquares(sqSet: Array<Engine.Renderable>) {
    const elm = getElm(this.xml, "Square");

    for (let i = 0; i < elm.length; i++) {
      const x = Number(elm.item(i)?.attributes.getNamedItem("PosX")?.value);
      const y = Number(elm.item(i)?.attributes.getNamedItem("PosY")?.value);
      const w = Number(elm.item(i)?.attributes.getNamedItem("Width")?.value);
      const h = Number(elm.item(i)?.attributes.getNamedItem("Height")?.value);
      const r = Number(elm.item(i)?.attributes.getNamedItem("Rotation")?.value);
      const c = parseColor(
        elm.item(i)?.attributes.getNamedItem("Color")?.value.split(" ")
      );

      const sq = new Engine.Renderable();
      sq.setColor(c);
      sq.getTransform().setPosition(x, y);
      sq.getTransform().setRotationDeg(r);
      sq.getTransform().setScale(w, h);

      sqSet.push(sq);
    }
  }
}

/**
 *
 * @param {XMLDocument} xmlContent XML document to get element from
 * @param {string} tagElm Element tag name
 * @returns {HTMLCollectionOf<Element>} the required element
 */
function getElm(
  xmlContent: XMLDocument,
  tagElm: string
): HTMLCollectionOf<Element> {
  const elm = xmlContent.getElementsByTagName(tagElm);
  if (elm.length === 0) {
    console.error(`Warning: Level element [${tagElm}] not found`);
  }

  return elm;
}

/**
 * @description Parses color from XML into a {@link GLColorTuple}.
 * Allows to write color in XML as r,g,b,a or as a palette enum key
 * @param {Array<string>} unparsedColor the color string splitted into an array
 * @returns {GLColorTuple} the parsed background color
 */
function parseColor(unparsedColor: string[] | undefined): GLColorTuple {
  if (unparsedColor?.length === 1) {
    return Palette[Color[unparsedColor[0] as keyof typeof Color]];
  }
  return unparsedColor?.map((n) => Number(n)) as GLColorTuple;
}

export default SceneFileParser;
