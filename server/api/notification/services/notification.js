'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

// module.exports = {};

module.exports = {
  findById: async (id) => {
    return strapi.query('notification').findOne({ id });
  },

  findAll: async (params) => {
    return strapi.query('notification').find(params);
  },

  create: async (data) => {
    return strapi.query('notification').create(data);
  },

  update: async (id, data) => {
    return strapi.query('notification').update({ id }, data);
  },

  delete: async (id) => {
    return strapi.query('notification').delete({ id });
  },

  send: async (data) => {
    return {
      message: `Notification to ${data.ReceiverEmail} sent successfully`,
    };
  },
};
