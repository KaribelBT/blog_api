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
  deleteOne,
};

/*
exports.updatePost = async (req, res) => {
    const { category_id, title, content, img_url } = req.body;
    if (!req.body) {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    } else {
        let postUpdated = await posts.update({
            category_id: category_id,
            title: title,
            content: content,
            img_url: img_url
        },
            { where: { id: req.params.id } }
        );
        postUpdated = await posts.findOne({
            attributes: ['id', 'title', 'content', 'img_url', 'create_date'],
            where: {
                id: req.params.id
            },
            include: [{
                model: categories
            }]
        });
        res.status(200).json(postUpdated);
    }
};
*/
