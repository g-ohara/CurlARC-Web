"use client";
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight">
          <a href="/" className="text-white hover:text-gray-300 transition-colors">CurlARC</a>
        </h1>
        <nav className="ml-auto flex space-x-6">
          <a href="/login" className="text-lg text-gray-300 hover:text-white transition-colors">Login</a>
          <a href="/register" className="text-lg text-gray-300 hover:text-white transition-colors">Register</a>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;