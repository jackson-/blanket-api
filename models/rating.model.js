const { STRING, FLOAT } = require('sequelize');

module.exports = sequelize =>
  sequelize.define('rating', {
    score: FLOAT,
    review: STRING,
  });

module.exports.associations = (Rating, { Restaurant }) => {
    Rating.belongsTo(Restaurant);
};
