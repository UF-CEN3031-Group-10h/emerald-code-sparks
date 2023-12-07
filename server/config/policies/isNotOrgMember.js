//
// Check if the current user is a member of a specific org
//
module.exports = async (ctx, next) => {
    console.log("Is not org member");
    console.log("User:");
    console.log(ctx.state.user);

    if (ctx.state.user.organization === null) {
        // Go to next policy or controller
        return await next()
    }

    ctx.unauthorized(`You are already part of an organization`);
}