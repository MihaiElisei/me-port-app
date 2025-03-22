/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get_project_detail } from "../services/prejectService";
import Spinner from "../ui_components/Spinner";
import { baseURL } from "@/api";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const data = await get_project_detail(slug);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!project) return <p className="text-gray-500">Project not found</p>;

  return (
    <section className="section">
      <div className="container">
        {/* Project Title */}
        <h2 className="text-3xl md:text-5xl text-slate-900 dark:text-zinc-400 mb-5">
          {project.title}
        </h2>

        {/* Project Image */}
        {project.project_image && (
          <figure className="rounded-lg mb-4 mt-10">
            <img
              src={`${baseURL}${project.project_image}`}
              alt={project.title}
              className="w-fit max-h-[70vh] rounded-lg shadow-md"
            />
          </figure>
        )}

        {/* Project Description */}
        <p className="text-lg text-slate-900 dark:text-zinc-400 mb-4">
          {project.description || "No description available."}
        </p>

        {/* Categories */}
        {project.category && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 px-3 py-1 text-xs rounded capitalize">
              {project.category}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 px-3 py-1 text-xs rounded capitalize"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Live Demo & GitHub Links */}
        <div className="mt-4">
          {project.live_demo && (
            <Link
              to={project.live_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 hover:underline"
            >
              Live Demo
            </Link>
          )}
          {project.github_link && (
            <Link
              to={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              GitHub Repository
            </Link>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            to="/portfolio"
            className="text-gray-700 dark:text-gray-300 hover:underline"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
