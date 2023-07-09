import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errorMessage, setErrorMessage] = useState('')

    const handleOnChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', {...userInfo});
            navigate("/signin");

        } catch (error) {
            setErrorMessage(error.response.data.message);
        }

    }
    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className="bg-gray-100 rounded-lg p-8 w-96">
                <form action="" onSubmit={handleFormSubmit}>
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" onChange={handleOnChange} value={userInfo.name} required id='name' name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" onChange={handleOnChange} value={userInfo.email} required id='email' name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input type="password" onChange={handleOnChange} value={userInfo.password} required id='password' name="password" autoComplete='false' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="confirmPassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                        <input type="password" onChange={handleOnChange} value={userInfo.confirmPassword} required id='confirmPassword' name="confirmPassword" autoComplete='false' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    {errorMessage && <p className="mb-3 text-sm text-red-600">*{errorMessage}</p>}
                    <div className='flex justify-center'>
                        <button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">SignUp</button>
                    </div>
                </form>
                <p className="text-gray-500 mt-3 text-sm">If you already have an account <Link to={'/signin'} className="text-blue-600" >SignIn</Link></p>
            </div>
        </section>
    )
}

export default SignUp