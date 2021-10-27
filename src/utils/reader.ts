/**
 * Reads a KML file and returns its content.
 *
 * @param file The file that will be read.
 * @returns The file text content.
 */
export async function readKML(file: File): Promise<string> {
  return await file.text()
}
