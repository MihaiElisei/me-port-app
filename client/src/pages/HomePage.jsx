/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";
const HomePage = () => {
  const { darkMode } = useOutletContext();

  return (
    <section className="section">
      <div className="container lg:grid lg:grid-cols-2 items-center lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-rounded dark:text-white">
              task_alt
            </span>
            <div className="flex items-center gap-1.5 text-black dark:text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>
          <h2 className="headline-1 max-w-[15ch] sm:max-w-[24ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10 text-center md:text-left">
            Crafting Scalable, High-Performance Websites Optimized for the
            Future of Digital Innovation
          </h2>
          <Button className="h-11 mx-auto md:mx-0 flex items-center gap-x-2">
            Download CV
            <span className="material-symbols-rounded">download</span>
          </Button>
        </div>
        <div className="hidden lg:block">
          <figure className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-zinc-900 via-25% via-zinc-700 to-70% rounded-[20px] overflow-hidden shadow-2xl shadow-zinc-600">
            <img
              className="w-full"
              width={656}
              height={800}
              src="/images/avatar.png"
              alt="Mihai Elisei Image"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
