import { IKmlTag, ITextTag } from './../interfaces/kml.interface'
import { Attrs, Kml } from '../interfaces/kml.interface'

/**
 * Gets all attributes and their values from the given tag.
 *
 * @param tag A string that defines the tag to get the attributes from.
 * @returns An object containing all tag attributes.
 */
function getTagAttributes(tag: string): Attrs {
  const attrs: Attrs = {}

  const parts = tag.split(' ')
  const attributes = parts.slice(1).join(' ').replace('>', '')

  const keys = attributes
    .replace(/\"(.*?)\"/g, '')
    .replace(/=/g, '')
    .split(' ')

  keys.forEach((attr) => {
    if (!attr) {
      return
    }

    attrs[attr] =
      attributes
        .match(new RegExp(`${attr}="(.*?)"`, 'g'))
        ?.toString()
        .replace(attr + '=', '')
        .replace(/\"/g, '') || null
  })

  return attrs
}

/**
 * Gets all data from a specific tag. In case the tag has
 * children elements, it is called recursively for each of them.
 *
 * At the end, an object with all of its attributes, order and
 * children is returned.
 *
 * @param tag The tag to be analyzed.
 * @param order The tag order according to the parent element.
 * @param isFirst Whether is the first function iteration.
 * @returns An object containing all tag data.
 *
 * @example
 * ```ts
 * const tagData: Kml = getTagData(`
 *   <test-tag id="test-tag" class="class-1" attr1 attr2>
 *     <child1>
 *       <child3 attr3>
 *         Some text...
 *       </child3>
 *     </child1>
 *     <child2>
 *     </child2>
 *   </test-tag>
 * `)
 * ```
 *
 * **tagData:**
 * ```ts
 * {
 *   'test-tag': {
 *     attributes: {
 *       attr1: null,
 *       attr2: null,
 *       class: 'class-1',
 *       id: 'test-tag'
 *     },
 *     children: {
 *       child1: {
 *         attributes: {},
 *         order: 0,
 *         children: {
 *           child3: {
 *             attributes: {
 *               attr3: null
 *             },
 *             children: {
 *               text0: {
 *                 data: 'Some text...',
 *                 order: 0
 *               }
 *             }
 *             order: 0,
 *           }
 *         }
 *       }
 *       child2: {
 *         attributes: {},
 *         order: 1,
 *         children: {}
 *       }
 *     }
 *     order: 0,
 *   }
 * }
 * ```
 */
function getTagData(tag: string, order = 0, isFirst = true): Kml | IKmlTag {
  if (!tag) {
    return {}
  }

  // Gets all tag openigs and the name of the first one
  const openings = tag.match(/<[a-zA-Z]+(>|.*?[^?]>)/gm) || []
  const name = (openings[0]?.split('>') || [])[0]
    ?.split(' ')[0]
    ?.replace(/[<|>]/g, '')
    .replace(/\r?\n|\r/g, '')

  // Gets only the children of the current tag
  const tagEndOnly = tag.substr(tag.indexOf('>') + 1)
  const tagChildren = tagEndOnly.replace(new RegExp(`</${name}>`, 'g'), '')

  const children: { [key: string]: string } = {}

  // Creates an element with the children
  const el = document.createElement(name)
  el.innerHTML = tagChildren

  let textNumber = 0

  // Split the children and put them into the 'children' object
  el.childNodes.forEach((child: HTMLElement) => {
    if (child.nodeType === 3) {
      children['text' + textNumber++] = child.textContent
      return
    }

    const childOpenings =
      child.outerHTML.match(/<[a-zA-Z]+(>|.*?[^?]>)/gm) || []
    const childName = (childOpenings[0]?.split('>') || [])[0]
      ?.split(' ')[0]
      ?.replace(/[<|>]/g, '')
      .replace(/\r?\n|\r/g, '')

    children[childName] = child.outerHTML
  })

  el.remove()

  let current: Kml | IKmlTag = {}

  // Creates the object that represents the current tag and gets
  // its attributes
  if (isFirst) {
    current[name] = {
      attributes: getTagAttributes(openings[0]),
      order,
      children: {},
    }
  } else {
    current = {
      attributes: getTagAttributes(openings[0]),
      order,
      children: {},
    }
  }

  // For each children, analyze its type and get its data
  // recursively, until the last child
  Object.entries(children).forEach((c, index) => {
    const isText = c[0].match(/^text([\d]+)$/gm)

    if (isFirst) {
      ;((current as Kml)[name] as IKmlTag).children = {
        ...((current as Kml)[name] as IKmlTag).children,
        [c[0]]: isText
          ? { order: index, data: c[1] }
          : (getTagData(c[1], index, false) as IKmlTag),
      }

      return
    }

    current.children = {
      ...(current.children as Kml | IKmlTag),
      [c[0]]: isText
        ? { order: index, data: c[1] }
        : (getTagData(c[1], index, false) as IKmlTag),
    }
  })

  return current
}

/**
 * Converts a KML text to a JSON object.
 *
 * @param text The KML text to be converted.
 * @returns An object containing all KML information.
 */
export function convertToJson(text: string): Kml {
  const formattedText = text.replace(/^<\?(.*?)\?>$/gm, '')
  const textData = getTagData(formattedText) as Kml

  return textData
}

/**
 * Converts a JSON object to a KML text.
 *
 * @param json The JSON object or string to be converted.
 * @returns A string that contains the formatted KML.
 */
export function convertToKML(json: any): string {
  const stringified = typeof json !== 'string' ? JSON.stringify(json) : json

  return ''
}
