import React from "react";

export default function Main() {
    return (
        <div className="h-screen bg-[url('/assets/bg.jpg')] bg-cover bg-right">
            <h1 className="mb-4 text-4xl font-extrabold leading-none \
                        tracking-tight text-gray-900 md:text-5xl lg:text-6xl \
                        dark:text-white">
                Welcome to Login Page!
            </h1>
            <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 \
                        xl:px-48 dark:text-gray-400">
                This is login page for&nbsp;
                <a
                    href="/"
                    className="text-blue-600 hover:underline"
                >CurlARC</a>.
            </p>
        </div>
    );
}
