/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { baseURL } from "@/api";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(`${baseURL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      setResponseMessage("Failed to send message. Try again.");
    }

    setLoading(false);
  };

  return (
    <section className="section">
      <div className="container max-w-lg mx-auto">
        <h2 className="headline-2 text-slate-900 dark:text-zinc-400 py-5 text-center">
          Get in Touch.
        </h2>

        {responseMessage && (
          <p className={`text-center ${responseMessage.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {responseMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 dm:w-[70%] mx-auto">
          <label className="text-lg md:text-2xl text-slate-900 dark:text-zinc-400">Name</label>
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

          <label className="text-lg md:text-2xl text-slate-900 dark:text-zinc-400">Email</label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

          <label className="text-lg md:text-2xl text-slate-900 dark:text-zinc-400">Message</label>
          <Textarea className="min-h-50" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message..." required />

          <Button type="submit" disabled={loading} className="w-fit bg-slate-900 text-slate-200 dark:bg-zinc-700 dark:text-zinc-400">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
