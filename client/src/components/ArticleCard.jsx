import {
  Card,
  Image,
  Badge,
  Text,
  Group,
  ActionIcon,
  Flex,
  Popover,
  Tooltip,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Eye, Bookmark, Sparkles, Copy, Share2 } from 'lucide-react';
import { addBookmarks, removeBookmarks } from '../redux/slice/newsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ArticleCard = ({ article, category }) => {

  
    const dispatch = useDispatch();



  const bookmarksList = useSelector((state) => state.news.bookmarks);

const isBookmarked = useSelector((state) =>
  state.news.bookmarks.some((b) => b.url === article.url)
);



  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  // const [bookmarks, setBookmarks] = useState(true);
  const [localBookmarked, setLocalBookmarked] = useState(isBookmarked);

  const [randomViews, setRandomViews] = useState(0);

  // Update local state when Redux state changes
useEffect(() => {
  setLocalBookmarked(isBookmarked);
}, [isBookmarked]);

const handleBookmarkClick = () => {
  // Immediate local UI update
  setLocalBookmarked(!localBookmarked);
  // Then trigger the actual bookmark action
  toogleBookmarks(article);
};



  useEffect(() => {
    if (!article.views) {
      setRandomViews(Math.floor(Math.random() * 500));
    }
  }, [article.views]);

  // const dispatch = useDispatch();
  const handleSummarize = async () => {
    setOpened(true);
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/summarize`,
        {
          url: article.url,
        }
      );
      setSummary(res.data.summary);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const toogleBookmarks = (article) => {
  const bookmarkData = {
    articleId: article._id || article.url, // fallback to url if no _id
    title: article.title,
    source: article.source?.name || 'Unknown',
    url: article.url,
    imageUrl: article.urlToImage,
    publishedAt: article.publishedAt,
  };

  if (isBookmarked) {
    dispatch(removeBookmarks(article.url));
  } else {
    dispatch(addBookmarks({ article: bookmarkData }));
  }
};

//   const toogleBookmarks = (n) => {
//   const data = {
//     articleId: n._id,
//     title: n.title,
//     source: n.source.name,
//     url: n.url,
//     imageUrl: n.urlToImage,
//     publishedAt: n.publishedAt,
//   };

//   if (isBookmarked) {
//     dispatch(removeBookmarks(n.url)); // payload is string URL
//   } else {
//     dispatch(addBookmarks({ article: data })); // payload is { article: data }
//   }
// };




  // const toogleBookmarks = (n) => {
  //   console.log(n)
  //   const data = {
  //     article: {
  //       articleId: n._id,
  //       title: n.title,
  //       source: n.source.name,
  //       url: n.url,
  //       imageUrl: n.urlToImage,
  //       publishedAt: n.publishedAt
  //     }
  //   }
  //   if (isBookmarked) {
  //     dispatch(removeBookmarks(n.url));
  //   } else {
  //     dispatch(addBookmarks(data));
  //   }
  // };
  //   if (bookmarks) {
  //    dispatch(addBookmarks(data))
  //   } else {
  //    dispatch(removeBookmarks(n.url))
  //   }

  //   setBookmarks(!bookmarks);
  // };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="flex flex-row gap-6"
    >
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          h={200}
          w="auto"
          fit="contain"
          radius="md"
          className="object-cover"
        />
      )}
      <div className="flex-1">
        <Badge color="yellow" variant="light">
          {category}
        </Badge>
        <h2
          className="cursor-pointer text-xl hover:text-amber-500 hover:underline mt-2"
          onClick={() => window.open(article.url, '_blank')}
        >
          {article.title}
        </h2>
        <Text size="sm" color="gray" mt="sm">
          {article.description}
        </Text>

        <Group mt="md" spacing="xs">
          <Flex align="center" gap="xs">
            <Eye size={16} />
            <Text size="sm">
              {article.views ?? randomViews}
            </Text>
          </Flex>


     {/* <Tooltip
  label={isBookmarked ? 'Remove Bookmark' : 'Bookmark this article'}
  withArrow
  position="top"
>
  <ActionIcon
    onClick={() => toogleBookmarks(article)}
    variant="light"
    size="lg"
    color={isBookmarked ? 'yellow' : 'gray'}
    loading={isLoading} // optional loading state
  >
    <Bookmark
      size={18}
      fill={isBookmarked ? 'currentColor' : 'none'}
    />
  </ActionIcon>
</Tooltip> */}

  <Tooltip
    label={localBookmarked ? 'Remove Bookmark' : 'Bookmark this article'}
    withArrow
    position="top"
  >
    <ActionIcon
      onClick={handleBookmarkClick}
      variant="light"
      size="lg"
      color={localBookmarked ? 'yellow' : 'gray'}
    >
      <Bookmark
        size={18}
        fill={localBookmarked ? 'currentColor' : 'none'}
        className="transition-colors duration-200"
      />
    </ActionIcon>
  </Tooltip>




          
          {/* <Tooltip label={isBookmarked ? 'Remove Bookmark' : 'Bookmark this article'} withArrow position="top">
            <ActionIcon onClick={()=>toogleBookmarks(article)} variant="outline" size="sm" color={isBookmarked ? 'blue' : 'blue' }>
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : null} />
            </ActionIcon>
          </Tooltip> */}

          <Popover
            opened={opened}
            onChange={setOpened}
            width={isLoading ? 350 : 500}
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Tooltip label="Generate Summary" withArrow position="top">
                <ActionIcon
                  variant="gradient"
                  onClick={handleSummarize}
                  size="md"
                  color="yellow"
                  gradient={{ from: 'blue', to: 'cyan', deg: 330 }}
                >
                  <Sparkles size={18} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown style={{ minHeight: isLoading ? 150 : 'auto' }}>
              {isLoading ? (
                <Flex align="center" justify="center" gap="sm">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Sparkles size={30} className="text-sky-500" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500"
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Generating...
                  </motion.span>
                </Flex>
              ) : (
                <motion.div>
                  {summary.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      className="text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                  <Flex justify="flex-end" mt="sm">
                    <Tooltip
                      label={copySuccess ? 'Copied!' : 'Copy summary'}
                      withArrow
                      position="top"
                    >
                      <ActionIcon
                        variant="outline"
                        size="sm"
                        color="blue"
                        onClick={handleCopy}
                      >
                        <Copy size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Flex>
                </motion.div>
              )}
            </Popover.Dropdown>
          </Popover>
        </Group>
      </div>
    </Card>
  );
};

export default ArticleCard;