const { User } = require('../models');

const userData = [
    {
        username: "marinemasta",
        github: "marinemasta",
        email: "marine.bruno98@gmail.com",
        password: "teak1"
    },
    {
        username: "jordanmasta",
        github: null,
        email: "jordan@gmail.com",
        password: "teak2"
    },
    {
        username: "brandonmasta",
        github: null,
        email: "brandon@gmail.com",
        password: "teak3"
    },
    {
        username: "LiamMasta",
        github: "liammasta",
        email: "liam@gmail.com",
        password: "teak4"
    },
    {
        username: "kindercountry",
        github: null,
        email: "kinder@gmail.com",
        password: "teak5"
    },
    {
        username: "candles",
        github: "greatcandles",
        email: "candle@gmail.com",
        password: "teak6"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;