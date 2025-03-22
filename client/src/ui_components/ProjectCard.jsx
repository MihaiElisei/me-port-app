/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { baseURL } from "@/api";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
      {/* Project Image */}
      <img
        src={`${baseURL}${project.project_image}`}
        alt={project.title}
        className="w-full h-48 object-cover"
      />

      {/* Project Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-zinc-100">
          {project.title}
        </h3>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[project.category].flat().map((category, index) => (
            <span
              key={index}
              className="bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 px-3 py-1 text-xs rounded"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <Link
          to={`/project/${project.slug}`}
          className="mt-4 block text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Project →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
