import UserModel from '../models/User.js';
import bcrypt from "bcrypt";
export const  Register = async (req,res) => { 

    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password || !req.file) {
            return res.status(400).json({success: false, message: `${!name ? "Name is required" : !email ? "Email is required" : !password ? "Password is required" :  !req.file ? "Profile image is required" : "" } is required` });
        }
        const existUser = await UserModel.findOne({ email });
        if(existUser) {
            return res.status(400).json({success: false, message: "User already exists" });
        }   

        const BaseUrl = `${req.protocol}://${req.get('host')}`;
        // console.log('BaseUrl', BaseUrl);
        const imagePath = req.file ? `${BaseUrl}/images/${req.file.filename}` : null;

        const hashedPassword = await bcrypt.hash(password, 10);
        // crate user
        const user = await UserModel({ 
            name, email, password: hashedPassword, profile: imagePath
        });
        await user.save();
        // Check if user was created successfull
        if(!user) {
            return res.status(500).json({success: false, message: "User creation failed" });
        }
        return res.status(201).json({success: true, message: "User created successfully", user });
    }
    catch (error) {
        console.error("Error in Register:", error);
        return res.status(500).json({success: false, message: "Internal server error" });    
    }
} 


export const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({success: false, message: `${!email ? "Email is required" : !password ? "Password is required" : "" } is required` });
        }
        const existUser = await UserModel.findOne({ email });
        if(!existUser) {
            return res.status(404).json({success: false, message: "User not found" });
        } 
        const isMatch =  await bcrypt.compare(password, existUser.password);
        if(!isMatch) {
            return res.status(400).json({success: false, message: "Invalid credentials" });
        } 
        res.status(200).json({success: true, message: "Login successful",
            user: {
                _id: existUser._id,
                name: existUser.name,
                email: existUser.email,
                profile: existUser.profile
            }
        });
    }
    catch (error) {
        console.error("Error in Logi =n:", error);
        return res.status(500).json({success: false, message: "Internal server error" });
    }   
}