import React from 'react';
import { Divider, Menu } from '@mantine/core';
import { EllipsisVertical, Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
// import { clearReadingHistory, removeBookmarks } from '../redux/slice/newsSlice';
import { clearReadingHistory } from '../redux/slice/readingHistorySlice';
import { removeBookmark } from '../redux/slice/bookmarkSlice';
import { getCookie } from '../utils/utils';

function List({ data, type }) {
  const dispatch = useDispatch();
  const userId = getCookie("id");

  const handleDelete = (item) => {
    if (type === "history") {
      dispatch(clearReadingHistory({ id: userId, articleId: item._id }));
    } else if (type === "bookmark") {
      dispatch(removeBookmark({ id: userId, articleId: item._id }));
    }
  };

  return (
    <div>
      {data?.length > 0 ? (
        data.map((item) => (
          <React.Fragment key={item._id}>
            <div className="flex items-center gap-3 px-3 py-2">
              <a
                href={item.url}
                className="flex-grow text-sm hover:underline transition-all duration-300 truncate"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>

              <Menu>
                <Menu.Target>
                  <EllipsisVertical className="cursor-pointer" />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    style={{ backgroundColor: '#f3f4f6' }}
                    color="red"
                    leftSection={<Trash />}
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <p className="text-center text-gray-700">
          No {type === 'history' ? 'Reading History' : 'Bookmarks'} found.
        </p>
      )}
    </div>
  );
}

export default List;