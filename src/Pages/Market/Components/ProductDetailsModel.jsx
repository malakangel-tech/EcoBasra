import { X, MapPin, Phone, Mail, User, Tag, Clock } from "lucide-react";

export default function ProductDetailsModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-creamLight shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header / Image */}
        <div className="relative h-64 w-full sm:h-80">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-creamLight/80 text-denim backdrop-blur-md transition hover:bg-creamLight"
          >
            <X size={20} />
          </button>
          
          <span className="absolute bottom-4 left-4 rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-antiqueCream shadow-md">
            {product.category}
          </span>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* Title & Price */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-warmTaupe/15 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-denim sm:text-3xl">
                {product.name}
              </h2>
              <div className="mt-2 flex items-center gap-4 text-sm text-warmTaupe">
                <span className="flex items-center gap-1">
                  <Tag size={16} /> {product.condition}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {product.age}
                </span>
              </div>
            </div>

            <span className="rounded-2xl bg-softGreen/50 px-4 py-2 text-lg font-bold text-forest">
              {product.priceType === "Free"
                ? "Free / مجاني"
                : `${product.price.toLocaleString()} IQD`}
            </span>
          </div>

          {/* Description */}
          <div className="py-6">
            <h3 className="mb-2 text-lg font-bold text-denim">Description</h3>
            <p className="leading-relaxed text-warmTaupe">
              {product.description}
            </p>
          </div>

          {/* Seller Information */}
          <div className="rounded-2xl border border-warmTaupe/15 bg-antiqueCream/50 p-5">
            <h3 className="mb-4 text-base font-bold text-denim">
              Owner Contact Details
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-denim">
              <div className="flex items-center gap-2">
                <User size={18} className="text-sage" />
                <span>{product.seller?.name || "Anonymous"}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-sage" />
                <span>{product.seller?.location || "Basra"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} className="text-sage" />
                <a
                  href={`tel:${product.seller?.phone}`}
                  className="hover:underline hover:text-forest"
                >
                  {product.seller?.phone || "N/A"}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} className="text-sage" />
                <a
                  href={`mailto:${product.seller?.email}`}
                  className="truncate hover:underline hover:text-forest"
                >
                  {product.seller?.email || "N/A"}
                </a>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="w-full rounded-full bg-forest px-6 py-3 font-semibold text-antiqueCream transition hover:bg-sage sm:w-auto"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}