const Sequelize = require('sequelize')

const force = process.env.NODE_ENV === "DEV" ? true : false
const logging = parseInt(process.env.LOGGING) ? true : false

const sequelize = new Sequelize(
    null,
    null,
    process.env.DB_PWD || null, {
        host: process.env.DB_HOST,
        dialect: 'sqlite',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging,
        storage: './database.sqlite'
    })

const models = require("./models/index.model")(sequelize);

sequelize.sync({ force })
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = models