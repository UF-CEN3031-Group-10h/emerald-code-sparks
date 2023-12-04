'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

// module.exports = {};

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    let entity = await strapi.services.notification.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.notification });
  },

  async update(ctx) {
    const { id } = ctx.params;
    let entity = await strapi.services.notification.update(
      { id },
      ctx.request.body
    );
    return sanitizeEntity(entity, { model: strapi.models.notification });
  },

  async delete(ctx) {
    const { id } = ctx.params;
    let entity = await strapi.services.notification.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.notification });
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.notification.search(ctx.query);
    } else {
      entities = await strapi.services.notification.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.notification })
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.notification.findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models.notification });
  },

  async send(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.notification.findById(id);

    if (!entity) {
      return ctx.badRequest('Notification not found');
    }
    ctx.send({ message: `Notification ${id} sent successfully` });
  },
};
