const { STRING, FLOAT, GEOMETRY } = require('sequelize');

module.exports = sequelize =>
  sequelize.define('restaurant', {
    name: STRING,
    description: STRING,
    rating: FLOAT,
    location: GEOMETRY,
  });

module.exports.associations = (Restaurant, {  }) => {
};
