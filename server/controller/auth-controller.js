import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { upsertStreamUser } from "../configs/stream.js";

// User register
export const Register = async (req, res) => {
    try {
        const salt = 10;

        const { fullname, email, password } = req.body;

        // need to password hash before save
        // need to generate token
        // need to store token cookies

        if (!fullname || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "require value is missing" });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be atleast 6 characters",
            });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Email is not valid" });
        }

        // need to find exists email -> this all ready exists
        const isExistsEmail = await User.findOne({ email });

        if (isExistsEmail) {
            return res.status(409).json({
                success: false,
                message: "User all ready exists. Please login",
            });
        }

        const idx = Math.floor(Math.random() * 100) + 1; // generate number between 1-100
        const randomAvatar = `https://avatar-placeholder.iran.liara.run/${idx}.png`;

        // need to hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, salt);

        const savedUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            profilePic: randomAvatar,
        });

        if (savedUser) {
            // NOTE: Need to create user in stream API
            try {
                await upsertStreamUser({
                    id: savedUser._id.toString(),
                    name: savedUser.fullname,
                    image: savedUser.profilePic || "",
                });

                console.log(`Upstream user ${savedUser.fullname} created`);
            } catch (error) {
                console.log("Error happen create new user in stream", error);
            }

            // need to generate token using jwt
            const token = await jwt.sign(
                { id: savedUser._id },
                process.env.SECRET_KEY,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == "production",
                sameSite:
                    process.env.NODE_ENV == "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                message: "User saved successfully",
                data: {
                    id: savedUser._id,
                    name: savedUser.fullname,
                    email: savedUser.email,
                },
            });
        }

        // need to store token cookies
    } catch (error) {
        console.log("Internal server error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// User login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res
                .status(404)
                .json({ success: false, message: "All field are required" });

        const isExistsUser = await User.findOne({ email });

        if (!isExistsUser)
            return res.status(404).json({
                success: false,
                message: "Email or password incorrect",
            });

        // need to compare password to db exists password
        const isPassword = bcrypt.compare(password, isExistsUser.password);
        console.log(isPassword);
        if (isPassword) {
            const token = jwt.sign(
                { id: isExistsUser._id },
                process.env.SECRET_KEY,
                {
                    expiresIn: "7d",
                }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == "production",
                sameSite:
                    process.env.NODE_ENV == "production" ? "none" : "strict",
            });

            return res.status(200).json({
                success: true,
                message: "User login successfully",
                user: isExistsUser,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Email or password incorrect",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// NOTE: User logout
export const LogOut = (req, res) => {
    try {
        // need to clear cookies

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
        });

        return res
            .status(200)
            .json({ success: true, message: "User Logout successfully" });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

// NOTE: Updated user data after onboarding
export const Onboard = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId)
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });

        const {
            fullname,
            bio,
            profilePic,
            nativeLanguage,
            learningLanguage,
            location,
        } = req.body;

        if (
            !fullname ||
            !bio ||
            !profilePic ||
            !nativeLanguage ||
            !learningLanguage ||
            !location
        )
            return res
                .status(404)
                .json({ success: false, message: "Some field are missing" });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboarded: true,
            },
            { new: true }
        ).select("-password");

        if (!updatedUser)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        try {
            await upsertStreamUser({
                id: updatedUser._id,
                name: updatedUser.fullname,
                image: updatedUser.profilePic || "",
            });

            console.log(`Updated stream user ${updatedUser.fullname}`);
        } catch (error) {
            console.log(`Error happen updating upsert user ${error}`);
        }

        return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};

// NOTE: Check authorization a user
export const CheckAuth = async (req, res) => {
    try {
        const userId = req.userId;

        const isUserExists = await User.findById(userId).select("-password");

        if (!isUserExists) {
            return res
                .status(404)
                .json({ success: true, message: "User not found" });
        }

        return res
            .status(200)
            .json({ success: true, message: "Authorization Completed" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};
