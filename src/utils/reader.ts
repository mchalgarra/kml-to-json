/**
 * Reads a KML file and returns its content.
 *
 * @param file The file that will be read.
 * @returns The file text content.
 * @throws Whether no file is uploaded or the file is not a KML.
 */
export async function readKML(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file uploaded!')
  }

  if (
    !file.type.includes('vnd.google-earth.kml') &&
    !file.name.match(/\.kml$/)
  ) {
    throw new Error('Invalid file type! The file must be a KML.')
  }

  return await file.text()
}
