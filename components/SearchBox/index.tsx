"use client";
import React, { KeyboardEvent } from "react";
import { useState } from "react";

export default ({ searchParams }) => {
  const [no, setNo] = useState(searchParams.no || "");
  const [name, setName] = useState(searchParams.name || "");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form>
      <div className="tr box">
        {/* <div className="th box">_</div> */}
        <div className="td"></div>
        <div className="td">
          <input
            type="text"
            name="no"
            value={no}
            onChange={(e) => setNo(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        <div className="td">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        <div className="td"></div>
        <div className="td"></div>
        <div className="td"></div>
        {/* <div className="th box"></div> */}
      </div>
    </form>
  );
};
