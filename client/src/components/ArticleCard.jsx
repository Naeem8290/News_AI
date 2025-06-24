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
import { addBookmark, getBookmark, removeBookmark } from '../redux/slice/bookmarkSlice.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCookie } from '../utils/utils.js';

const ArticleCard = ({ article, category }) => {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmark()); // loads user's bookmarks into Redux
  }, []);

  const bookmarksList = useSelector((state) => state.bookmark.bookmarks);

  const isBookmarked = useSelector((state) =>
    state.bookmark.bookmarks.some((b) =>
      b.articleId === (article._id || article.url)
    )
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


  const userId = getCookie("id");

  const toogleBookmarks = (article) => {
    const userId = getCookie("id");

    const bookmarkData = {
      articleId: article._id || article.url,
      title: article.title,
      source: article.source?.name || 'Unknown',
      url: article.url,
      imageUrl: article.urlToImage || '',
      publishedAt: article.publishedAt || new Date().toISOString(),
    };

    const alreadyBookmarked = bookmarksList.find(
      (b) => b.articleId === (article._id || article.url)
    );

    if (alreadyBookmarked) {
      dispatch(removeBookmark({
        id: userId,
        articleId: alreadyBookmarked._id // Send Mongo ID here
      }));
    } else {
      dispatch(addBookmark({ article: bookmarkData }));
    }

  };

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


          <Popover
            opened={opened}
            onChange={setOpened}
            width={isLoading ? 350 : 350}
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