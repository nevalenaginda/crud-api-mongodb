const db = require("../models/index")
const Post = db.posts

exports.findAll = (req, res) => {
    console.log('ini dijalankan');
    Post.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving posts."
        })
    })
}

exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false
    })

    post.save(post).then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while create posts."
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Post.findById(id).then((result) => {
        if (result) {
            res.send(result)
        } else {
            res.status(404).send({
                message: "Data not found"
            })
        }

    }).catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while show post"
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    Post.findByIdAndUpdate(id, req.body).then((result) => {
        if (result) {
            res.send({
                message: "Data was updated"
            })
        } else {
            res.status(404).send({
                message: "Data not found"
            })
        }

    }).catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while update post"
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Post.findByIdAndRemove(id).then((result) => {
        if (result) {
            res.send({
                message: "Data was deleted"
            })
        } else {
            res.status(404).send({
                message: "Data not found"
            })
        }
    }).catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while delete post"
        })
    })
}