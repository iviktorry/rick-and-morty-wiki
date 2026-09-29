export default function Pages({
  pages,
  currentPage,
  isLoading,
  handlePageChange,
}) {
  if (pages <= 1) return null;
  const maxVisibleButtons = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = startPage + maxVisibleButtons - 1;

  if (endPage > pages) {
    endPage = pages;
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
  const style =
    "transition-all duration-300 ease-linear lg:text-lg hover:[text-shadow:0.5px_0_0_currentColor,-0.5px_0_0_currentColor] focus-visible:[text-shadow:0.5px_0_0_currentColor,-0.5px_0_0_currentColor] disabled:opacity-50 disabled:hover:text-shadow-none";

  return (
    <nav
      aria-label="Pagination"
      className="mt-auto flex items-center justify-center gap-2"
    >
      <button
        disabled={isLoading || currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`${style}`}
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button
            disabled={isLoading}
            className={`size-6 items-center justify-center sm:size-8 ${style}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}
      {visiblePages.map((page) => (
        <button
          key={page}
          disabled={isLoading}
          onClick={() => handlePageChange(page)}
          className={`flex size-6 items-center justify-center rounded-full sm:size-8 ${style} ${currentPage === page ? "scale-113 text-xl font-semibold" : null}`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={isLoading || currentPage === pages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`${style}`}
      >
        Next
      </button>
    </nav>
  );
}
