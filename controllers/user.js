const jwtBlacklist = require("../middlewares/jwtBlackList");
const User = require("../models/user");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res) {
    try {
        const { name, email, password,role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role:role
        });

        // Send success message
        return res.status(201).json({ message: "Signup successful! Please log in.",success:true });
    } catch (error) {
        console.error("Error in handleUserSignup:", error);
        return res.status(500).json({
            error: "An error occurred during signup. Please try again.",
        });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid username or password!" });
        }

        const token = setUser(user);

        // Send token as JSON response
        return res.status(200).json({ token:token, userId: user.id, success:true,role:user.role });
    } catch (error) {
        console.error("Error in handleUserLogin:", error);
        return res.status(500).json({
            error: "An error occurred during login. Please try again.",
        });
    }
}

async function handleUserLogout(req, res) {
    try {
        const token = req.cookies?.uid;

        if (token) {
            jwtBlacklist.add(token);
        }

        res.clearCookie("uid");

        // Send logout success response
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in handleUserLogout:", error);
        return res.status(500).json({
            error: "An error occurred during logout. Please try again.",
        });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
};
