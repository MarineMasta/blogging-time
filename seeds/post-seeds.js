const { Post } = require('../models');

const postData = [
    {
        title: "Can You Hear Me?",
        post_content: "Let me know if you can still hear me from all the way over there!",
        user_id: 1
    },
    {
        title: "Go Get A Puppy",
        post_content: "If you need any convincing, let me know and I can send you pictures of my 4 months old Chowsky!",
        user_id: 2
    },
    {
        title: "Candle Recommendations",
        post_content: "To this day, my favorite candles remain the Mahogany Teakwood and Eucalyptus options from Bath & Body Works. During the fall, I'm a sucker for their pumpkin and caramel scents. During wintertime, I'm a fan of Balsam and other tree scents. Let me know what your favorites are down in the comments!",
        user_id: 3

    },
    {
        title: "123",
        post_content: "In need of content ideas!",
        user_id: 4
    },
    {
        title: "Blog is LIVE",
        post_content: "Our posts are posting, our users are logging in, and all is well in the tech world!",
        user_id: 5
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;