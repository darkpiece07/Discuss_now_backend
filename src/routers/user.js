const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const cors = require('cors')

router.use(
  cors({
    origin: '*',
  })
)

router.get('/user/:id', async (req, res) => {

  try {

    const user = User.findOne({ _id: req.params.id })
    res.send(user);

  }
  catch {
    res.send({ msg: "something wrong while fetching single user" });
  }

})


router.post('/addprofile', async (req, res) => {

  console.log(req.body);

  const user = new User({
    _id: req.body.userId,
    bio: req.body.bio,
    college: req.body.college,
    branch: req.body.branch,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    state: req.body.state,
    gitHubLink: req.body.gitHubLink,
    linkedInLink: req.body.linkedInLink,
    avatar: req.body.avatar
  })

  try {
    await user.save();
    res.status(201).send(user)
  }
  catch (error) {
    res.status(404).send(error)
  }
})

router.patch('/updateprofile/:id', async (req, res) => {

  const updates = Object.keys(req.body)
  const allowedUpdates = ['bio', 'college', 'branch', 'phoneNumber', 'city', 'state', 'gitHubLink', 'linkedInLink', 'avatar'];

  const isValidOperatiion = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperatiion) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const user = await User.findOne({ _id: req.params.id })

    if (!user) {
      return res.status(404).send()
    }

    updates.forEach((update) => (user[update] = req.body[update]))
    await user.save()

    res.send(user)

  } catch (e) {
    res
      .status(400)
      .send({ msg: 'something wrong while updating single contact:' })
  }
})

module.exports = router