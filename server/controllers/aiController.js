import puppeteer from "puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
import NewsSummary from '../models/NewsSummary.js';


console.log(process.env.GEMINI_API_KEY);


const genAI = new GoogleGenerativeAI('AIzaSyCwVbJNH1Dni6TcSqWwxiMavGjIskYBq50');


const generateSummary = async (content) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const response = await model.generateContent(`please summarize these content ${content}`)
  // console.log(response.response.text())
  return response.response.text();

}


export const newsSummarize = async (req, res) => {
  const { url, title } = req.body
  // console.log(url);

  const exist = await NewsSummary.findOne({ url });

  if (exist) {
    return res.status(200).json({
      summary: exist.summary,
      fullarticle: url,
    });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-features=site-per-process'
      ],
    });

    console.log(browser)
    const page = await browser.newPage();
    console.log(page)

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
    );

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (err) {
      console.error('Failed to load URL:', err.message);
      return res.status(500).json({ error: 'Failed to load the article' });
    }

    const extractedText = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('p')).map((p) => p.innerText).join('')
    });

    // console.log(extractedText);

    const summary = await generateSummary(extractedText);

    const newSSummary = new NewsSummary({
      url,
      summary,
      title,
    });

    await newSSummary.save();


    res.status(200).json({
      summary, fullarticle: url, title
    })
  } catch (error) {
    console.error("❌ Error calling Gemini:", error.message);
    res.status(500).json({ error: "Failed to summarize" });

  } finally {
    if (browser) await browser.close();
  }

}


export const getSummary = async (req, res) => {
  try {
    const allNews = await NewsSummary.find().sort({ createdAt: -1 });
    res.status(200).json(allNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}