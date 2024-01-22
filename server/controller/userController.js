import { User } from "../model/userSchema.js";

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        const newUser = await User.create({
            name,
            email,
            password,
        });

        return res.status(201).json({
            message: "User created successfully",
            userId: newUser._id.toString(),
            token: await newUser.generateToken(),
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email,
            password,
        });

        if (!user) {
            return res.status(500).json({ error: "Invalid Creds" });
        }

        return res.status(201).json({
            message: "Logged successfully",
            userId: user._id.toString(),
            token: await user.generateToken(),
        });
    } catch (error) {
        console.error("Error logged user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function userDataHandler(req, res) {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ message: userData });
    } catch (error) {
        console.log("Error from user route ", error);
    }
}
export { handleUserSignup, handleUserLogin, userDataHandler };
