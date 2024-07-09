"use client";
import React from "react";

const Home: React.FC = () => {
    return (
        <div className="h-screen bg-[url('/assets/bg.jpg')] bg-cover bg-right">
            <div className="mt-8 px-4">
                <p className="text-lg font-normal">
                    This is the home page for <a href="/" className="text-blue-600 hover:underline">CurlARC</a>.
                </p>
            </div>
        </div>
    );
};

export default Home;
