const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const blogData = require('./blogData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const blog of blogData) {
    await Blog.create({
      ...blog,
    });
  }
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }
  process.exit(0);
};
seedDatabase();

module.exports = seedDatabase;