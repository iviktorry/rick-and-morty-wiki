export default function Filters({ children }) {
  return (
    <div className="flex flex-row justify-center gap-2 sm:flex-row md:gap-6">
      {children}
    </div>
  );
}
// фильтры так чтобы выводился массив на локациях и эпизодах
