"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import '../../globals.css'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Register() {
  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );

  const schema = yup.object().shape({
    fullName: yup.string().required("Your Full Name is Required!"),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .matches(phoneRegex, "Invalid phone")
      .required("Phone is required"),
    age: yup.number().positive().integer().min(18).required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  const navigate = useRouter();


  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('User registration successful');
        // Handle success, such as redirecting to a success page
        navigate.push('/login');
      } else {
        console.log('User registration failed');
        // Handle failure, such as displaying an error message
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, such as displaying an error message
    }
  };

  return (
    <div  id="registerContainer">
      <Image src="/images/logo_gray.png" alt="logo" width={200} height={200} />

      <h1>Create your account</h1>
      <p>Welcome! Please enter your details.</p>

      <form onSubmit={handleSubmit(onSubmit)} id="registerForm">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          placeholder="Enter your full name"
          {...register("fullName")}
        />
        <p>{errors.fullName?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone"
          {...register("phone")}
        />
        <p>{errors.phone?.message}</p>

        <label htmlFor="age">Age</label>
        <input type="number" id="age" placeholder="Enter your age" {...register("age")} />
        <p>
          {errors.age?.type === "min" && "You must be at least 18 years old"}
        </p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>

        <button type="submit" className="">Submit</button>
      </form>

      <p>
        By clicking the button, you are agreeing to our{" "}
        <Link href="#">Terms and Services</Link>
      </p>

      <span id="registerSpan" className="">
        Do you have an account? <Link href="/login" >Sign In</Link>
      </span>

    </div>
  );
}

export default Register;
