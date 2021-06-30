const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        comment_text: "Testing Testing"
    },
    {
        user_id: 2,
        post_id: 2,
        comment_text: "This seems to work!"
    },
    {
        user_id: 3,
        post_id: 3,
        comment_text: "You did it"
    },
    {
        user_id: 4,
        post_id: 4,
        comment_text: "1 2 3"
    },
    {
        user_id: 5,
        post_id: 5,
        comment_text: "Go Live Accomplished"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "Success!"
    },
    {
        user_id: 2,
        post_id: 3,
        comment_text: "WOW"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "What's your favorite candle?"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;