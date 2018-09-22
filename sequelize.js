const Sequelize = require('sequelize')

const force = process.env.NODE_ENV === "DEV" ? true : false
const logging = parseInt(process.env.LOGGING) ? true : false

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER || "postgres",
    process.env.DB_PWD || null, {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging,
    })

const models = require("./models/index.model")(sequelize);

sequelize.sync({ force })
    .then(() => {
        console.log(`Database & tables created!`)
    })
module.exports.default = models
module.exports = {
    db: models,
    sequelize
}