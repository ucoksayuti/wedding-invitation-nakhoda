import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    attendance: { type: String, required: true },
}, { timestamps: true }); // This will add createdAt and updatedAt fields

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;