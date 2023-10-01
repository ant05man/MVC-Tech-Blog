const router = require('express').Router();
const session = require('express-session');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({ include: User
        })
        const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
        res.render('home', {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err)
    }
});
router.get('/blog/:id', async (req, res) => {
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
        const blog = blogData.get({ plain: true });
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.log('error entered')
        res.status(400).json(err);
    }
});
router.get('/blog', async (req, res) => {
    try {
        const blogData = await Blog.findAll ({ include: User })

        const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
        res.render('blog', {
            blogs,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err)
    }
});
// route to user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      console.log(req.session.user_id)
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });

      const user = userData.get({ plain: true });

      console.log(user)

      res.render('dashboard', {
        ...user,
        logged_in: true
      });
      
    } catch (err) {
      res.status(500).json(err);
    }
});

// signup route
router.get('/signup', (req,res) => {
    if (req.session.logged_in){
        res.redirect('/')
        return
    }
    res.render('signup')
})
// If already logged in, redirect to dashboard
router.get('/login',  (req, res) => {
    if (req.session.logged_in){
        res.redirect('/');
        return
    }
    res.render('login')
})

module.exports = router;