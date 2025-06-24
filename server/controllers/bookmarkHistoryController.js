import User from '../models/User.js';


export const getBookmarkHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: 'User not found' });
    res.status(200).json({
      data: user.bookmarks,
    });
  } catch (error) {}
};


export const clearBookmarkHistory = async (req, res) => {
  try {
    const { id , articleId } = req.params;
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: 'User not found' });
    // user.readingHistory = [];
    user.bookmarks = user.bookmarks.filter(
      (article) => article._id.toString() !== articleId
    );

    await user.save();
    res.status(200).json({
      message: 'History cleared',
    });
  } catch (error) {}
};


export const addBookmarkHistory = async (req, res) => {
  try {
    console.log(req.body)
    const { id } = req.params;
    const { article } = req.body; 
    console.log(article);
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: 'User not found' });
    console.log(user);
    user.bookmarks = user.bookmarks.filter(
      (b) => b.url !== article.url
    );

    user.bookmarks.unshift(article);

    if (user.bookmarks.length > 50) {
      user.bookmarks.pop();
    }
    await user.save();
    res.status(201).json({
      message: 'bookmark history saved',
    });
  } catch (error) {}
};