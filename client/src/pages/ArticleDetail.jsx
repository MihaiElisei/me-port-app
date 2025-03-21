/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get_article_detail } from "../services/articleService";
import Spinner from "../ui_components/Spinner";
import { baseURL } from "@/api";
import { FormatDate } from "@/services/formatDate";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const data = await get_article_detail(slug);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);
  console.log(article);
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!article) return <p className="text-gray-500">Article not found</p>;

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-3xl md:text-5xl text-slate-900 dark:text-zinc-400 mb-5">
          {article.title}
        </h2>
        <span className="text-slate-900 dark:text-zinc-400">Posted by:</span>
        <div className="flex flex-row items-center gap-3 mt-2">
          <figure>
            <img
              src={
                article.author.profile_image
                  ? `${baseURL}${article.author.profile_image}`
                  : "/images/profile_backup.png"
              }
              alt={article.author.full_name}
              className="w-10 h-10 rounded-full border dark:border-zinc-900 border-slate-300"
            />
          </figure>
          <span className="text-slate-900 dark:text-zinc-400">
            {article.author.full_name} | {FormatDate(article.published_date)}
          </span>
        </div>

        {article.article_image && (
          <figure className="rounded-lg mb-4 mt-10">
            <img
              src={`${baseURL}${article.article_image}`}
              alt={article.title}
              className="w-fit max-h-[70vh] rounded-lg shadow-md"
            />
          </figure>
        )}

        <p className="text-lg text-slate-900 dark:text-zinc-400 mb-4">
          {article.content}
        </p>

        {article.categories && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.categories.map((category, index) => (
              <span
                key={index}
                className="bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 px-3 py-1 text-xs rounded capitalize"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/articles"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;
