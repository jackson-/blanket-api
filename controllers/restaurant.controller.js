const axios = require('axios');
const db = require('../sequelize');

const { Restaurant, Rating } = db;


const restaurantController = {

    getAll: async (req, res, next) => {
        const results = await Restaurant.findAll()
        return res.json(200, results)
    },

    create: async (req, res, next) => {
        const {name, description, rating, lat, lng} = req.body;
        const results = await Restaurant.create({
            name,
            description,
            rating,
            location:{type: 'Point', coordinates: [parseFloat(lat),parseFloat(lng)]}
        })
        return res.json(200, results)
    },

    rate: async (req, res, next) => {
        const {restaurantId, vote, score, review} = req.body;
        console.log(restaurantId, score, review)
        const rating = await Rating.create({
            score,
            review,
            restaurantId,
        })
        return res.json(200, rating)
    },

    search: async (req, res, next) => {
        console.log({...req.query})
        const results = await Restaurant.findAll({where: {...req.query}})
        // var lat = parseFloat(req.body.lat);
        // var lng = parseFloat(req.body.lng);
        // var attributes = Object.keys(Restaurant.attributes);
        // var location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
        // var distance = sequelize.fn('ST_Distance_Sphere', sequelize.literal('location'), location);
        // attributes.push([distance, 'distance']);
        // const results = await Restaurant.findAll({
        //     attributes: attributes,
        //     order: 'distance',
        //     where: sequelize.where(distance, {$lte: 10000}),
        //     logging: console.log
        //   })
        return res.json(200, results);
    },


}

var rad = function (x) {
    return x * Math.PI / 180;
};

var getDistance = function (p1lat, p1lng, p2lat, p2lng) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2lat - p1lat);
    var dLong = rad(p2lng - p1lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

module.exports = restaurantController;
