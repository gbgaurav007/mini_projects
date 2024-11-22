import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import products from '../data/products';
import { FaCartShopping } from "react-icons/fa6";

function Products({ addToCart }) {
    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`${product.name} added to cart`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-sky-950 via-blue-900 to-blue-800 py-8 relative">

            <div className="absolute md:top-12 md:left-12 top-4 left-6 hover:scale-110">
                <Link to="/" className="flex">
                    <img
                        src="assets/back.png"
                        alt="Back"
                        className="w-8 h-7 md:w-10 md:h-9"
                    />
                </Link>
            </div>

            <div className="absolute md:top-12 md:right-12 top-4 right-6 hover:scale-110">
                <Link to="/cart" className="flex items-center text-white space-x-2 hover:text-amber-200">
                    <FaCartShopping className="w-6 h-6 md:w-7 md:h-7" />
                    <span className="text-sm md:text-lg font-semibold">Go to Cart</span>
                </Link>
            </div>

            <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-8 mt-10">Products</h2>
            </div>
            <div className="max-w-6xl mx-auto md:px-4 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md p-4 relative transition-transform transform hover:scale-105"
                    >
                        <img
                            src={`assets/${product.image}`}
                            alt={product.name}
                            className="w-full h-56 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-lg font-semibold">{product.name}</p>
                            <p className="text-gray-700">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;