"use client";
import Link from 'next/link';
import React from 'react';

export default function Navigator() {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight">
          <Link href="/" className="text-white hover:text-gray-300 transition-colors">CurlARC</Link>
        </h1>
        <nav className="ml-auto flex space-x-6">
          <Link href="/profile" className="text-lg text-gray-300 hover:text-white transition-colors">Profile</Link>
          <Link href="/login" className="text-lg text-gray-300 hover:text-white transition-colors">Login</Link>
          <Link href="/register" className="text-lg text-gray-300 hover:text-white transition-colors">Register</Link>
        </nav>
      </div>
    </header>
  );
};
