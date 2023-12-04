'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    let entity = await strapi.services['flagged-content'].create(
      ctx.request.body
    );
    return sanitizeEntity(entity, { model: strapi.models['flagged-content'] });
  },

  async update(ctx) {
    const { id } = ctx.params;
    let entity = await strapi.services['flagged-content'].update(
      { id },
      ctx.request.body
    );
    return sanitizeEntity(entity, { model: strapi.models['flagged-content'] });
  },

  async delete(ctx) {
    const { id } = ctx.params;
    let entity = await strapi.services['flagged-content'].delete({ id });
    return sanitizeEntity(entity, { model: strapi.models['flagged-content'] });
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services['flagged-content'].search(ctx.query);
    } else {
      entities = await strapi.services['flagged-content'].find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models['flagged-content'] })
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services['flagged-content'].findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models['flagged-content'] });
  },

  async approve(ctx) {
    const { id } = ctx.params;
    // placeholder for now
    return { message: `Flagged content ${id} approved` };
  },

  async reject(ctx) {
    const { id } = ctx.params;
    // placeholder for now
    return { message: `Flagged content ${id} rejected` };
  },
};
