const express = require('express')
const router = express.Router()

const helloWorld = require('./helloWorld.js');
const methods = require('./methods.js');
const body = require('./body.js');
const user = require('./user.js');
const post = require('./post.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.post("/middlewares", body.body);

router.get("/methods", methods.get);
router.post("/methods", methods.post);
router.put("/methods", methods.put);
router.delete("/methods", methods.delete);

router.post("/users", user.post);
router.get("/users", user.get);
router.get("/users/:id", user.getOne);
router.put("/users/:id", user.put);
router.patch("/users/:id", user.patch);

router.get("/posts", post.get);
router.get("/posts/:id", post.getOnePost);
router.post('/posts', post.post);
router.put('/posts/:id', post.put);
router.patch('/posts/:id', post.patch);
router.delete('/posts/:id', post.deletePost);


router.get("/", helloWorld.hello);
//Routes are evaluated in order so pathParameter has to come after get /methods otherwise it would match get / with the pathParameter "methods"
router.get("/:pathParameter", helloWorld.params);

module.exports = router