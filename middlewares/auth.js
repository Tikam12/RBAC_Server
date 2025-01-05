const { getUser } = require("../service/auth");
const jwtBlacklist = require("./jwtBlackList");

// Middleware to check user authentication
function checkForAuthentication(req, res, next) {
    try {
        const tokenCookie = req.cookies?.uid;

        if (!tokenCookie || jwtBlacklist.has(tokenCookie)) {
            return next();
        }

        const user = getUser(tokenCookie);
        if (!user) {
            return next();
        }

        req.user = user;
        return next();
    } catch (error) {
        console.error("Error in checkForAuthentication:", error);
        return res.status(500).send("Authentication error. Please try again.");
    }
}


function restrictToReLogin(req, res, next) {
    try {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader("Surrogate-Control", "no-store");
        next();
    } catch (error) {
        console.error("Error in restrictToReLogin:", error);
        return res.status(500).send("Error in setting cache headers.");
    }
}

module.exports = {
    checkForAuthentication,
    restrictToReLogin,
};
