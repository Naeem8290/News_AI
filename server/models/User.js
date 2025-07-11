import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  articleId: String,
  title: String,
  description: String,
  url: String,
  imageUrl: String,
  publishedAt: Date,
  addedAt: { type: Date, default: Date.now },
});

const ReadingHistorySchema = new mongoose.Schema({
  articleId: String,
  title: String,
  description: String,
  source: String,
  url: String,
  imageUrl: String,
  publishedAt: Date,
  readAt: { type: Date, default: Date.now },
})

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  preferences: [String],
  bookmarks: [BookmarkSchema],
  readingHistory: [ReadingHistorySchema],

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

});

const User = mongoose.model('User', UserSchema);

export default User;