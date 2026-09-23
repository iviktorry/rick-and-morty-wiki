export default function Pages({ pages, setCurrentPage }) {
  function handlePageChange(event) {
    const button = event.currentTarget.value;
    setCurrentPage(button);
  }
  return (
    <section className="grid grid-cols-12 gap-3">
      {Array.from({ length: pages }).map((_, index) => (
        <button
          key={index}
          className="rounded-sm p-1 ring"
          value={index + 1}
          onClick={handlePageChange}
        >
          {index + 1}
        </button>
      ))}
    </section>
  );
}
