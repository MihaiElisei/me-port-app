/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { useState, useEffect } from "react";
import ArticleCard from "@/ui_components/ArticleCard";
import Spinner from "@/ui_components/Spinner";
import { get_articles } from "@/services/articleService";
import PagePagination from "@/ui_components/PagePagination";
import { useSearchParams } from "react-router-dom";

const ArticlesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const data = await get_articles(page);
        setArticles(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
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
          Latest Articles
        </h2>

        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
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

export default ArticlesPage;
