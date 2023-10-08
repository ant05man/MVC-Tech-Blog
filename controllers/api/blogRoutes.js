// USING CRUD(Create,Read,Update,Delete)
// imports Express and creates express.router() instance
const router = require('express').Router();

// Imports models for Blog, User, and Comment from models directory
// Models will likely represent tables in a database and used to interact wit the data
const { Blog, User, Comment } = require('../../models');

// this route handles GET requests to base path '/'
router.get('/', async (req, res) => {
    try {
        // fetches all blog data from the database, including related 'User' and 'Comment' using include:
        // if retrieval is successful, it responds with 200 status code and JSON array containing blogData, if there's an error, it responds with a 500 status code and a error message
        const blogData = await Blog.findAll({
            include: [User, Comment]
        });

        res.status(200).json(blogData);
    } catch (err){
        res.status(500).json(err);
    }
})

// handles GET requests with a dynamic parameter, :id that represents the unique ID of a specific blog post
// uses Blog.findPK() to find a blog post by its primary key(ID) and includes 'Comment' and 'User' models
// if blog post is found, it responds with a 200 status code and JSON object containing the blogData, IF NOT, then responds with 500 status code and an error message
// if there is an error, then responds with a 400 status code and the error message 'error entered'
// this is finding ONE id at a time by 'id' #
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

// route handles DELETE requests, with dynamic parameter :id which represents the ID of the blog post to delete
// uses Blog.destroy to delete a blog post with a specific ID and it also checks whether the user_id matches the user session's ID for authorization
router.delete('/:id', async (req, res) => {
    // try/catch method to handle potential errors thay may occur during execution  of the route
    try {
        // attempts to delete a blog post, part of ORM. Used to delete records from database table 'Blog' Model
        // 'await' keyword is used to tell the expression to WAIT for the deletion to complete before proceeding further
        const blogData = await Blog.destroy({
            where: {
                // blog post id # within the URL
                // extracts the ID from the URL parameter
                id: req.params.id,
                // user id stored in the user's session
                user_id: req.session.user_id

            }
        })
        // if deletion successful, route responds with 200 status code and returns JSON containing 'blogData'
        res.status(200).json(blogData)
        // if not then returns 500 status code and error message
    } catch (err){
        res.status(500).json(err)
    }
})

// POST request for creating new blog post in base path '/'
// creates a new blog post in the req.body and associates it to the user who is currently logged in by setting user_id based on the user's session
router.post('/', async (req, res) => {
    try {
        const blogData = await Blog.create({
            // spreads properties of req.body into the new object
            ...req.body,
            // add a user_id to the new object and sends it to user_id stored in the user's session to associate the new blog post w/ the user who is logged in
            // for tracking author of a post
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