"use client";
import React from "react";

export default function Main() {
    return (
        <div>
            <div className="h-screen bg-[url('/assets/bg.jpg')] bg-cover bg-right">
                <h1 className="mb-4 text-4xl font-extrabold leading-none \
                        tracking-tight text-gray-900 md:text-5xl lg:text-6xl \
                        dark:text-white">
                    Welcome to CurlARC!
                </h1>
                <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 \
                        xl:px-48 dark:text-gray-400">
                    A simple application for recording your curling game.
                </p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white \
                        font-bold py-2 px-4 rounded"
                    onClick={() => window.location.href = "/login"}
                >
                    Log in
                </button>
            </div>
        </div>
    );
}
