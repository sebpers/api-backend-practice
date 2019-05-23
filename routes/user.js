get = (req, res, next) => {
  req.models.User.find().then((users) => {
    return res.send(users);
  }).catch((error) => {
    next(error)
  })
}

// Get one user
getOne = (req, res, next) => {
  req.models.User.findById(req.params.id)
  .then(users => res.send(users))
  .catch((error) => {
    next(error)
  })
}

post = (req, res, next) => {
req.models.User.create({
  name: req.body.name,
  username: req.body.username,
  username: req.body.username,
  email: req.body.email,
  address: {
    street: req.body.address.street,
    suite: req.body.address.suite,
    city: req.body.address.city,
    zipcode: req.body.address.zipcode,
    geo: {
      lat: req.body.address.geo.lat,
      lng: req.body.address.geo.lng,
    }
  }
}).then((user) => {
  return res.status(201).send(user)
}).catch((error) => {
  next(error)
})
}


put = (req, res, next) => {
  req.models.User.findByIdAndUpdate(req.params.id,{
    name: req.body.name, username: req.body.username},
    {
      // Options
      new: true,
      upsert: true,
      runvalidators: true
    }, () => {
      res.status(200).send('User updated');
    }
  )
};

// Updated user
patch = (req, res, next) => {
  // Find the persons id through req.params.id
  req.models.User.findByIdAndUpdate(req.params.id, {
    // Whatever the you choose to update, will be updated and the rest will be as before
    $set: req.body
    },
    {
      // Update if there is something to update, if not, create a spot
      upsert: true
     }, () => {
      // When updated is finished send the message
      res.status(200).send('User updated');
    }
  )
}

module.exports = {
get,
getOne,
post,
put,
patch
}