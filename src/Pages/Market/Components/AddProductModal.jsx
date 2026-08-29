import { useState } from "react";
import { X, ImagePlus } from "lucide-react";

const categories = [
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

export default function AddProductModal({ onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Furniture",
    condition: "Used - Good",
    age: "",
    description: "",
    priceType: "Free",
    price: "",
    image: "",
    sellerName: "",
    location: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      condition: formData.condition,
      age: formData.age,
      description: formData.description,
      priceType: formData.priceType,
      price:
        formData.priceType === "Free"
          ? 0
          : Number(formData.price),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      seller: {
        name: formData.sellerName,
        location: formData.location,
        phone: formData.phone,
        email: formData.email,
      },
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-creamLight shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-warmTaupe/10 bg-creamLight px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-denim">
              Add Your Item
            </h2>

            <p className="mt-1 text-sm text-warmTaupe">
              Give something you no longer need a second life.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-denim transition hover:bg-sage hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">

          {/* Image */}
          <div>
            <label className="mb-2 block font-semibold text-denim">
              Product Image
            </label>

            <div className="rounded-2xl border-2 border-dashed border-sage/40 bg-antiqueCream p-6 text-center">
              <ImagePlus
                size={32}
                className="mx-auto mb-2 text-sage"
              />

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="w-full rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
              />

              <p className="mt-2 text-xs text-warmTaupe">
                For now, paste an image URL. Real file upload can be added
                later with a backend.
              </p>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="mb-2 block font-semibold text-denim">
              Product Name
            </label>

            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Wooden Chair"
              className="w-full rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </div>

          {/* Category + Condition */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold text-denim">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-denim">
                Condition
              </label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage"
              >
                <option>New</option>
                <option>Used - Like New</option>
                <option>Used - Good</option>
                <option>Used - Fair</option>
              </select>
            </div>

          </div>

          {/* Age */}
          <div>
            <label className="mb-2 block font-semibold text-denim">
              Product Age
            </label>

            <input
              required
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Example: 2 years"
              className="w-full rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-semibold text-denim">
              Description
            </label>

            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell people more about the item..."
              className="w-full resize-none rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-3 block font-semibold text-denim">
              Price
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <label
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  formData.priceType === "Free"
                    ? "border-forest bg-softGreen/30"
                    : "border-warmTaupe/20 bg-antiqueCream"
                }`}
              >
                <input
                  type="radio"
                  name="priceType"
                  value="Free"
                  checked={formData.priceType === "Free"}
                  onChange={handleChange}
                  className="mr-2"
                />

                <span className="font-semibold text-denim">
                  Free
                </span>
              </label>

              <label
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  formData.priceType === "Symbolic"
                    ? "border-forest bg-softGreen/30"
                    : "border-warmTaupe/20 bg-antiqueCream"
                }`}
              >
                <input
                  type="radio"
                  name="priceType"
                  value="Symbolic"
                  checked={formData.priceType === "Symbolic"}
                  onChange={handleChange}
                  className="mr-2"
                />

                <span className="font-semibold text-denim">
                  Symbolic Price
                </span>
              </label>

            </div>

            {formData.priceType === "Symbolic" && (
              <input
                required
                type="number"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Example: 10000"
                className="mt-3 w-full rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
            )}
          </div>

          {/* Seller Information */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-denim">
              Your Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <input
                required
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
                placeholder="Your Name"
                className="rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage"
              />

              <input
                required
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Your Location"
                className="rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage"
              />

              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage"
              />

              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="rounded-xl border border-warmTaupe/20 bg-creamLight px-4 py-3 text-denim outline-none focus:border-sage"
              />

            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-warmTaupe/20 px-6 py-3 font-semibold text-denim transition hover:bg-antiqueCream"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-full bg-forest px-7 py-3 font-semibold text-white transition hover:bg-sage hover:shadow-lg"
            >
              Add Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}