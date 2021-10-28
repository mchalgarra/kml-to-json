import { Kml } from './interfaces/kml.interface'
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
  return JSON.stringify(json, void 0, 2)
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

setTimeout(() => {
  const input = document.getElementById('kml-input') as HTMLInputElement

  if (input) {
    input.addEventListener('change', async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0]

        const json = await kmlToJsonString(file)

        const pre = document.createElement('pre')
        pre.innerHTML = json

        document.body.appendChild(pre)

        const a = document.createElement('a')
        a.href = window.URL.createObjectURL(jsonToKml(json))
        a.download = 'converted.kml'
        a.click()
        a.remove()
      }
    })
  }
}, 100)
