# KML to JSON

## About

KML to JSON is a library made with Typescript that contains tools for KML files conversion.

## Installing

First, be sure to have [Node.js](https://nodejs.org/en/) installed.

Then, install it by running:

```bash
$ npm install --save kml-to-json
```

## Usage

The library has 4 functions that may be used. They are:

- ### kmlToJson

It converts a KML file to a JSON object, keeping all tags names, attributes, texts and children.

Receives a file of the type `application/vnd.google-earth.kml+xml` or with the extension `kml`.

> It throws an error when the file type is incorrect.

Returns an object containing all KML data with [this structure](#json-structure).

```ts
kmlToJson(file: File): Object
```

- ### kmlToJsonString

It converts a KML file to a JSON string, representing all tags names, attributes, texts and children.

Receives a file of the type `application/vnd.google-earth.kml+xml` or with the extension `kml`.

> It throws an error when the file type is incorrect.

Returns a string representing the KML data with [this structure](#json-structure).

```ts
kmlToJsonString(file: File): string
```

- ### jsonToKml

It converts a JSON object or string to a KML file.

Receives an object or string with [this structure](#json-structure).

> It throws an error when the given parameter is not from type object or string.

Returns a blob that represents the KML file. Its type is `application/vnd.google-earth.kml+xml`.

```ts
jsonToKml(json: Object | string): Blob
```

- ### jsonToKmlString

It converts a JSON object or string to a structured KML string.

Receives an object or string with [this structure](#json-structure).

> It throws an error when the given parameter is not from type object or string.

Returns a string that represents the KML string structure.

```ts
jsonToKmlString(json: Object | string): string
```

## JSON Structure

```ts
{
  "test-tag": {
    "attributes": {
      "attr1": null,
      "attr2": null,
      "class": "class-1",
      "id": "test-tag"
    },
    "children": {
      "child1": {
        "attributes": {},
        "order": 0,
        "children": {
          "child3": {
            "attributes": {
              "attr3": null
            },
            "children": {
              "text0": {
                "data": "Some text...",
                "order": 0
              }
            }
            "order": 0,
          }
        }
      }
      "child2": {
        "attributes": {},
        "order": 1,
        "children": {}
      }
    }
    "order": 0,
  }
}
```

## License

The AsteroidsJS project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
