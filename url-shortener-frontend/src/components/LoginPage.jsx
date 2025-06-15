import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { setToken } = useStoreContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            console.log(response.token);
            setToken(response.token);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            toast.success("Login Successful!");
            reset();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            toast.error("Login Failed!")
        } finally {
            setLoader(false);
        }
    };

  return (
    <div
        className='min-h-[calc(100vh-64px)] bg-gray-900 flex justify-center items-center'>
        <form onSubmit={handleSubmit(loginHandler)}
            className="sm:w-[450px] w-[360px] bg-gray-800 shadow-custom py-8 sm:px-8 px-4 rounded-md">
            <h1 className="text-center font-serif text-green-400 font-bold lg:text-3xl text-2xl">
                Login Now
            </h1>

            <hr className='mt-2 mb-5 text-gray-600'/>

            <div className="flex flex-col gap-3">
                <TextField
                    label="Username"
                    required
                    id="username"
                    type="text"
                    message="*Username is required"
                    placeholder="Type your username"
                    register={register}
                    errors={errors}
                />

                <TextField
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="*Password is required"
                    placeholder="Type your password"
                    register={register}
                    min={6}
                    errors={errors}
                />
            </div>

            <button
                disabled={loader}
                type='submit'
                className='bg-green-600 hover:bg-green-700 font-semibold text-white w-full py-2 transition-colors duration-100 rounded-sm my-3'>
                {loader ? "Loading..." : "Login"}
            </button>

            <p className='text-center text-sm text-gray-300 mt-6'>
                Don't have an account? 
                <Link
                    className='font-semibold underline hover:text-white'
                    to="/register">
                        <span className='text-green-400'> SignUp</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default LoginPage