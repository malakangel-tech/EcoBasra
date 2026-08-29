const categories = [
  "All",
  "Furniture",
  "Electronics",
  "Books",
  "Clothes",
  "Home & Kitchen",
  "Garden",
  "Sports",
  "Toys",
  "Other",
];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
            selectedCategory === category
              ? "bg-forest text-antiqueCream shadow-md"
              : "bg-creamLight text-denim hover:bg-softGreen"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}