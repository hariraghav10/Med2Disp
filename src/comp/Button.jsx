import React from "react";

export default function Button(p) {
  let mainStyle = {
    padding: "1rem 2rem",
    backgroundColor: "#EDEDED",
    border: "none",
    fontWeight: "bold",
    width: "90%",
    borderRadius: "10px",
    margin: "0.6rem 0",
  };

  let successStyle = {
    backgroundColor: "#35EA88",
    // width:"fit-content",
  };
  let deleteStyle = {
    backgroundColor: "#FF6262",
    // width:"fit-content",
  };

  let Style = {...mainStyle};
  if (p.theme && p.theme == "success") {
    Style = {  ...Style,...successStyle };
  } 
  if (p.theme && p.theme == "delete") {
    Style = {  ...Style,...deleteStyle };
  }
  return (
    <button style={Style} onClick={p.onClick} disabled={p.dis}>
      {p.children}
    </button>
  );
}
