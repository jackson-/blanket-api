const metaModels = {
    Restaurant: require('./restaurant.model'),
    Rating: require('./rating.model'),
  };
  
  const { mapValues } = require('lodash');
  
  const models = db => {
    // Create actual model classes by calling each meta model with the database.
    const models = mapValues(metaModels, defineModel => defineModel(db));
  
    /*
  
    At this point, all our models have been created. We just need to
    create the associations between them.
  
    We pass the responsibility for this onto the models themselves:
    If they export an `associations` method, we'll call it, passing
    in all the models that have been defined.
  
    This lets us keep the association logic in the model files,
    so all the knowledge about the structure of each model remains
    self-contained.
  
    The Sequelize docs suggest a similar setup:
    https://github.com/sequelize/express-example#sequelize-setup
  
    */
  
    Object.keys(metaModels).forEach(name => {
      const { associations } = metaModels[name];
  
      if (typeof associations === 'function') {
        // Metamodel::associations(self: Model, others: {[name: String]: Model}) -> ()
        // Associate self with others.
        associations.call(metaModels[name], models[name], models);
      }
    });
    return models;
  };
  
  module.exports = models;