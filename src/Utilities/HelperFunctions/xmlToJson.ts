import { xml2json } from "xml-js";

export const ConvertXmlToJson = (xml: string) => {
  if (!xml.includes("<?xml")) {
    return xml;
  }

  const xmlToJson = xml2json(xml, { compact: true, spaces: 4 });
  if (xml.includes("<Name")) {
    return JSON.parse(xmlToJson)?.root?.Name?._text;
  } else {
    return JSON.parse(xmlToJson);
  }
};
