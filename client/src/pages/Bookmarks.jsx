import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getBookmark } from "../redux/slice/bookmarkSlice.js";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { bookmarks, loading, error } = useSelector((state) => state.bookmark);

  useEffect(() => {
    dispatch(getBookmark());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10 text-lg">Loading bookmarks...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full py-12 px-5 md:px-20"
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        ✨ Your Bookmark Editorials
      </h2>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500 pb-50">No bookmarks found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <motion.div
              key={bookmark.articleId}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {bookmark.imageUrl && (
                <div className="overflow-hidden">
                  <img
                    src={bookmark.imageUrl}
                    alt={bookmark.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">
                  {bookmark.title}
                </h3>
                {bookmark.source && (
                  <p className="text-gray-500 text-sm mb-2">{bookmark.source}</p>
                )}
                {bookmark.description && (
                  <p className="text-gray-700 text-sm line-clamp-3">{bookmark.description}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Saved on: {new Date(bookmark.addedAt).toLocaleString()}
                </p>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sky-500 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default Bookmark;
