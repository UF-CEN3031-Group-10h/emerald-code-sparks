'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  findById: async (id) => {
    return strapi.query('flagged-content').findOne({ id });
  },

  findAll: async (params) => {
    return strapi.query('flagged-content').find(params);
  },

  findAll: async (params) => {
    return strapi.query('flagged-content').find(params);
  },

  update: async (id, data) => {
    return strapi.query('flagged-content').update({ id }, data);
  },

  create: async (id) => {
    return strapi.query('flagged-content').create({ id });
  },

  approve: async (id) => {
    // placeholder for now
    return { message: `Flagged content ${id} approved` };
  },

  reject: async (id) => {
    // placeholder for now
    return { message: `Flagged content ${id} rejected` };
  },
};
