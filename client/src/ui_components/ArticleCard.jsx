import { Link } from "react-router-dom";

const ArticleCard = ({ imgSrc, title, summary, tags, slug }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
      <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-zinc-100">{title}</h3>
        <p className="text-sm text-slate-700 dark:text-zinc-400 mt-2">{summary}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <span key={index} className="bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 px-3 py-1 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/articles/${slug}`}
          className="mt-4 block text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
