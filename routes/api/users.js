const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// User's Home Page
router.route("/home")
    .get(usersController.findById);

// Get All Users
router.route("/allusers")
    .get(usersController.findAll);

// Get Users by ID
router
    .route("/:id")
    .get(usersController.findById)

// Register NEW User
router
    .route("/register")
    .get(usersController.findById)

module.exports = router;