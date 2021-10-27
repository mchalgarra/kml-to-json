export type Attrs = { [key: string]: string | number | null }

export type Kml = { [key: string]: IKmlTag | ITextTag }

/**
 * Interface that represents a KML tag.
 */
export interface IKmlTag {
  /**
   * Property that defines all tag attributes and their values.
   *
   * @example
   * ```json
   * "attributes": {
   *   "id": "some-id",
   *   "attr1": "attribute",
   *   "attr2": null
   * }
   * ```
   */
  attributes: Attrs

  /**
   * Property that defines the element placement order
   * (starts in 0).
   */
  order: number

  /**
   * Property that defines all children KML tags.
   *
   * @example
   * ```json
   * {
   *   "parent": {
   *     "attributes": {
   *       "id": "parent-id"
   *     },
   *     "children": {
   *       "child1": {
   *         "attributes": {},
   *         "children": {}
   *       },
   *       "child2": {
   *         "attributes": {
   *           "id": "child2"
   *         },
   *         "children": {}
   *       }
   *     }
   *   }
   * }
   * ```
   */
  children: Kml
}

/**
 * Interface that represents a text element inside a KML tag.
 */
export interface ITextTag {
  /**
   * Property that defines the element placement order
   * (starts in 0).
   */
  order: number

  /**
   * Property that defines the text content.
   */
  data: string
}
