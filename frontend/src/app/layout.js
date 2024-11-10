// src/app/layout.js

import './globals.css'; // Correct path to global.css

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>URL Shortener</title>
      </head>
      <body className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-center mb-6">MicroLink</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
