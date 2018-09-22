const axios = require('axios');
const { sequelize, db } = require('../sequelize');

const { Restaurant, Rating } = db;


const restaurantController = {

    getAll: async (req, res, next) => {
        const results = await Restaurant.findAll()
        return res.json(200, results)
    },

    create: async (req, res, next) => {
        const { name, description, rating, lat, lng } = req.body;
        const results = await Restaurant.create({
            name,
            description,
            rating,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            // location:{type: 'Point', coordinates: [parseFloat(lat),parseFloat(lng)]}
        })
        return res.json(200, results)
    },

    rate: async (req, res, next) => {
        const { restaurantId, vote, score, review } = req.body;
        const rating = await Rating.create({
            score,
            review,
            restaurantId,
        })
        return res.json(200, rating)
    },

    search: async (req, res, next) => {
        let { lng, lat } = req.query
        if (req.query.address) {
            let result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=AIzaSyCW5m0rrHQsD5Z0HsmikaLswTBjje6Zm98`)
            if (result.data.results.length > 0) {
                let = { lat, lng } = result.data.results[0].geometry.location;
            } else {
                return res.json(400, { 'error': "Coordinates for address couldn't be found." })
            }
        }
        const results = await sequelize.query(
            `select *
            from restaurants r
            where  earth_distance(ll_to_earth(r.lat, r.lng), ll_to_earth(${lat}, ${lng})) < 1000000.0; -- in meters
            `)
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