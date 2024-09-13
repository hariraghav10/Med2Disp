import React, { useEffect,useState } from 'react'
import Header from "../comp/Header";
import { pilldata } from '../data/pillsdata';
import Button from "../comp/Button";
function RefillPage() {
  const baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + "3030";


  //states
  let [PillData, setPillData] = useState(null);
  const [changes,setChanges] = useState(false);
  const [refill,setrefill]=useState()
 //effects
  useEffect(()=>{
    getAllPills();
    console.log("Main Start: ",PillData)
  },[])



  //functions
  async function getAllPills(){
    let pills = await fetch(`${baseUrl}/pills`)
    let pillsjson = await pills.json()
    let refillary={}
    pillsjson.forEach(p => {
      refillary[p.boxNumber]=p.refillData.pillsToRefill
    });
    setPillData(pillsjson);
    setrefill(refillary)
    console.log("from the Fetch Function comp, State : ", pillsjson);
    //console.log("from the Homepage comp, JSON  : ", pilldata);
    
  }

  function checkState(){
    console.log("Pill State Cheking: ", PillData)
    console.log("Refill State Cheking: ", refill)
  }
//-----------------------------------------------------------------------------
//Handle Value changes of all the buttons

function HandleFun(e) {
  //console.log("Init State: ", PillData)
  setChanges(true)
  let el = e.target;
  console.log("From Handle Function: ", el.name);
  console.log("From Handle Function: ", el.value);
  //let pills = PillData
  //pills[parseInt(el.name)].refillData.pillsToRefill = parseInt(el.value)
  //setPillData(pills)
  if(parseInt(el.value)>0 && el.value[0]=='0'){
    el.value = parseInt(el.value)
  }
  if(parseInt (el.value)>=0){

    setrefill(p=>({
      ...p,
      [parseInt(el.name)]:parseInt(el.value)
    }))
  }
  else{
    console.log("Cant go below 0")
  }
  //console.log("End State: ", PillData)
  //Event Hannler for the Dosage Labels

  
    
   
    // console.log(parseInt(el.value))
    // console.log(typeof el.value)
    // console.log(el.value.length)
    // console.log(el.value[0])

  }

  async function SubmitData() { 
    
    fetch(`${baseUrl}/refill`, {
      
        method: 'PUT', // HTTP method
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify(refill) // Convert data object to JSON string
      
    }).then(async (d)=>{
      console.log(await d.json())
      setChanges(false)
      
      

    })
  }
  //retuning
  return (
    <>
       <Header title="Refill"></Header>
       <div style={{ padding: "2rem 0rem 2rem 2rem" }}>
       <div>
      {(refill) ? (
        Object.keys(refill).map((p, index) => (
          <div
          key={index}
          style={{
            backgroundColor: refill[p]>0 ? "#7014f2" : "#CECECE",
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0rem 0.8rem",
            margin: "1rem 0rem",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight:  "bold",
            }}
          >
            {PillData[index].name}
          </p>
          <div>
            {/* <label>dose :</label> */}
            <input
              type="number"
              value={refill[p]}
              placeholder={refill[p.boxNumber]}
              style={{
                width: "24px",
                marginLeft: "0.2rem",
                border: "none",
                borderBottom: "1px solid gray",
                backgroundColor: "inherit",
                lineHeight: "2px",
                padding: "0rem",
                fontSize: "1rem",
                textJustify: "center",
              }}
              name={p}
              onChange={(e) => {
                console.log("what happened: ", e.target.name);
                console.log("what happened: ", e.target.value);
                HandleFun(e);
              }}
            ></input>
          </div>
        </div>
        ))
      ) : (
        <>No Data</>
      )}
    </div>
    <div>
        {/* <Button onClick={checkState}>Check State</Button> */}
        <Button theme={"success"} onClick={SubmitData} dis={!changes}>Refill Pills</Button>
      </div>
      </div>
      
    </>
  )
}





export default RefillPage