const User = require("../models/User");
const { comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/token");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "User not found" });
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (https)
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Login successful"
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};

module.exports = { login, logout };