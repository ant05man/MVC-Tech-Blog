const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [User, Comment]
        });

        res.status(200).json(blogData);
    } catch (err){
        res.status(500).json(err);
    }
})


router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include:[
                {
                  model: Comment, include: {
                    model: User,
                    attributes: ['id', 'username']
                  }
                },
                {
                  model: User,
                  attributes: ['id','username']
                }
              ]
        });

        if(!blogData) {
            res.status(500).json({ message: 'No blog found with this id'});
            return;
        }
        res.status(200).json(blogData)
    } catch (err) {
        console.log('error entered')
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id

            }
        })
        res.status(200).json(blogData)
    } catch (err){
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(blogData)
    } catch (err){
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id, title, content } = req.body;
        const blog = await Blog.findByPk(req.params.id);
        const blogData = await blog.update(
            {
                id: id,
                title: title,
                content: content
            });

            res.status(200).json(blogData)

    } catch (err){
        res.status(500).json(err)
    }
});


module.exports = router;