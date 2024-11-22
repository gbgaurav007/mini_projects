import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaListUl } from "react-icons/fa6";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Cart({ cartItems, removeFromCart, removeAllItems }) {
    const [totalPrice, setTotalPrice] = useState(() =>
        cartItems.reduce((sum, item) => sum + Number(item.price), 0)
    );
    const [discount, setDiscount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleRemoveFromCart = (item) => {
        removeFromCart(item);
        setTotalPrice((prevPrice) => prevPrice - item.price);
        toast.error(`${item.name} removed from cart`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
        });
    };

    const handleApplyCoupon = (coupon) => {
        if (coupon === 'SAVE3') {
            setDiscount(3);
            toast.success('SAVE3 coupon applied! $3 discount applied.', { autoClose: 2000 });
        } else if (coupon === 'OFF10' && totalPrice > 100) {
            const tenPercentOff = totalPrice * 0.1;
            setDiscount(tenPercentOff);
            toast.success('OFF10 coupon applied! 10% discount applied.', { autoClose: 2000 });
        }
        setIsModalOpen(false);
    };

    const handleCheckout = () => {
        alert('Order placed successfully!');
        removeAllItems();
        navigate('/');
    };

    function moveToCatalog() {
        navigate('/products');
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-tr from-sky-950 via-blue-900 to-blue-800 py-8 relative items-center justify-center flex flex-col gap-5">

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
                    <Link to="/products" className="flex items-center text-white space-x-3 hover:text-amber-200">
                        <FaListUl className="w-6 h-6 md:w-7 md:h-7" />
                        <span className="text-sm md:text-lg font-semibold">View Products</span>
                    </Link>
                </div>
                <div className="text-center text-white">
                    <h2 className="text-2xl font-bold mb-8">Cart</h2>
                </div>
                <img src='assets/cart.png' className='w-80 h-80'></img>
                <p className='text-lg font-bold text-white'>Your cart is Empty!</p>
                <button onClick={() => moveToCatalog()} className="bg-white text-black font-bold py-2 px-4 rounded">Order Now</button>
            </div>
        );
    }

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
                <Link to="/products" className="flex items-center text-white space-x-3 hover:text-amber-200">
                    <FaListUl className="w-6 h-6 md:w-7 md:h-7" />
                    <span className="text-sm md:text-lg font-semibold">View Products</span>
                </Link>
            </div>

            <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-8 mt-10">Cart</h2>
            </div>
            <div className="max-w-6xl mx-auto md:px-4 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md p-4 relative transition-transform transform hover:scale-105"
                    >
                        <img
                            src={`assets/${item.image}`}
                            alt={item.name}
                            className="w-full h-56 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded"
                                onClick={() => handleRemoveFromCart(item)}
                            >
                                Remove from Cart
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-lg font-semibold">{item.name}</p>
                            <p className="text-gray-700">${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-6xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md text-center">
                <p className="text-lg font-semibold">Total Price: ${Number(totalPrice).toFixed(2)}</p>
                {discount > 0 && (
                    <>
                        <p className="text-sm text-green-600">Discount: -${Number(discount).toFixed(2)}</p>
                        <p className="text-lg font-bold">To Pay: ${Number(totalPrice - discount).toFixed(2)}</p>
                    </>
                )}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                    <button
                        className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400"
                        onClick={() => setIsModalOpen(true)}
                    >
                        View Coupons
                    </button>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-8 mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-bold mb-4">Available Coupons</h2>
                <div className="mb-4">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <div>
                            <p className="font-semibold">SAVE3</p>
                            <p className="text-sm text-gray-600">Save $3 on all orders</p>
                        </div>
                        <button
                            className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-700"
                            onClick={() => handleApplyCoupon('SAVE3')}
                        >
                            Apply
                        </button>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div>
                            <p className="font-semibold">OFF10</p>
                            <p className="text-sm text-gray-600">10% off on orders above $100</p>
                        </div>
                        <button
                            className={`py-1 px-3 rounded font-bold ${
                                totalPrice > 100
                                    ? 'bg-blue-500 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            onClick={() => handleApplyCoupon('OFF10')}
                            disabled={totalPrice <= 100}
                        >
                            Apply
                        </button>
                    </div>
                </div>
                <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
}

export default Cart;