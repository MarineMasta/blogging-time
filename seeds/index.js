//Using same format as last homework
const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n DATABASE SYNCEDn');
  
  await seedUsers();
    console.log('\n USERS SEEDED\n');
  
  await seedPosts();
    console.log('\n POSTS SEEDED\n');

  await seedComments();
    console.log('\n COMMENTS SEEDED\n');

  process.exit(0);
};

seedAll();
