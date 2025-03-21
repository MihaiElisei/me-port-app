/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { Link } from "react-router-dom";
import { baseURL } from "../api";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <img
        src={`${baseURL}${article.article_image}`}
        alt={article.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-zinc-100">
          {article.title}
        </h3>

        <p className="text-sm text-slate-700 dark:text-zinc-400 mt-2">
          {article.content.substring(0, 100)}...
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {article.categories.map((category) => (
            <span
              key={category.id}
              className="bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 px-3 py-1 text-xs rounded capitalize"
            >
              <span
                key={category.id}
                className="bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 px-3 ga py-1 text-xs rounded"
              >
                {category.name}
              </span>
            </span>
          ))}
        </div>

        <div className="flex-grow"></div>

        <div className="mt-auto py-5">
          <Link
            to={`/articles/${article.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
