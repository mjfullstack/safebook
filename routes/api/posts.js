const router = require("express").Router();
const postsController = require("../../controllers/postsController");

var Posts = require('../../models/posts');

// Users Posts
router.route("/:username/posts")
    .get(postsController.findByUserNamePage);

router.route("/home/:username/posts")
    .get(postsController.findByUserNamePage);
    
router.route("/allposts")
    .get(postsController.findAll);

module.exports = router;
