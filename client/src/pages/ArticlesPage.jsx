/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { articles } from "@/data/articles";
import ArticleCard from "@/ui_components/ArticleCard";

const ArticlesPage = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2 text-slate-900 dark:text-zinc-400 py-5">Latest Articles</h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {articles.map(({ imgSrc, title, summary, tags, slug }) => (
            <ArticleCard key={slug} imgSrc={imgSrc} title={title} summary={summary} tags={tags} slug={slug} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default ArticlesPage