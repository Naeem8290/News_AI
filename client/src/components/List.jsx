import React from 'react'
import { Divider, Menu } from '@mantine/core'
import { EllipsisVertical , Trash } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { clearReadingHistory } from '../redux/slice/newsSlice';
import { getCookie } from '../utils/utils';
function List({data}) {

  const dispatch = useDispatch();
  const userId = getCookie("id");

 

  const handleClearHistory = (articleId) => {

    dispatch(clearReadingHistory({ id: userId, articleId }));
  };

  return (
    <div>
        {data.length > 0
                ? data.map((rh) => (
                    <>
                      <div className="flex items-center">
                        <Menu>
                          <Menu.Target>
                            <EllipsisVertical className="cursor-pointer" />
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item color="red" leftSection={<Trash />}    onClick={() => handleClearHistory(rh._id)}
                            >
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>

                        <a
                          href={rh.url}
                          className="block p-3 hover:underline transition-all duration-300"
                          target="_blank"
                        >
                          {rh.title}
                        </a>
                      </div>
                      <Divider />
                    </>
                  ))
                : null}
    </div>
  )
}

export default List