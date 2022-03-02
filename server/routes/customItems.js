const express = require('express')
const fileUpload = require('express-fileupload')
const db = require('../db/customItems')
const dbUsers = require('../db/users')
const checkJwt = require('../auth0')

const router = express.Router()

router.use(fileUpload())

// Custom items get /api/v1/aac/customItems/
router.get('/', checkJwt, async (req, res) => {
  const user = await dbUsers.findUserId(req.user?.sub)
  db.getCustomItems(user[0].id)
    .then(customerItems => res.json(customerItems))
    .catch(e => res.status(500).send(e))
})

// Custom item upload /api/v1/aac/customItems/upload
router.post('/upload', checkJwt, async (req, res) => {
  const user = await dbUsers.findUserId(req.user?.sub)
  const word = req.body.word
  let customItem = { }
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  const file = req.files.file

  db.addCustomItem(word, 'tempPath', user[0].id)
    .then(createdItem => {
      customItem = createdItem
      file.mv(`${__dirname}/../public/images/custom/${customItem.id}.png`, err => {
        if (err) {
          console.error(err)
          return res.status(500).send(err)
        }
      })
      return db.updateCustomItemPath(customItem.id, `/images/custom/${customItem.id}.png`)
    })
    .then(updatedItem => {
      res.json(updatedItem)
      return null
    })
    .catch(e => {
      console.log(e)
      return res.status(500).send(e)
    })
})

module.exports = router
