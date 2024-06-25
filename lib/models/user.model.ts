import { Schema, model, models, Document, Model } from "mongoose";

// Define the TypeScript interface for the User schema
interface IUser extends Document {
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    photo?: string;
    planId: Number;
    creditBalance: number;
}

// Define the User schema
const UserSchema = new Schema<IUser>({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },   
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    planId: {
        type: Number,
        default:1
    },
    creditBalance: {
        type: Number,
        default: 10,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the User model
const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
