const express = require('express')
const { getRooms: getRooms, getPost, addRooms: addRooms, editRooms: editRooms, deleteRooms: deleteRooms } = require('../controllers/rooms')
const { addComment, deleteComment } = require('../controllers/comment')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const mapRooms = require('../helpers/mapPost')
const ROLES = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  const { rooms, lastPage } = await getRooms(
    req.query.search,
    req.query.limit,
    req.query.page
  )

  res.send({ data: { lastPage, rooms: rooms.map(mapRooms) } })
})

router.get('/:id', async (req, res) => {
  const rooms = await getPost(req.params.id)

  res.send({ data: mapRooms(rooms) })
})


router.rooms('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newRooms = await addRooms({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });

  res.send({ data: mapRooms(newRooms) })
})

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedRooms = await editRooms(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    }
  );

  res.send({ data: mapRooms(updatedRooms) })
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteRooms(req.params.id);

  res.send({ error: null })
})

module.exports = router