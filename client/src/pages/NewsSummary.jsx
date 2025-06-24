import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummary } from '../redux/slice/newsSlice';

const NewsSummary = () => {
  const dispatch = useDispatch();
  const { summaries, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  if (loading) return <p>Loading summaries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
   <div className="p-10 pb-60">
  <h2 className="text-2xl font-bold mb-4">All News Summaries</h2>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {summaries.map((item) => (
      <div
        key={item._id}
        className="border p-4 rounded shadow h-full"
      >
        <a
          href={item.url}
          target="_blank"
          className="text-blue-600 underline block mb-2"
        >
          {item.title || item.url}
        </a>
        <p className="text-gray-700 text-sm">{item.summary}</p>
        {item.description && (
          <p className="text-sm italic text-gray-500 mt-1">{item.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Posted: {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
</div>

  );
};

export default NewsSummary;
