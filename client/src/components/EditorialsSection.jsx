import { motion } from 'framer-motion';

const featuredArticles = [
  {
    id: 1,
    title: 'The Future of AI in Journalism',
    author: 'Vishal Singh',
    date: 'Mar 28, 2025',
    excerpt:
      'AI is transforming the way news is reported and consumed. What does the future hold for human journalists?',
    image: '/TheFutureofAIinJournalism.jpg',
    read: 'https://medium.com/@lrovinalti/how-ai-is-transforming-journalism-and-television-broadcasting-e05740a941bd'

  },
  {
    id: 2,
    title: 'Bias in AI-Powered News',
    author: 'Vaibhav Kumawat',
    date: 'Mar 25, 2025',
    excerpt:
      "How do AI algorithms shape the news we see, and can they be truly unbiased in today's digital landscape?",
    image: '/BiasinAI-PoweredNews.webp',
    read: 'https://theconversation.com/what-will-a-robot-make-of-your-resume-the-bias-problem-with-using-ai-in-job-recruitment-231174'
  },
  {
    id: 3,
    title: 'The Ethics of AI-Generated News',
    author: 'Rahul Kumar',
    date: 'Mar 22, 2025',
    excerpt:
      'As AI-generated articles become more common, ethical concerns arise about misinformation and credibility.',
    image: '/TheEthicsofAI-GeneratedNews.png',
    read: 'https://aicontentfy.com/en/blog/ethics-of-ai-generated-fake-news'
  },
  {
    id: 4,
    title: 'AI Is Writing the News Now',
    author: 'Prakash Jaat',
    date: 'Mar 20, 2025',
    excerpt:
      'AI-generated articles raise questions about accuracy, bias, and the future role of human journalists.',
    image: '/AIIsWritingtheNewsNow.jpg',
    read: 'https://www.responsesource.com/blog/journalism-and-ai-the-benefits-and-risks/'

  },
  {
    id: 5,
    title: 'The Dark Side of AI News',
    author: 'Mamta Kumawat',
    date: 'Mar 18, 2025',
    excerpt:
      'Concerns grow over misinformation, deepfakes, manipulation, and lack of transparency in AI-powered news platforms.',
    image: '/TheDarkSideofAINews.jpeg',
    read: 'https://home.cib.natixis.com/articles/the-dark-side-of-ai'
  },
  {
    id: 6,
    title: 'Can AI Make News Safer?',
    author: 'Salman Khan',
    date: 'Mar 15, 2025',
    excerpt:
      'Experts debate whether AI can detect fake news better than humans—or make truth even harder to identify.',
    image: '/CanAIMakeNewsSafer.jpg',
    read: 'https://dlabs.ai/blog/can-artificial-intelligence-make-us-safer/'
  },
];

const EditorialsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full py-12 px-5 md:px-20"
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        📰 Featured Editorials
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {featuredArticles.map((article) => (
          <motion.div
            key={article.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                By {article.author} • {article.date}
              </p>
              <p className="text-gray-700">{article.excerpt}</p>
              <button className="mt-4 text-sky-400 font-semibold hover:underline">
                <a href={article.read} target='_blank'>Read More →</a>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EditorialsSection;