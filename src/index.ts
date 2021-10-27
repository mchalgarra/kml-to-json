import { convertToJson } from './utils/converter'
import { readKML } from './utils/reader'

console.log('Hello world!')

setTimeout(() => {
  const input = document.getElementById('kml-input') as HTMLInputElement

  if (input) {
    input.addEventListener('change', async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0]

        const kmlText = await readKML(file)
        console.log(kmlText)

        const json = convertToJson(kmlText)
        console.log(JSON.parse(json))
      }
    })
  }
}, 100)
