import React, { useEffect } from "react";

function CompartmentBox(p) {
  useEffect(()=>{
    console.log(p.slots)
  },[p.slots])
 
  return (
    (p.slots && (
      <div
      style={{
        //backgroundColor:"rgb(53, 234, 136)",
        backgroundColor: "#00f59b",
        color: "white",
        padding: "0.6rem",
        textAlign: "center",
      }}
    >
      <label for="boxes"></label>
      <select
        name="boxes"
        style={{
          backgroundColor: "inherit",
          color: "inherit",
          border: "none",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
        onChange={(e) => {
          console.log(e.value);
          p.handle(e);
        }}
      >
        {!p.new && (<option value={p.val} className="box-option" selected={true}>
        {"Box " + p.val}
      </option>)}

       { p.slots.map((sl,index)=>(
        <option value={sl.toString()} className="box-option" selected={p.val == sl}>
        {"Box " + sl}
      </option>
        ))
       }
        {/* <option value="1" className="box-option" selected={p.val == 1}>
          Box 1
        </option>
        <option value="2" className="box-option" selected={p.val == 2}>
          Box 2
        </option>
        <option value="3" className="box-option" selected={p.val == 3}>
          Box 3
        </option>
        <option value="4" className="box-option" selected={p.val == 4}>
          Box 4
        </option>
        <option value="5" className="box-option" selected={p.val == 5}>
          Box 5
        </option>
        <option value="6" className="box-option" selected={p.val == 6}>
          Box 6
        </option>
        <option value="7" className="box-option" selected={p.val == 7}>
          Box 7
        </option>
        <option value="8" className="box-option" selected={p.val == 8}>
          Box 8
        </option>
        <option value="9" className="box-option" selected={p.val == 9}>
          Box 9
        </option>
        <option value="10" className="box-option" selected={p.val == 10}>
          Box 10
        </option> */}
      </select>
    </div>
    ))
    
  );
}

export default CompartmentBox;
