/**
 * Words.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nativeWord:{
      type: 'string',
      required: true,
    },
    foreignWord:{
      type: 'string',
      required: true,
    },
    category:{
      model: 'categories',
    },
    advancement:{
      model: 'advancement',
    },
  },

};

