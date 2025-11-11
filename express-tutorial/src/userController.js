import userModel from "./db/db";


export const  createUser = async (req, res) => {
    try {
        const {name, description, email} = req.body;

        const existingEmail = await  userModel.find({email})
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
}
