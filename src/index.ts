import { Kml } from './interfaces/kml.interface'
import { convertToJson } from './utils/converter'
import { readKML } from './utils/reader'

/**
 * Converts a KML file to a JSON object.
 *
 * @param file The KML file to be uploaded.
 * @returns An object containing all KML information.
 */
export async function kmlToJson(file: File): Promise<Kml> {
  const kmlText = await readKML(file)
  const json = convertToJson(kmlText)
  return json
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

setTimeout(() => {
  const input = document.getElementById('kml-input') as HTMLInputElement

  if (input) {
    input.addEventListener('change', async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0]

        const json = await kmlToJsonString(file)

        const div = document.createElement('div')
        div.innerHTML = json

        document.body.appendChild(div)
      }
    })
  }
}, 100)
