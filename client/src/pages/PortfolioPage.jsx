/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { get_projects } from "@/services/prejectService";
import PagePagination from "@/ui_components/PagePagination";
import ProjectCard from "@/ui_components/ProjectCard";
import Spinner from "@/ui_components/Spinner";
import { useEffect, useState } from "react";
import { data, useSearchParams } from "react-router-dom";

const PortfolioPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const data = await get_projects(page);
        setProjects(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
    setSearchParams({ page });
  }, [page, setSearchParams]);

  function increasePage() {
    setPage((prevPage) => prevPage + 1);
  }
  function decreasePage() {
    setPage((prevPage) => prevPage - 1);
  }
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2 text-slate-900 dark:text-zinc-400 py-5">
          My Portfolio highlights
        </h2>
        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <PagePagination
          increasePage={increasePage}
          decreasePage={decreasePage}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </section>
  );
};

export default PortfolioPage;
