const express = require("express");

const router = express.Router();

const {
    getUsers,
    createUser,
    getUserById
} = require("../controllers/userController");

const {
    getFiles
} = require("../controllers/asyncSeries");

const {
    getWaterFallFiles
} = require("../controllers/asyncWaterfall");

const {
    getParallelFiles
} = require("../controllers/asyncParallel")



// // PARAM MIDDLEWARE
router.param("id", (req, res, next, id) => {

    console.log("Fetching user with ID:", id);

    req.userId = id;

    next();
});


router.get("/", getUsers);

// router.get("/:id", getUserById);

router.get("/files", getFiles);
router.get("/getWaterFallFiles", getWaterFallFiles);
router.get("/getParallelFiles", getParallelFiles);
router.post("/create", createUser);

module.exports = router;




