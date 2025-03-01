import User from '../models/User.js';
import axios from 'axios';

export const Preferences = async (req, res) => {
    try {
        const { id } = req.params;
        const { preferences } = req.body;
        console.log(preferences);

        const user = await User.findById(id)
        console.log(user);

        user.preferences = [...preferences]
        await user.save()

        res.status(200).json({
            message: "Preferences save successfully"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



export const fetchNewsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1 } = req.query;
        const pageSize = 10;

        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
        );
        console.log(response);
        

        if (!response.data.articles.length) {
            return res
                .status(404)
                .json({ message: 'No news found for this category.' });
        }

        res.status(200).json({
            news: response.data.articles,
            nextPage:
                response.data.articles.length === pageSize ? Number(page) + 1 : null,
        });
    } catch (error) {
        console.error(
            'Error fetching news:',
            error.response?.data || error.message
        );
        res.status(500).json({ message: 'Internal server error' });
    }
};