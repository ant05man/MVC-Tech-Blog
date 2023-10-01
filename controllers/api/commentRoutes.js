const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [User, Blog]
        });

        res.status(200).json(commentData);
    } catch (err){
        res.status(500).json(err);
    }
});

// Create comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;