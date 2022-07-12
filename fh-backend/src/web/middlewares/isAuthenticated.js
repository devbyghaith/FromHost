module.exports = (request, response, next) => {
    let isAuthenticated = request.isAuthenticated?.();

    if (isAuthenticated) next();
    else return response.status(401).json({
        error: true,
        status: "Not authorized",
    });
};