import React from 'react';
import { motion } from 'framer-motion';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const word = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const MotionText = ({ text }) => (
  <motion.p
    variants={sentence}
    initial="hidden"
    animate="visible"
    className=""
  >
    {text.split(' ').map((w, i) => (
      <motion.span key={i} variants={word} className="inline-block mr-1">
        {w}
      </motion.span>
    ))}
  </motion.p>
);

const AboutUs = () => {
  return (
    <div id="aboutdiv">
      <div className="md:w-192 mx-10 py-10 leading-loose">
        <h1 className="font-bold text-2xl pt-2 mb-2">🌟 About Us</h1>

        <MotionText text={`Welcome to "AInformer", where staying informed is effortless and intelligent`} />
        <MotionText text={`We harness the power of AI to curate the latest news from trusted sources around the globe. Our smart algorithms filter through the noise, delivering relevant, reliable, and real-time news tailored to your interests—all in one place.`} />

        <h2 className="font-bold text-xl mt-5 mb-2">🚀 Why Choose Us?</h2>
        <MotionText text={`🌐 Diverse Sources: We gather news from multiple leading platforms.`} />
        <MotionText text={`🤖 AI-Powered Curation: Content is intelligently selected and summarized for quick reading.`} />
        <MotionText text={`⚡ Real-Time Updates: Get the latest stories as they happen.`} />
        <MotionText text={`🎯 Personalized Feed: News tailored to what matters most to you.`} />
        <MotionText text={`Our mission is to make staying updated smarter, simpler, and faster. With AI handling the heavy lifting, you get to focus on the news that truly matters—no clutter, no noise.`} />
        <MotionText text={`💬 Stay informed. Stay ahead.`} />
      </div>
    </div>
  );
};

export default AboutUs;