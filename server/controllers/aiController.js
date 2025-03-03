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
    const { url } = req.body
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
        browser = await puppeteer.launch({ headless: true });
        console.log(browser)
        const page = await browser.newPage();
        console.log(page)

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const extractedText = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('p')).map((p) => p.innerText).join('')
        });

        // console.log(extractedText);

        const summary = await generateSummary(extractedText);

        const newSSummary = new NewsSummary({
            url,
            summary,
          });
      
          await newSSummary.save();
      

        res.status(200).json({
            summary, fullarticle: url
        })
    } catch (error) {}
}