/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q65b3e3fwuhj76")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rpnumzr5",
    "name": "content",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q65b3e3fwuhj76")

  // remove
  collection.schema.removeField("rpnumzr5")

  return dao.saveCollection(collection)
})
