import React, { useState } from "react";
import sampleData from "../data/sampledata.json";
import { Link } from "react-router-dom";
export default function PageB() {
  const [item, setItem] = useState(JSON.parse(JSON.stringify(sampleData)));
  //const [PillData, setPillData] = useState(data)
  console.log("pageB  State: ", item);
  console.log("pageB  JSON:  ", sampleData);
  return (
    <>
      <Link to="/pagea">Page A</Link>
      <div>pageB</div>
      <button
        onClick={(e) => {
          setItem((i) => {
            let arr = i.data;
            arr.push({
              name: "Recat",
            });
            return {
              ...i,
              data: arr,
            };
          });
        }}
      >
        Click to update the state
      </button>

      <button
        onClick={(e) => {
          console.log("after operation pageB  State: ", item);
          console.log("after operation pageB  JSON:  ", sampleData);
        }}
      >
        View all the data
      </button>
    </>
  );
}
