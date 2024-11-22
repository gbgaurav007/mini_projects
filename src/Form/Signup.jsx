import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
    });
    const [passwordConditions, setPasswordConditions] = useState({
        hasUpperCase: false,
        hasMinLength: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password") {
            setPasswordConditions({
                hasUpperCase: /[A-Z]/.test(value),
                hasMinLength: value.length >= 8,
                hasNumber: /[0-9]/.test(value),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isEmailValid = emailRegex.test(formData.email);
    const isContactValid = formData.contact.length === 10 && /^[0-9]+$/.test(formData.contact);
    const isPasswordValid = Object.values(passwordConditions).every(Boolean);

    const navigate = useNavigate();

    const handleSignup = (e) => {

        e.preventDefault();
        alert('Signup successfull');
        navigate("/");

    };


    return (
        <div className="min-h-screen bg-gradient-to-tr from-sky-950 from-40% via-blue-900 via-75% to-blue-800 to-90% flex justify-center items-center px-4">
            <div className="bg-gradient-to-tr from-sky-950 from-40% via-blue-900 via-75% to-blue-800 to-90% flex flex-col min-h-screen py-8">
                <div className="absolute md:top-12 md:left-12 top-4 left-6 hover:scale-110">
                    <Link to="/" className='flex flex-row'>
                        <img
                            src='assets/back.png'
                            alt="Back"
                            className="md:w-10 md:h-9 w-8 h-7"
                        />
                    </Link>
                </div>
            </div>
                <div
                    className="bg-white shadow-2xl rounded-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden"
                    style={{ minHeight: "550px" }}
                >
                    <div className="transition-all duration-700 ease-in-out flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 order-2 md:order-1">
                        <h1 className="text-3xl font-semibold mb-4">Hey!</h1>
                        <p className="text-center mb-6">Sign up and join our community today!</p>
                    </div>

                    <div className="transition-transform duration-700 ease-in-out flex flex-col justify-center items-center w-full md:w-1/2 p-8 order-1 md:order-2">
                        <div className="w-full max-w-md">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
                            <form>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className={`w-full p-3 mb-2 border rounded focus:outline-none ${formData.name.length > 0 ? "border-green-500" : "border-gray-300"
                                        }`}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className={`w-full p-3 mb-2 border rounded focus:outline-none ${formData.email ? !isEmailValid ? "border-red-500" : "border-green-500" : "border-gray-300"
                                        }`}
                                />
                                {!isEmailValid && formData.email && (
                                    <p className="text-red-500 text-sm mb-4">Invalid email</p>
                                )}
                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    placeholder="Contact"
                                    className={`w-full p-3 mb-2 border rounded focus:outline-none ${formData.contact ? !isContactValid ? "border-red-500" : "border-green-500" : "border-gray-300"
                                        }`}
                                />
                                {!isContactValid && formData.contact && (
                                    <p className="text-red-500 text-sm mb-4">
                                        Contact must be 10 digits
                                    </p>
                                )}
                                <div className="relative mb-2">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className={`w-full p-3 border rounded focus:outline-none ${formData.password ? !isPasswordValid
                                            ? "border-red-500"
                                            : "border-green-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="mb-4">
                                    {!isPasswordValid &&
                                        formData.password &&
                                        Object.entries(passwordConditions).map(([key, isValid]) => (
                                            <p
                                                key={key}
                                                className={`flex items-center text-sm ${isValid ? "text-green-500" : "text-red-500"
                                                    }`}
                                            >
                                                <span className="mr-2">
                                                    {isValid ? <FaCheckCircle /> : <FaCircle />}
                                                </span>
                                                {key === "hasUpperCase" && "At least one uppercase letter"}
                                                {key === "hasMinLength" && "Minimum 8 characters"}
                                                {key === "hasNumber" && "At least one number"}
                                                {key === "hasSpecialChar" && "At least one special character"}
                                            </p>
                                        ))}
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full py-3 rounded transition ${!isEmailValid || !isContactValid || !isPasswordValid || !formData.name
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600 text-white"
                                        }`}
                                    disabled={
                                        !isEmailValid || !isContactValid || !isPasswordValid || !formData.name
                                    }
                                    onClick={handleSignup}
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            );
};

            export default Signup;