const express = require('express');
const router = express.Router();
const { getRooms, getPost, addRooms, editRooms, deleteRooms } = require('../controllers/rooms');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const mapRooms = require('../halpers/mapUser');
const ROLES = require('../controllers/rooms');

router.get('/', async (req, res) => {
  try {
    const { rooms, lastPage } = await getRooms(
      req.query.search,
      req.query.limit,
      req.query.page
    );

    res.send({ data: { lastPage, rooms: rooms.map(mapRooms) } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rooms = await getPost(req.params.id);

    res.send({ data: mapRooms(rooms) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newRooms = await addRooms({
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    });

    res.send({ data: mapRooms(newRooms) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const updatedRooms = await editRooms(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        image: req.body.imageUrl,
      }
    );

    res.send({ data: mapRooms(updatedRooms) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    await deleteRooms(req.params.id);

    res.send({ error: null });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
