/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q65b3e3fwuhj76")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eh2ynshn",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "productivity",
        "personal"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q65b3e3fwuhj76")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eh2ynshn",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "productivity",
        "personal"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
