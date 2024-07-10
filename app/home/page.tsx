"use client";
import React from "react";

export default function Home() {
    return (
        <div className="h-screen bg-[url('/assets/bg.jpg')] bg-cover bg-right">
            <h1 className="mb-4 text-4xl font-extrabold leading-none \
                        tracking-tight text-gray-900 md:text-5xl lg:text-6xl \
                        dark:text-white">
                Welcome to Home Page! You are authorized!!
            </h1>
            <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 \
                        xl:px-48 dark:text-gray-400">
                This is the home page for <a href="/" className="text-blue-600 hover:underline">CurlARC</a>.
            </p>
        </div>
    );
};
