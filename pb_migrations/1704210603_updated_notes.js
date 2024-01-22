/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q65b3e3fwuhj76")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q65b3e3fwuhj76")

  collection.listRule = "@request.auth.id != \"\" && author = @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" && author = @request.auth.id"
  collection.createRule = "@request.auth.id != \"\" && author = @request.auth.id"
  collection.updateRule = "@request.auth.id != \"\" && author = @request.auth.id"
  collection.deleteRule = "@request.auth.id != \"\" && author = @request.auth.id"

  return dao.saveCollection(collection)
})
