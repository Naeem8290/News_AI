import puppeteer from "puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

        res.status(200).json({
            summary, fullarticle: url
        })
    } catch (error) {}
}