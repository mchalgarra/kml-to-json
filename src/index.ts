import { IKmlTag, ITextTag, Kml } from './interfaces/kml.interface'
import { convertToJson } from './utils/jsonConverter'
import { convertToKML } from './utils/kmlConverter'
import { readKML } from './utils/reader'

/**
 * Converts a KML file to a JSON object.
 *
 * @param file The KML file to be uploaded.
 * @returns An object containing all KML information.
 */
export async function kmlToJson(file: File): Promise<Kml> {
  const kmlText = await readKML(file)
  return convertToJson(kmlText)
}

/**
 * Converts a KML file to a stringified JSON object.
 *
 * @param file The KML file to be uploaded.
 * @returns A stringified object containing all KML information.
 */
export async function kmlToJsonString(file: File): Promise<string> {
  const json = await kmlToJson(file)
  return JSON.stringify(json)
}

/**
 * Converts a JSON object or string to a KML file.
 *
 * @param json The JSON object or string to be converted.
 * @returns A blob that represents the KML file.
 */
export function jsonToKml(json: Kml | string): Blob {
  const kml = convertToKML(json)
  return new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' })
}

/**
 * Converts a JSON object or string to a KML text.
 *
 * @param json The JSON object or string to be converted.
 * @returns A string that represents the KML structure.
 */
export function jsonToKmlString(json: Kml | string): string {
  return convertToKML(json)
}

/**
 * Filters all tags and their children to remove texts that only
 * contains '\n' and spaces.
 *
 * @param json The JSON object or string to be cleaned.
 * @returns An object containing only the filtered properties.
 */
export function clearJsonTexts(json: Kml | string): Kml {
  const clearChildren = (kml: IKmlTag): void => {
    const textRegex = /text([0-9]+)/g
    const cleanRegex = /\s*\n\s*/gi

    if (!kml.children) {
      return
    }

    Object.entries(kml.children).forEach(([key, value]) => {
      if (
        textRegex.test(key) &&
        (value as ITextTag).data.replace(cleanRegex, '').length === 0
      ) {
        delete kml.children[key]
        return
      }

      clearChildren(value as IKmlTag)
    })
  }

  const kmlObject: Kml = typeof json === 'string' ? JSON.parse(json) : json
  clearChildren(Object.values(kmlObject)[0] as IKmlTag)

  return kmlObject
}
