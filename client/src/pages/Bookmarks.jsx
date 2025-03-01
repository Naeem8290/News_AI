import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmark } from "../redux/slice/bookmarkSlice.js";

const Bookmark = () => {
    const dispatch = useDispatch();
    const { bookmarks, loading, error } = useSelector((state) => state.bookmark);

    const userId = "userId_here"; // Pass the correct user ID

    useEffect(() => {
        dispatch(getBookmark(userId));  // ✅ Fetch bookmarks on mount
    }, [dispatch, userId]);

    if (loading) return <p>Loading bookmarks...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Your Bookmarks</h2>
            {bookmarks.length === 0 ? (
                <p>No bookmarks found.</p>
            ) : (
                <ul>
                    {bookmarks.map((bookmark) => (
                        <li key={bookmark._id}>
                            <h4>{bookmark.title}</h4>
                            <p>{bookmark.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Bookmark;
