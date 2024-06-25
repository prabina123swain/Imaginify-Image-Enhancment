import { Schema, model, models, Document, Model } from "mongoose";

// Define the TypeScript interface for the Image schema
interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureUrl?: string;
    width?: number;
    height?: number;
    config?: Object;
    tansformationUrl?: string;
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author?: {
        _id:string,
        firstName:string,
        lastName:string
    };
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the Image schema
const ImageSchema = new Schema<IImage>({
    title: {
        type: String,
        required: true
    },
    transformationType: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    secureUrl: {
        type: String, // Use String instead of URL
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    config: {
        type: Object
    },
    tansformationUrl: {
        type: String, // Use String instead of URL
    },
    aspectRatio: {
        type: String
    },
    color: {
        type: String
    },
    prompt: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Image model
const Image: Model<IImage> = models.Image || model<IImage>('Image', ImageSchema);

export default Image;
