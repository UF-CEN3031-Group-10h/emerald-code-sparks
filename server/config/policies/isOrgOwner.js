//
// Check if the current user is an admin of their organization
//
module.exports = async (ctx, next) => {
    console.log("Is org owner");
    console.log("User:")
    console.log(ctx.state.user);

    if (ctx.state.user.organization === null) {
        console.log("not an org member");
        ctx.unauthorized(`You aren't a member of an organization!`);
        return false;
    }
    console.log("Getting organizaiton");
    const org = await strapi.services.organization.findOne({ id: ctx.state.user.organization });
    console.log("Found org: ");
    console.log(org);
    console.log("Org owner:");
    const owner = org.owner;
    console.log(owner);
    if (ctx.state.user.id == owner.id) {
        return await next();
    }
    ctx.unauthorized(`You aren't an admin of your organization!`);


}