import React, { useEffect, useState } from 'react';


const News = () => {


    const category = ["Technology", "Business", "Sports", "Entertainment", "Health" , "Science"];
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/news") 
            .then((response) => response.json())
            .then((data) => {
                // console.log("Fetched News:", data);
                setNews(data);
            })
            .catch((error) => console.error("Error fetching news:", error));
    }, []);


    return (
        <div className="flex min-h-screen bg-gray-100" >

            <aside className="w-1/6 p-4 bg-white shadow-md h-screen sticky top-0 left-0">
          <h2 className="text-xl font-bold p-4 ">Categories</h2>
               <ul>
                    {category.map((category, index) => (
                        <li key={index} className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>


            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">Latest News</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((article, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <img src={article.urlToImage} alt="News" className="w-full h-40 object-cover rounded-md" />
                            <h3 className="text-lg font-semibold mt-2"><a href={article.url} className='hover:text-blue-400'>{article.title}</a></h3>
                            <p className="text-sm text-gray-600">{article.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default News
