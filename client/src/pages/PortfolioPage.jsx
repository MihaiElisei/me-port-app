/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import ProjectCard from "@/ui_components/ProjectCard";
import {works} from "@/data/projects.js";

const PortfolioPage = () => {
  return (
    <section className="section">
      <div className="container">
      <h2 className="headline-2 text-slate-900 dark:text-zinc-400 py-5">My Portfolio highlights</h2>
        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {works.map(({ imgSrc, title, tags, slug }, key) => (
            <ProjectCard
              key={key}
              imgSrc={imgSrc}
              title={title}
              tags={tags}
              slug={slug} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioPage