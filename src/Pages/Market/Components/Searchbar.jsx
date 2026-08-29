import { Search } from "lucide-react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-warmTaupe"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products..."
        className="w-full rounded-full border border-warmTaupe/20 bg-creamLight py-3 pl-12 pr-5 text-denim outline-none transition-all placeholder:text-warmTaupe focus:border-sage focus:ring-2 focus:ring-sage/20"
      />
    </div>
  );
}