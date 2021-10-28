import { Attrs, IKmlTag, ITextTag } from '../interfaces/kml.interface'
import { Kml } from '../interfaces/kml.interface'

/**
 * Gets a formatted string according to the given parameters.
 *
 * @param attrs The attributes to be read.
 * @returns A string with all given attributes.
 */
function getAttributes(attrs: Attrs): string {
  let attributes = ''

  Object.entries(attrs).forEach((attr) => {
    attributes += ' ' + attr[0]

    if (attr[1]) {
      attributes += `="${attr[1]}"`
    }
  })

  return attributes
}

/**
 * Gets a KML formatted string according to the given object.
 *
 * @param kmlObject An object that contains all KML data.
 * @returns A KML formatted string.
 */
function getJsonData(kmlObject: Kml): string {
  let current = ''

  Object.entries(kmlObject)
    .sort((t1, t2) => t1[1].order - t2[1].order)
    .forEach((tag) => {
      const name = tag[0]
      let value

      if ((tag[1] as ITextTag).data) {
        value = tag[1] as ITextTag

        current += value.data
      } else {
        value = tag[1] as IKmlTag
        const attributes = getAttributes(value.attributes)

        const tagBeginning = `<${name}${attributes}>`
        const tagEnding = `</${name}>`

        current += tagBeginning
        current += getJsonData(value.children)
        current += tagEnding
      }
    })

  return current
}

/**
 * Converts a JSON object or string to a KML text.
 *
 * @param json The JSON object or string to be converted.
 * @returns A string that contains the formatted KML.
 * @throws Whether the provided data is not an object or string.
 */
export function convertToKML(json: Kml | string): string {
  if (typeof json !== 'object' && typeof json !== 'string') {
    throw new Error(
      'Invalid argument type! It is expected to receive an object or string.',
    )
  }

  const beginning = '<?xml version="1.0" encoding="UTF-8"?>\n'

  const kmlObject: Kml = typeof json === 'string' ? JSON.parse(json) : json
  const formattedKml = getJsonData(kmlObject)

  return beginning + formattedKml
}
