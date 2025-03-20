/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  return (
    <div className="container mt-10">
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-5 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
              Mihai Elisei
              <figure className="w-10 h-10">
                <img
                  className="rounded-full"
                  src={darkMode ? "/images/logo.png" : "/images/logo_bg.png"}
                  width={40}
                  height={40}
                  alt="Mihai Elisei Logo"
                />
              </figure>
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unlock the power of creativity and innovation! Get expert
              insights, industry trends, and growth strategies.
            </p>
          </div>

          {/* Quick Links - Displayed as a Grid */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 text-center md:text-left">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-slate-900 dark:text-zinc-400 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:bg-slate-600 hover:text-slate-200 dark:hover:bg-zinc-400 dark:hover:text-zinc-900 rounded-lg px-1 py-1 "
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:bg-slate-600 hover:text-slate-200 dark:hover:bg-zinc-400 dark:hover:text-zinc-900 rounded-lg px-1 py-1 "
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:bg-slate-600 hover:text-slate-200 dark:hover:bg-zinc-400 dark:hover:text-zinc-900 rounded-lg px-1 py-1 "
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="hover:bg-slate-600 hover:text-slate-200 dark:hover:bg-zinc-400 dark:hover:text-zinc-900 rounded-lg px-1 py-1 "
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:bg-slate-600 hover:text-slate-200 dark:hover:bg-zinc-400 dark:hover:text-zinc-900 rounded-lg px-1 py-1 "
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:bg-slate-600 hover:text-slate-200 dark:hover:bg-zinc-400 dark:hover:text-zinc-900 rounded-lg px-1 py-1 "
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <Card className="bg-white dark:bg-zinc-800 p-5 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              📩 Join Our Newsletter!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Get the latest insights, trends, and updates directly in your
              inbox.
            </p>
            <div className="mt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="placeholder-gray-500 dark:placeholder-gray-300"
              />
              <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Subscribe Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Mihai Elisei. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
