
const { Comment } = require('../models');

const commentData = [{
        comment_text: "First comment",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Second comment",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "Another comment",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
