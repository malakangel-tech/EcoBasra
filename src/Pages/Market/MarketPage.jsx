import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import initialProducts from "./data/Product";
import ProductDetailsModal from "./Components/ProductDetailsModel";
import ProductCard from "./Components/ProductCard";
import SearchBar from "./Components/Searchbar";
import CategoryFilter from "./Components/CategoryFilter";
import AddProductModal from "./Components/AddProductModal";

export default function MarketPage() {
    // Products state
    const [products, setProducts] = useState(initialProducts);

    // Search and category state
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Product details modal state
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Add product modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Add a new product
    const handleAddProduct = (newProduct) => {
        setProducts((prevProducts) => [
            newProduct,
            ...prevProducts,
        ]);
    };

    // Search + category filtering
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    return (
        <main className="min-h-screen bg-antiqueCream px-6 py-10 md:px-10 lg:px-16">

            {/* Header */}
            <section className="mb-10">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sage">
                    Give • Reuse • Reduce
                </p>

                <h1 className="text-4xl font-bold text-denim md:text-5xl">
                    Eco Market
                </h1>

                <p className="mt-3 max-w-2xl text-warmTaupe">
                    Give your unused items a second life. Share, donate, or offer
                    things you no longer need to someone who can use them.
                </p>
            </section>

            {/* Add Product Button */}
            <div className="mb-8 flex justify-end">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-sage hover:shadow-xl"
                    aria-label="Add product"
                >
                    <Plus size={28} />
                </button>
            </div>

            {/* Search */}
            <section className="mb-5">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </section>

            {/* Categories */}
            <section className="mb-10">
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </section>

            {/* Products */}
            <section>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onViewMore={setSelectedProduct}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-60 items-center justify-center rounded-3xl bg-creamLight px-6 text-center">
                        <div>
                            <h2 className="text-xl font-bold text-denim">
                                No products found
                            </h2>

                            <p className="mt-2 text-warmTaupe">
                                Try another search term or category.
                            </p>
                        </div>
                    </div>
                )}
            </section>

            {/* Product Details Modal */}
            {selectedProduct && (
                <ProductDetailsModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <AddProductModal
                    onClose={() => setIsAddModalOpen(false)}
                    onAddProduct={handleAddProduct}
                />
            )}

        </main>
    );
}