/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({imgSrc, title, tags, slug, classes}) => {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/project/${slug}`);
    };

  return (
    <div
      className={
        "relative p-4 rounded-2xl dark:bg-zinc-800 dark:hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset dark:ring-zinc-50/50 transition-colors dark:text-white cursor-pointer " +
        classes
      }
      onClick={handleClick} 
    >
      <figure className="img-box aspect-square rounded-lg mb-4">
        <img src={imgSrc} alt={title} loading="lazy" className="img-cover" />
      </figure>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="title-1 mb-3">{title}</h3>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((label, key) => (
              <span
                key={key}
                className="h-8 text-sm dark:text-zinc-400 dark:bg-zinc-50/5 grid items-center px-3 rounded-lg"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="w-11 h-11 rounded-lg grid place-items-center dark:bg-zinc-50/5 dark:text-zinc-400 shrink-0">
          <span className="material-symbols-rounded" aria-hidden="true">
            arrow_outward
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard