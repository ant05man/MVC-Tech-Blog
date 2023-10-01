const { Post } = require('../models');

const postData = [{
        title: 'Title One',
        body: '.',
        user_id: 1
    },
    {
        title: 'Title Two',
        body: '.',

        user_id: 2
    },
    {
        title: 'Another Title',
        body: '.',

        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;