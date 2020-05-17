/**
 * Advancement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    level:{
      type: 'string',
      required: true,
      unique: true
    },
    words: {
      collection: 'words',
      via: 'advancement'
    }

  },

};

