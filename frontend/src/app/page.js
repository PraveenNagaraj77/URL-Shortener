"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [urls, setUrls] = useState([]); // State to store list of URLs
  const [showTable, setShowTable] = useState(false); // State to control table visibility

  // Fetch URLs from backend when component mounts
  useEffect(() => {
    async function fetchUrls() {
      try {
        const response = await axios.get("https://url-shortener-backend-mo4f.onrender.com/urls");
        setUrls(response.data);
      } catch (error) {
        console.error("Error fetching URLs:", error.message);
      }
    }
    fetchUrls();
  }, []);

  // Handle URL shortening
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://url-shortener-backend-mo4f.onrender.com/shorten`, { longUrl: url });
      if (response.data.shortUrl && response.data.shortCode) {
        setShortUrl(response.data.shortUrl);
        setShortCode(response.data.shortCode);

        // Add new URL to the list
        setUrls((prevUrls) => [...prevUrls, response.data]);
      } else {
        setShortUrl("Error shortening URL");
        setShortCode("");
      }
    } catch (error) {
      setShortUrl("Error: " + error.message);
      setShortCode("");
    }
  };

  // Handle URL deletion
  const handleDelete = async (shortCode) => {
    try {
      await axios.delete(`https://url-shortener-backend-mo4f.onrender.com/${shortCode}`);
      setUrls((prevUrls) => prevUrls.filter((url) => url.shortCode !== shortCode));
    } catch (error) {
      console.error("Error deleting URL:", error.message);
    }
  };

  // Function to copy the shortened URL to the clipboard
  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl).then(() => {
        alert("Shortened URL copied to clipboard!");
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8">
      {/* URL Shortening Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col sm:flex-row w-full max-w-md">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter long URL"
          className="border p-2 rounded mb-2 sm:mb-0 sm:mr-2 flex-grow"
          required
        />
        <button
  type="submit"
  className="bg-blue-500 text-white text-sm p-1 rounded w-2/3 sm:w-auto sm:p-2 sm:text-base mx-auto"
>
          Shorten URL
        </button>
      </form>
  
      {/* Display Shortened URL */}
      {shortUrl && (
        <div className="mt-4 p-4 border rounded shadow-md bg-white w-full max-w-md">
          <div className="mb-2">
            <p className="text-lg font-semibold">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {shortUrl}
            </a>
          </div>
          <div className="mb-2">
            <p className="text-lg font-semibold">Short Code:</p>
            <span className="font-mono">{shortCode}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-green-500 text-white p-2 rounded mt-2 w-full sm:w-auto"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
  
}
