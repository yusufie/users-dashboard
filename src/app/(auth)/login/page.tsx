"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import '../../globals.css'

import useStore from "../../../store/store";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
};

function Login() {

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const setUser = useStore((state) => state.setUser);
  const navigate = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 200) {
        console.log("User login successful");


        // Retrieve the user data from the API response
        const userData = await response.json();

        // Retrieve the user's full name from the user data
        const fullName = userData.fullName;

        setUser({ fullName, email: data.email }); // Update the user state
        navigate.push("/users"); // Navigate to the dashboard page
      } else {
        console.log("User login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };


  return (

    <div id="loginContainer">

      <Image
        src="/images/logo_gray.png"
        alt="logo"
        width={200}
        height={200}
      />

      <h1>Login in to your account</h1>
      <p>Welcome back! Please enter your details.</p>

      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">

      <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your mail"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="******"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <Link href="#" className="my-4 text-blue-600">
          <span>Forgot password ?</span>
        </Link>

        <button type="submit" className="">Sign In</button>
      </form>

      
      <span id="signupSpan" className="">
        Don&apos;t have an account? <Link href="/register" className="">Sign Up</Link>
      </span>

    </div>

  )
}

export default Login
