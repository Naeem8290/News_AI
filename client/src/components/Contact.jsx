import { Button } from '@mantine/core';
import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${form.name}, your message has been received!`);
    setForm({ name: '', email: '', message: '' }); // reset form
  };

  return (
    <div className="my-20 p-6 overflow-x-hidden ">
      <div className="w-full md:w-96 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded"
          ></textarea>
          <Button fullWidth type='submit'>Send Message</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
