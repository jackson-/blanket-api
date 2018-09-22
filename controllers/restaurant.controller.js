const axios = require('axios');
const { sequelize, db } = require('../sequelize');

const { Restaurant, Rating } = db;

function getMeters(i) {
    return i*1609.344;
}

const restaurantController = {

    getAll: async (req, res, next) => {
        const results = await Restaurant.findAll({include:[Rating]})
        return res.json(200, results)
    },

    getById: async (req, res, next) => {
        const results = await Restaurant.findById(req.params.id, {include:[Rating]})
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
        })
        return res.json(200, results)
    },

    rate: async (req, res, next) => {
        const { restaurantId, score, review } = req.body;
        const rating = await Rating.create({
            score,
            review,
            restaurantId,
        })
        return res.json(200, rating)
    },

    search: async (req, res, next) => {
        let { lng, lat, distance } = req.query

        if (req.query.address) {
            let result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GEOCODE_KEY}`)
            if (result.data.results.length > 0) {
                let = { lat, lng } = result.data.results[0].geometry.location;
            } else {
                return res.json(400, { 'error': "Coordinates for address couldn't be found." })
            }
        }
        if(distance){
            distance = getMeters(distance)
        } else {
            distance = 1609.34
        }
        console.log("DISTANCE", distance)
        const results = await sequelize.query(
            `select *
            from restaurants r
            where  earth_distance(ll_to_earth(r.lat, r.lng), ll_to_earth(${lat}, ${lng})) < ${distance}; -- in meters
            `)
        return res.json(200, results);
    },

}

module.exports = restaurantController;