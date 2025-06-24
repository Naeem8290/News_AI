import mongoose from 'mongoose';


const NewsSummarySchema = new mongoose.Schema({
    title: { type: String, },
    url: { type: String, required: true, unique: true },
    summary: { type: String, required: true }
}, {
    timestamps: true
});


const NewsSummary = mongoose.model('newssummary', NewsSummarySchema);
export default NewsSummary;