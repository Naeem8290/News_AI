import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getReadingHistory } from "../redux/slice/readingHistorySlice.js";

const ReadingHistory = () => {
  const dispatch = useDispatch();
  const { readingHistory, loading, error } = useSelector((state) => state.readingHistory);

  useEffect(() => {
    dispatch(getReadingHistory());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10 text-lg">Loading Reading History...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full py-12 px-5 md:px-20"
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        📖 Your Reading History
      </h2>

      {readingHistory.length === 0 ? (
        <p className="text-center text-gray-500 pb-50">No reading history found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {readingHistory.map((item) => (
            <motion.div
              key={item.articleId}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {item.imageUrl && (
                <div className="overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                {item.source && (
                  <p className="text-gray-500 text-sm mb-2">{item.source}</p>
                )}
                {item.description && (
                  <p className="text-gray-700 text-sm line-clamp-3">{item.description}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Read on: {new Date(item.addedAt).toLocaleString()}
                </p>
                <a
                  href={item.url}
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

export default ReadingHistory;
