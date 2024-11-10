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
        const response = await axios.get("http://localhost:5000/urls");
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
      const response = await axios.post(`http://localhost:5000/shorten`, { longUrl: url });
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
      await axios.delete(`http://localhost:5000/${shortCode}`);
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
    <div className="flex flex-col items-center">
      {/* URL Shortening Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter long URL"
          className="border p-2 rounded mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
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
              className="text-blue-600 underline"
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
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Copy Link
          </button>
        </div>
      )}

     
      {/* <button
        onClick={() => setShowTable((prev) => !prev)}
        className="bg-yellow-500 text-white p-2 rounded mt-4"
      >
        {showTable ? "Hide URL Links" : "Show URL Links"}
      </button>

      {showTable && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">URL Database</h2>
          {urls.length === 0 ? (
            <p className="text-center text-lg">No data found</p> // Message when no URLs are available
          ) : (
            <table className="w-full border-collapse bg-white shadow-md rounded">
              <thead>
                <tr>
                  <th className="border p-2">Long URL</th>
                  <th className="border p-2">Short URL</th>
                  <th className="border p-2">Short Code</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  <tr key={url.shortCode}>
                    <td className="border p-2 truncate max-w-xs">{url.longUrl}</td>
                    <td className="border p-2">
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {url.shortUrl}
                      </a>
                    </td>
                    <td className="border p-2">{url.shortCode}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDelete(url.shortCode)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )} */}
    </div>
  );
}
