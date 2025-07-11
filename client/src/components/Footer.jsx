
import { motion } from "framer-motion";
import { Button } from "@mantine/core";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";


const Footer = () => {


  return (
    <footer id="footer" className="bg-gradient-to-r from-gray-800 via-gray-850 to-gray-900 text-white p-6 md:p-6 opacity-80 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">


        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="logoh" className="text-2xl font-bold">AI Feed
          </h2>
          <p className="text-gray-400">
            Stay updated with the latest AI-powered news summaries and insights.
          </p>
        </motion.div>


        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            {['Home', 'News', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition duration-300">
                  {item === 'News' ? 'Latest News' : item}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>


        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <Button variant="subtle" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <Twitter size={20} />
            </Button>
            <Button variant="subtle" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <Facebook size={20} />
            </Button>
            <Button variant="subtle" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <Instagram size={20} />
            </Button>
            <Button variant="subtle" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <Linkedin size={20} />
            </Button>
          </div>
        </motion.div>
      </div>


      <motion.div
        className="text-center text-gray-500 mt-8 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        © {new Date().getFullYear()} AI Feed. All Rights Reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;