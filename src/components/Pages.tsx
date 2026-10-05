import type { JSX } from "react";

type PagesProps = {
  pages: number;
  currentPage: number;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
};

export default function Pages({
  pages,
  currentPage,
  isLoading,
  handlePageChange,
}: PagesProps): JSX.Element | null {
  if (pages <= 1) return null;
  const maxVisibleButtons = 5;

  let startPage: number = Math.max(
    1,
    currentPage - Math.floor(maxVisibleButtons / 2),
  );
  let endPage: number = startPage + maxVisibleButtons - 1;

  if (endPage > pages) {
    endPage = pages;
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  const visiblePages: number[] = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
  const style: string =
    "transition-all duration-300 ease-linear lg:text-lg hover:[text-shadow:0.5px_0_0_currentColor,-0.5px_0_0_currentColor] focus-visible:[text-shadow:0.5px_0_0_currentColor,-0.5px_0_0_currentColor] disabled:opacity-50 disabled:hover:cursor-not-allowed";

  return (
    <nav
      aria-label="Pagination"
      className="mt-auto flex items-center justify-center gap-2"
    >
      <button
        aria-label="Previous page"
        disabled={isLoading || currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`${style}`}
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button
            disabled={isLoading || currentPage === 1}
            onClick={() => handlePageChange(1)}
            aria-current={currentPage === 1 ? "page" : undefined}
            className={`flex size-6 items-center justify-center sm:size-10 ${style}`}
          >
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {visiblePages.map((page: number): JSX.Element => (
        <button
          key={page}
          disabled={isLoading || currentPage === page}
          onClick={() => handlePageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`flex size-6 items-center justify-center sm:size-10 ${style} ${currentPage === page ? "scale-113 text-xl [text-shadow:0.5px_0_0_currentColor,-0.5px_0_0_currentColor] hover:scale-113" : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        aria-label="Next page"
        disabled={isLoading || currentPage === pages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`${style}`}
      >
        Next
      </button>
    </nav>
  );
}
