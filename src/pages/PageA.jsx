import React, { useState } from "react";
import sampleData from "../data/sampledata.json";
import { Link } from "react-router-dom";

export default function PageA() {
  const [data, setData] = useState(JSON.parse(JSON.stringify(sampleData)));
  console.log("pageA  State: ", data);
  console.log("pageA  JSON:  ", sampleData);
  return (
    <>
      <Link to="/pageb">Page B</Link>
      <div>pageA</div>
    </>
  );
}
