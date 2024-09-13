import { useEffect, useState } from "react";
import PillDetail from "../comp/PillDetail";
//import { pilldata } from "../data/pillsdata.js";

export default function PillsList(p) {
  //let [PillData, setPillData] = useState(JSON.parse(JSON.stringify(pilldata)));
  let [PillData, setPillData] = useState(null);
  console.log("From Pill List Page: ",p.data)
  useEffect(()=>{
    setPillData(p.data)
  },[p.data]) 
  // useEffect(() => {
  //   getAllPills();
    
    
  // }, []); // Add an empty dependency array to run the effect only once on mount

  // async function getAllPills(){
  //   let pills = await fetch('http://localhost:3030/pills')
  //   let pillsjson = await pills.json()
  //   setPillData(pillsjson);
  //   console.log("from the Homepage comp, State : ", pillsjson);
  //   //console.log("from the Homepage comp, JSON  : ", pilldata);
    
  // }
  return (
    <div>
      {PillData ? (
        PillData.map((pill, index) => (
          <PillDetail key={index} data={pill} ind={index}></PillDetail>
        ))
      ) : (
        <>No Data</>
      )}
    </div>
  );
}
