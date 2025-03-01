import News from "../models/News.js";
import axios from 'axios'



const countries = ['us', 'uk', 'fr', 'in', 'it'];
const categories = [
    'health',
    'science',
    'sports',
    'entertainment',
    'politics',
    'business',
];
const fetchNewsAndStore = async () => {
    for (let country of countries) {
        for (let category of categories) {
            const { data } = await axios.get(
                `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`
            );

            if (data.articles && data.articles.length > 0) {
                for (let d of data.articles) {
                    const exist = await News.findOne({ title: d.title });

                    if (!exist) {
                        const newData = await News.create({
                            content: d.content,
                            title: d.title,
                            author: d.author,
                            description: d.description,
                            url: d.url,
                            urlToImage: d.urlToImage,
                            category,
                            publishedAt: d.publishedAt,
                            country,
                            source: {
                                id: d.source.id,
                                name: d.source.name,
                            },
                        });
                        console.log(`Inserted ${d.title} [${category}-${country}]`);
                    } else {
                        console.log(`Already exists ${d.title}`);
                    }
                }
            } else {
                console.log('no data found');
            }
        }
    }
};
// fetchNewsAndStore();
// cron.schedule('*/15 * * * *', fetchNewsAndStore);
export default fetchNewsAndStore;

