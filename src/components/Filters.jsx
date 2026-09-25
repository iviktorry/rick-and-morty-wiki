export default function Filters({ children }) {
  return (
    <div className="flex flex-col w-fit items-center justify-center gap-2 sm:flex-row md:gap-6">
      {children}
    </div>
  );
}
