const express = require('express')
const Post = require('../models/post')
const router = new express.Router()

const cors = require('cors')

router.use(
  cors({
    origin: '*',
  }),
)

router.post('/addpost', async (req, res) => {

  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    userId: req.body.userId,
    image: req.body.image,
  });


  try {
    await post.save();
    res.status(201).send(post);
  }
  catch (e) {
    res.send({ msg: "Post not created" });
  }

});

router.post('/post/comment', async (req, res) => {

  const post = await Post.findOne({ _id: req.body.postId })

  const newComment = {
    answer: req.body.answer,
    userId: req.body.userId,
    email: req.body.email,
    userAvatar: req.body.userAvatar,
    upvote: 0,
    downvote: 0
  }

  post.comments.push(newComment)

  try {
    await post.save()
    res.status(201).send(newComment)
  }
  catch (error) {
    res.status(400).send(e);
  }
})

router.get('/posts/:id', async (req, res) => {


  try {
    const posts = await Post.find({ userId: req.params.id });
    res.send(posts);
  }
  catch (e) {
    res.send({ msg: "error while fetchinf single post" });
  }

})

router.get('/allPosts', async (req, res) => {
  const allPosts = await Post.find({}).sort({ $natural: -1 });
  res.send(allPosts);
})

router.get('/post/comments', async (req, res) => {

  try {
    const post = await Post.findOne({ _id: req.params.id })
    res.send(post.comments)
  }
  catch (e) {
    res.send({ errorMsg: "something is wrong while getting comments" })
  }

})

router.post('/post/upvote', async (req, res) => {

  const post = await Post.findOne({ _id: req.body.postId })

  const like = {
    voterId: req.body.voterId
  }

  

  try {
    await post.save()
    res.status(201).send(post.upvote)
  }
  catch (e) {
    res.status(400).send(e);
  }

})

router.post('/post/downvote', async (req, res) => {

  const post = await Post.findOne({ _id: req.body.postId })

  const like = {
    voterId: req.body.voterId
  }

  pitch.downvote.push(like)

  try {
    await post.save()
    res.status(201).send(post)
  }
  catch (e) {
    res.status(400).send(e);
  }

})

router.post('/post/comment/upvote', async (req, res) => {

  Post.updateOne(
    { "_id": req.body.postId, "comments._id": req.body.commentID },
    { "$inc": { "comments.$.upvote": 1 } },
    (err) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ msg: "updated" });
      }
    }
  );

})

router.post('/post/comment/downvote', async (req, res) => {

  Post.updateOne(
    { "_id": req.body.postId, "comments._id": req.body.commentID },
    { "$inc": { "comments.$.downvote": 1 } },
    (err) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ msg: "updated" });
      }
    }
  );

})

module.exports = router