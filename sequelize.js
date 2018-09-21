const Sequelize = require('sequelize')

const force = process.env.NODE_ENV === "DEV" ? true : false
const logging = parseInt(process.env.LOGGING) ? true : false

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD || null, {
        host: process.env.DB_HOST,
        port:5432,
        dialect: 'postgres',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging,
        // storage: './database.sqlite'
    })

const models = require("./models/index.model")(sequelize);

sequelize.sync({ force })
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = models