const seedUser = require('./seedUser');
const seedChoice = require('./seedChoice');
const seedComment = require('./seedComment');
const seedLike = require('./seedLike');
const seedPost = require('./seedPost');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true }); 
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');
  
  await seedPost();
  console.log('\n----- POSTS SEEDED -----\n');  
  
  await seedComment();
  console.log('\n----- COMMENTS SEEDED -----\n');
  
  await seedLike();
  console.log('\n----- LIKES SEEDED -----\n');
  
  await seedChoice();
  console.log('\n----- CHOICES SEEDED -----\n'); 
  process.exit(0);
};

seedAll();