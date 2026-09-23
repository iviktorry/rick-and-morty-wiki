export default function Pages({ pages, setCurrentPage, currentPage }) {
  if (pages <= 1) return null;
  const maxVisibleButtons = 10;

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
    "hover:scale-117 ring-neutral-800 transition-all duration-200 ease-linear disabled:opacity-50 disabled:hover:scale-100";
  return (
    <section className="flex flex-wrap justify-center gap-3 md:gap-6">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={`${style}`}
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button className={`${style}`} onClick={() => setCurrentPage(1)}>
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`size-8 rounded-full ring-2 ${style} ${currentPage === page ? "scale-112 text-xl font-medium" : null}`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === pages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`${style}`}
      >
        Next
      </button>
    </section>
  );
}
