import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../api/productApi';
import SearchBar from '../components/SearchBar';
import FilterProducts from '../components/FilterProducts';
import Products from '../components/Products';
import '../styles/products.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFiltereditems] = useState([]);
    const [searchquery, setsearchquery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortproducts, setSortproducts] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    // const[totalpage,settotalpage] = useState('')
    const productsperpage = 4;

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [products, searchquery, selectedCategory, sortproducts]);

    const fetchProducts = async () => {
        
        try {
            setError('')
            setLoading(true);
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };
    const applyFilters = () => {
        let result = [...products];

        // search filter
        if (searchquery) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(searchquery.toLowerCase())
            );
        }

        // category filter
        if (selectedCategory !== 'All') {
            result = result.filter((product) => product.category === selectedCategory);
        }

        // sorting
        if (sortproducts === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortproducts === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortproducts === 'name-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortproducts === 'name-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        console.log('filter===>',result)

        setFiltereditems(result);
        setCurrentPage(1);
    };
    

    //deleting the product item
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
            alert('Product deleted successfully!');
        } catch (error) {
            console.log('delete error==>',error)
            alert('Failed to delete product');
        }
    };

    const categories = [...new Set(products.map((p) => p.category))];
    
    // pagination logic
    const totalPages = Math.ceil(filteredProducts.length / productsperpage);
    const startIndex = (currentPage - 1) * productsperpage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsperpage);
    
    if (loading) {
        return <div className="loading-screen">Loading products...</div>;
    }
    if(error) {
        return <div style={{color:'red'}}>{error}</div>
    }
    
    return (
        <div className="products-page">

        {/* filtering and sorting */}
            <div className="filters-cont">
                <SearchBar searchquery={searchquery} onSearchChange={setsearchquery} />
                <FilterProducts
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    sortproducts={sortproducts}
                    onSortChange={setSortproducts}
                    categories={categories}
                />
            </div>

            {/* products sections */}

            {currentProducts.length === 0 ? (
                <div className="no-products">No products found</div>
            ) : (
                <>
                    <div className="products-grid">
                        {currentProducts.map((product) => (
                            <Products
                                key={product.id}
                                product={product}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                    {/* pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="page-btn"
                            >
                                &lt;
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => {
                                const page = 1 + i

                                return (<button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={currentPage === page ? 'page-btn active' : 'page-btn'}
                                >
                                    {page}
                                </button>)

                            })}

                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="page-btn"
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ProductsPage;
