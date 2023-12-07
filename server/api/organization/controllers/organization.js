'use strict';

const { sanitizeEntity } = require('strapi-utils/lib');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        console.log("Organizations: Find")
        const { id } = ctx.state.user;

        const orgs = await strapi.services.organization.find({});
        console.log(strapi.services.organization);
        console.log(orgs);
        console.log(ctx)
        return orgs.map(entity => sanitizeEntity(entity, { model: strapi.models.organization }));
    },

    async getlocal(ctx) {
        console.log("Organizations: Get local")
        const { id } = ctx.state.user;
        console.log("CTX user")
        console.log(ctx.state.user)
        const org = await strapi.services.organization.findOne({ id: ctx.state.user.organization });
        console.log(org)
        return org;
    },

    async findOneUsers(ctx) {
        console.log("Organizations: FindOneUsers");

        // console.log(strapi.services.organization);
        // console.log(orgs);
        console.log(ctx);
        const { id } = ctx.params;
        console.log("request body: ?")

        console.log(ctx.request.body)
        console.log(id);
        const org = await strapi.services.organization.findOne({ id: id });
        console.log(org);
        //return orgs.map(entity => sanitizeEntity(entity, { model: strapi.models.organization }));
        return sanitizeEntity(org, { model: strapi.models.organization });
    },

    async create(ctx) {
        console.log("Organizations: create");
        const name = ctx.request.body.name;
        console.log(name)
        console.log("User:")
        console.log(ctx.state.user)

        const newOrg = await strapi.services.organization.create({
            Name: name,
            users: [{ id: ctx.state.user.id }],
            admins: [{ id: ctx.state.user.id }],
            owner: ctx.state.user.id

        }
        )
        console.log("New Org")
        console.log(newOrg)
        return newOrg;
    }
};
