import userModel from "../db/db.js";
import {query, validationResult } from "express-validator";


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
        console.log('User created successfully');
    } catch (error) {
        console.log('Error creating user', error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getUsers = async (req, res) => {
    try {
          const {query: {filter, value},} = req;
        query("filter").isString().notEmpty().isLength({min: 3, max: 25}).withMessage("Filter must be between 3 and 25 characters");
        const user = await userModel.find();
      
        const result = validationResult(req);
        console.log("Validation result:", result);
        if(filter && value){
            const filterUser = user.filter((v) => v[filter].includes(value));
            return res.status(200).json(filterUser);
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
    }
};
// export const getUsers = async (req, res) => {
//     try {
//         const user = await userModel.find();
//         const {query: {filter, value},} = req;
//         const result = validationResult(req);
//         console.log("Validation result:", result);
//         if(filter && value){
//             const filterUser = user.filter((v) => v[filter].includes(value));
//             return res.status(200).json(filterUser);
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error)
//     }
// };

export const getSingleUser= async(req, res) => {
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
};

// export const updateUser = async (req, res) => {
//     console.log("Incoming body:", req.body);
//     const {id} =req.params;
//     const { name, description, email} = req.body;
//     try {
//         const updateUser = await userModel.findByIdAndUpdate(
//             {id},
//             {name, description, email},
//             {new: true}
//         )
//         if(!updateUser){
//             return res.status(404).json({message: "User not found"});
//         }
//         res.status(200).json({message: "User updated successfully", user: updateUser});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Internal server error"});
//     }
// };


export const updateUser = async(req, res) => {
    try {
        const {name, description, email} = req.body
        const {id} = req.params;

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            {name, description, email},
            {new: true}
        );
        if(!updatedUser){
            return res.status(404).json({message:"an error occurred"})
        }
        res.status(200).json({message: "User updated successfully", user: updatedUser});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}



export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        console.log("Deleting user with ID:", id);
        const deleteUser = await userModel.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
}