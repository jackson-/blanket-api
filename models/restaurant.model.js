const { STRING, FLOAT, GEOMETRY } = require('sequelize');

module.exports = sequelize =>
  sequelize.define('restaurant', {
    name: STRING,
    description: STRING,
    rating: FLOAT,
    lat: FLOAT,
    lng: FLOAT,
  });

module.exports.associations = (Restaurant, {  }) => {
};
