import { useParams, Link } from "react-router-dom";
import { articles } from "@/data/articles";

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <div className="text-center text-red-500 mt-10">Article not found!</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-3xl md:text-5xl text-slate-900 dark:text-zinc-400">{article.title}</h2>
        <figure className="img-box rounded-lg  mb-4 mt-10">
          <img src={article.imgSrc} alt={article.title} className="img-cover" />
        </figure>
        <p className="text-lg text-slate-900 dark:text-zinc-400 mb-4">{article.content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag, index) => (
            <span key={index} className="bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 px-3 py-1 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        {/* Back to Articles Button */}
        <div className="mt-6">
          <Link to="/articles" className="text-gray-700 dark:text-gray-300 hover:underline">
            ← Back to Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;
