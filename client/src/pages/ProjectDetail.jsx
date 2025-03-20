/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { Link, useParams } from "react-router-dom";
import { works } from "@/data/projects";


const ProjectDetail = () => {
  const { slug } = useParams(); // Get project slug from URL
  const project = works.find((work) => work.slug === slug); // Find the project

  if (!project) {
    return <div className="text-center text-red-500 mt-10">Project not found!</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-3xl md:text-5xl text-slate-900 dark:text-zinc-400">{project.title}</h2>
        <figure className="img-box  mb-4 mt-10">
          <img src={project.imgSrc} alt={project.title} className="img-cover rounded-lg" />
        </figure>
        <p className="text-lg text-slate-900 dark:text-zinc-400 mb-4 font-[Montserrat]">
          {project.description || "No description available."}
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="h-8 text-sm text-slate-900 dark:text-zinc-400 bg-slate-300 dark:bg-zinc-50/5 grid items-center px-3 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.projectLink && (
          <Link
            to={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 underline"
          >
            {project.projectLink}
          </Link>
        )}
        <div className="mt-6">
          <Link to="/portfolio" className="text-gray-700 dark:text-gray-300 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
      
    </section>
  );
};

export default ProjectDetail;
