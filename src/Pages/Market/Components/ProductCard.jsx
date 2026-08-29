import { Eye } from "lucide-react";

export default function ProductCard({ product, onViewMore }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-warmTaupe/15 bg-creamLight shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-antiqueCream/90 px-3 py-1 text-xs font-semibold text-forest backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="p-5">

        <div className="mb-3">
          <h3 className="text-xl font-bold text-denim">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-warmTaupe">
            {product.condition}
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between">

          <span className="rounded-full bg-softGreen/40 px-3 py-1 text-sm font-semibold text-forest">
            {product.priceType === "Free"
              ? "Free"
              : `${product.price.toLocaleString()} IQD`}
          </span>

          <span className="text-sm text-warmTaupe">
            {product.age}
          </span>

        </div>

        <button
          onClick={() => onViewMore(product)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-sage px-5 py-3 font-semibold text-antiqueCream transition-all duration-300 hover:bg-forest hover:shadow-md"
        >
          <Eye size={18} />
          View More
        </button>

      </div>
    </article>
  );
}