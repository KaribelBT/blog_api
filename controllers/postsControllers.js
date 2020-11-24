const postsServices = require("../services/postsServices");

const getAll = async (req, res) => {
  try {
    const posts = await postsServices.list();
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const post = await postsServices.getById(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(400).json({ error: "Bad Request, invalid or missing input" });
  }
};

const create = async (req, res) => {
  try {
    let newPost = await postsServices.create(req.body);
    if (!newPost) {
      res.status(400).json({ error: "Bad Request, invalid or missing input" });
    } else {
      res.status(201).json(newPost);
    }
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
};

const update = async (req, res) => {
  try {
    let post = await postsServices.update(req.params.id, req.body);
    if (!post) {
      res.status(400).json({ error: "Bad Request, invalid or missing input" });
    } else {
      let postUpdated = await postsServices.getById(req.params.id)
      res.status(200).json(postUpdated);
    }
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
};

const deleteOne = async (req, res) => {
  try {
    await postsServices.deleteById(req.params.id);
    res.status(200).json({ message: "Success, post deleted" });
  } catch (error) {
    res.status(400).json({ error: "Bad Request, invalid or missing input" });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne
};