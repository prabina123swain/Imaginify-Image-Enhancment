import { Schema, model, models, Document, Model } from "mongoose";

// Define the TypeScript interface for the Transaction schema
interface ITransaction extends Document {
    createdAt: Date;
    stripeId: string;
    amount: number;
    plan: string;
    credits: number;
    buyer: Schema.Types.ObjectId;
}

// Define the Transaction schema
const TransactionSchema = new Schema<ITransaction>({
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    stripeId: {
        type: String,
        required: true,
        unique:true
    },
    amount: {
        type: Number,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: false, // Disable automatic timestamps as createdAt is managed manually
});

// Create the Transaction model
const Transaction: Model<ITransaction> = models.Transaction || model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
