const router = require("express").Router();

const { Router } = require("express");
const service = require("../service/url.service");

router.get("/",service.getUrl);

router.post("/",service.postUrl);

router.delete("/:id",service.deleteUrl)

module.exports = router;