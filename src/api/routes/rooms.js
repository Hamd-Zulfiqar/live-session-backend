const { json } = require("express");
const express = require(`express`);
const room = require(`../controllers/rooms`);

const router = express.Router();

//All API routes for Room Entity

router.get(`/`, room.test);

router.get(`/:name`, room.getSession);

module.exports = router;