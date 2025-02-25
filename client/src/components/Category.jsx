import React from 'react';
import { Tabs } from '@mantine/core';
function Category() {
  const category = [
    'General',
    'Sports',
    'Politics',
    'Business',
    'Entertainment',
    'Movies',
  ];
  return (
    <div className='py-12 px-10'>
      <h1 className="text-center space-y-10 my-6 font-bold text-2xl">Categories</h1>

      <Tabs defaultValue="gallery">
        <Tabs.List>
          {category.map((cat) => (
            <Tabs.Tab className='text-gray-200' size="lg" value={cat}>{cat}</Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  );
}

export default Category;

//  <Tabs.Tab
//             value="Bookmarks"
//             leftSection={<Bookmark size={16} color="orange" />}
//           >
//             Bookmarks
//           </Tabs.Tab>
//           <Tabs.Tab
//             value="messages"
//             leftSection={<Heart size={16} color="red" />}
//           >
//             Liked News
//           </Tabs.Tab>
//           <Tabs.Tab value="preferences" leftSection={<Cog size={16} />}>
//             Preferences
//           </Tabs.Tab>
//           <Tabs.Tab value="ai-recommandations" leftSection={<Bot size={16} />}>
//             AI Recommandations
//           </Tabs.Tab>