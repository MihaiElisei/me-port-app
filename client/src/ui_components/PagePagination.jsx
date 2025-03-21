/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { data } from "react-router-dom";

const PagePagination = ({
  totalPages,
  setPage,
  page,
  increasePage,
  decreasePage,
}) => {
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const firstNumner = numbers[0];
  const lastNumber = numbers[numbers.length - 1];

  return (
    <Pagination>
      <PaginationContent className="my-6 text-slate-900 dark:text-zinc-400">
        {page === firstNumner || (
          <PaginationItem onClick={decreasePage}>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}

        {numbers.map((num) => (
          <PaginationItem key={num} onClick={() => setPage(num)}>
            {num === page ? (
              <PaginationLink
                href="#"
                isActive
                className={`${data.isActive} ? bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-slate-300 dark:bg-zinc-700 dark:text-black: ''`}
              >
                {num}
              </PaginationLink>
            ) : (
              <PaginationLink href="#">{num}</PaginationLink>
            )}
          </PaginationItem>
        ))}

        {page === lastNumber || (
          <PaginationItem onClick={increasePage}>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
