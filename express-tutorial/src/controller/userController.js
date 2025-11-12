import userModel from "../db/db.js";


export const  createUser = async (req, res) => {
    try {
        const {name, description, email} = req.body;

        const existingEmail = await  userModel.findOne({email})
        if(existingEmail){
            console.log('Email already exists');
            return res.status(400).json({message: "Email already exists"});
        }
        const newUser = new userModel({
            name,
            description,
            email,
        })

        await newUser.save()
        res.status(201).json({message: "User created successfully", user: newUser});
    } catch (error) {
        console.log('Error creating user', error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getUsers = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
    }
};

export const getSingleUser= async(req, res) => {
    console.log(first)
    const {id} = req.params;
    try {
        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

