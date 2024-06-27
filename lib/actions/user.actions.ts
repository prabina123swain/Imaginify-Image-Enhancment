"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose"
import User from "../models/user.model";
import { handleError } from "../utils";


export async function createUser(user:CreateUserParams) {
    
    try{
        await connectToDatabase();
        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } 
    catch(error){
        handleError(error);
    }
}


export async function getUserById(userId:string) {
    try{
        await connectToDatabase();
        const user = await User.findById({clerkId:userId});
        if(!user){
            throw new Error("User not found");
        }
        return JSON.parse(JSON.stringify(user));
    } 
    catch(error){
        handleError(error);
    }
}


export async function updateUser(clerkId:string, user:UpdateUserParams) {
    try{
        console.log("Inside create user");
        await connectToDatabase();
        console.log("connected to DB");
        const updatedUser = await User.findByIdAndUpdate({clerkId},user,{new:true});
       
        if(!updatedUser){
            throw new Error("User updation failed ");
        }
        return JSON.parse(JSON.stringify(updatedUser));
    } 
    catch(error){
        handleError(error);
    }
}


export async function deleteUser(userId:string) {
    try{
        await connectToDatabase();
        const user = await User.findOne({clerkId:userId});
        if(!user){
            throw new Error("User not found to delete");
        }

        const deleteUser = User.findByIdAndDelete({_id:user._id});

        revalidatePath("/");
        return deleteUser ? JSON.parse(JSON.stringify(deleteUser)):null;
    } 
    catch(error){
        handleError(error);
    }
}
