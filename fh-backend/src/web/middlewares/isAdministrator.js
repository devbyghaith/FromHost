module.exports = (request, response, next) => {
    let isAdministrator = request.user?.administrator;

    if (isAdministrator) next();
    else return response.status(401).json({
        error: true,
        status: "Not authorized",
    });
};