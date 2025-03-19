/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

const SkillCard = ({ imgSrc, label, desc, classes }) => {
  return (
    <div
      className={
        "flex items-center gap-3 ring-2 ring-inset dark:ring-slate-800 rounded-2xl p-3 bg-slate-00 hover:bg-slate-900 dark:hover:bg-zinc-700 hover:text-slate-100 transition-colors " +
        classes
      }
    >
      <figure className="bg-stone-100 text-slate-900 dark:bg-zinc-500 rounded-lg overflow-hidden w-12 h-12 p-2 group-hover:bg-zinc-900 transition-colors">
        <img src={imgSrc} alt={label} height={32} width={32} />
      </figure>
      <div>
        <h3 className="dark:text-zinc-400">{label}</h3>
        <p className="dark:text-zinc-400 text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default SkillCard;
