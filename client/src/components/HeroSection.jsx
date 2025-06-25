import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  //   const apiUrl = import.meta.env.VITE_API_URL;
  // console.log(apiUrl); // Will log localhost or production IP based on environment

  return (
    <div className='herodiv'>
      <section className="relative h-screen text-black flex items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0  opacity-80 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <motion.h1
            className="text-4xl md:text-7xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Personalized  <span className="text-sky-700">Headlines Powered </span> by Intelligence
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get instant news updates, smart AI summaries, and tailored recommendations. Explore top headlines, trending topics, and deep insights—all in one place.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <button className="bg-sky-500 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-sky-600 transition-transform transform hover:scale-105 flex items-center" >
              <Link to="/home" className="flex items-center text-white">
                <Sparkles className="mr-2 w-5 h-5" />
                Start Exploring
              </Link>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}