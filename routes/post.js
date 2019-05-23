// Get all posts
get = (req, res, next) => {
  req.models.Post.find()
  .then((posts) => {
    return res.send(posts)
  })
  .catch((error) => {
    next(error);
  });
}

// Get one post
getOnePost = (req, res, next) => {
  req.models.Post.findById(req.params.id)
  .then(posts => res.send(posts))
  .catch((error) => {
    next(error);
  })
}

// Post
post = (req, res, next) => {
  req.models.Post.create({
    title: req.body.title,
    comment: req.body.comment,
    author: req.body.author
  }).then(post => res.status(201).send(post)).catch(error => next(error));
}

// Put
put = (req, res, next) => {
  req.models.Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    comment: req.body.comment,
    author: req.body.author
  }, {
    // Options
    new: true,
    upsert: true,
    runvalidators: true
  }, (doc, err) => {
    if(err){
      res.status(400).send(err);
    }
    res.status(200).send(doc);
  });
}

// Patch
patch = (req, res, next) => {
  req.models.Post.findByIdAndUpdate(req.params.id, {
    $set: req.body
  },
  {
    upsert: true
  },
  () => res.status(200).send('PATCH'));
}

// Delete
deletePost = (req, res, next) => {
  req.models.Post.findByIdAndDelete(req.params.id, {}, () => res.status(204).send('DELETE'));
}

module.exports = {
  get,
  getOnePost,
  post,
  put,
  patch,
  deletePost
}