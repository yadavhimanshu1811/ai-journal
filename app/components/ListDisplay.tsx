"use client";
import React, { useEffect, useState } from "react";

const ListDisplay = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

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
  useEffect(() => {
    getList();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : errorMessage ? (
    <div>{errorMessage}</div>
  ) : list.length ? (
    <div>
      {list.map((entry, index) => (
        <div key={entry._id}>
          <p>{entry.content}</p>
          <p>{entry.mood}</p>
        </div>
      ))}
    </div>
  ) : (
    <div>No entries</div>
  );
};

export default ListDisplay;
