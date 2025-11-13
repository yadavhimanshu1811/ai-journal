"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Entry {
  _id: string;
  content: string;
  mood: string;
  createdAt?: string;
}

const ListDisplay = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Entry[]>([]);

  const getList = async () => {
    const response = await fetch("api/entries/getList");
    const result = await response.json();
    console.log("result", result);
    if (result.error) {
      setErrorMessage(result.error);
    } else {
      setList(result.list);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch("api/entries/deleteItem", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if(response.ok){
        getList()
    }else{
        alert("something went wrong");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return loading ? (
    <div className="text-center py-10 text-gray-500">Loading...</div>
  ) : errorMessage ? (
    <div className="text-center py-10 text-red-500">{errorMessage}</div>
  ) : list.length ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {list.map((entry, index) => (
        <Link
          href={`/entry/${entry._id}`}
          key={entry._id}
          className="block bg-white border border-slate-200 rounded-xl p-5 shadow-sm 
                     hover:shadow-md hover:border-indigo-300 hover:scale-[1.02] transition-all"
        >
          {/* Mood Badge + Date */}
          <div className="flex justify-between items-center mb-3">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium 
                ${
                  entry.mood === "positive"
                    ? "bg-green-100 text-green-700"
                    : entry.mood === "negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
            >
              {entry.mood}
            </span>
            <div className="flex items-center">
              <span className="text-xs text-gray-400">
                {entry.createdAt &&
                  new Date(entry.createdAt).toLocaleDateString()}
              </span>

              <span
                className="cursor-pointer text-gray-400 hover:text-red-600 transition-colors mb-1 ml-1"
                onClick={(e) => {
                  e.preventDefault(); // stops the link navigation
                  e.stopPropagation(); // stops click bubbling
                  handleDelete(entry._id); // your delete function
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 7h12m-9 0V4h6v3m1 0v13a2 2 0 01-2 2H9a2 2 0 01-2-2V7h10z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Content Preview */}
          <p className="text-gray-800 text-sm line-clamp-3">{entry.content}</p>
        </Link>
      ))}
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500">No entries</div>
  );
};

export default ListDisplay;
