import { useEffect, useState, useMemo, useLayoutEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../comp/Header";
import { pilldata } from "../data/pillsdata";
import TimingsTab from "../comp/TimingsTab";
import Button from "../comp/Button";
import PillintakeTab from "../comp/PillintakeTab";
import CompartmentBox from "../comp/CompartmentBox";

import config from '../appConfig.json'

import languageContent from '../data/languageContents.json'

export default function AddPillPage() {

  //const baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + "3030";
  const baseUrl = config.baseURL

  
  let [languageChange, setLanguageChange] = useState(false) 
  let [screenContent, setScreenContent] = useState({})
  useEffect(()=>{
    const language = localStorage.getItem('Lang');
    const langChange = localStorage.getItem('LangChange')==="true";

   
    setLanguageChange(langChange);
    langChange&&setScreenContent(languageContent[language]['contents']);
  },[])


  const intakelabels ={
    1:(!languageChange?("Morning"):(screenContent['morning'])),
    2:(!languageChange?("Afternoon"):(screenContent['afternoon'])),
    3:(!languageChange?("Evening"):(screenContent['evening'])),
    4:(!languageChange?("Night"):(screenContent['night'])),
    5:"Custom"
  }
  
  //get path parameter
  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  let JSONdata = JSON.parse(JSON.stringify(pilldata.data));

  //let data=pilldata.data[0]

  //-----------------------------------------------------------------------------
  // Either New Pill or Fetching Old Pill Data
  const [PillData, setPillData] = useState(
    {
      "boxNumber": 1,
      "name": "",
      "totalPills": 0,
      "intakeData": {
        "withFood": 1,
        "doage":1,
        "//comment": "timings need to be re considered again",
        "timings": [
          
        ]
      },
      "refillData": {
        "isCurrRefill": 0,
        "pillsToRefill": 0
      }
    }
  );
  const [isNewPill, setisNewPill] = useState(true);
  const [freeslot, setFreeSlot]= useState([])
  //console.log(data)

  useEffect(() => {
    //query.get("id") && console.log("Edit Pill: ",query.get("id"))
    ///!(query.get("id")) && console.log("New Pill")
    let id = query.get("id");
    if (id) {
      console.log(id);
      console.log(parseInt(id));
      //let pill = JSONdata.find((d) => d.compartment === parseInt(id));
      //console.log(pill);
      console.log("Old Pill");
      setOldPill(id)
      
    } else {
      console.log("New Pill");
      setNewPill();
     
      
    }
    console.log(PillData) 
    logState()
  }, []);

  async function setOldPill(id){
    
    let pill = await fetch(`${baseUrl}/pills/${id}`, {
      method: 'GET', // Explicitly specifying the method
      credentials: 'include', // Ensures cookies are sent with the request
  });
    let pilljson = await pill.json()
    if (pilljson) {
      setPillData(pilljson);
      setisNewPill(false);
      console.log("Edit Pill: ", pilljson);
    } else {
      setPillData(null);
      setisNewPill(true);
      console.log("New Pill");
    }
    let freeslots = await fetch(`${baseUrl}/free-slots`, {
      method: 'GET', // Explicitly specifying the method
      credentials: 'include', // Ensures cookies are sent with the request
  });
    let slots = await freeslots.json()
    setFreeSlot(slots.data)
   
  }
  async function getFreeSlots(){
    let freeslots = await fetch(`${baseUrl}/free-slots`, {
      method: 'GET', // Explicitly specifying the method
      credentials: 'include', // Ensures cookies are sent with the request
  });
    let slots = await freeslots.json()
    setFreeSlot(slots.data)
    return slots
  }

  async function setNewPill(){
    
    
    let box = (await getFreeSlots()).data[0]
    console.log("Free Slot: ", box)
    setPillData(
      (p)=>{
        return{
          ...p,
          "boxNumber":box
        }
      }
      )
    setisNewPill(true);
  }

  function logState(){
    console.log("PillData state: ", PillData)
  }

  function ChangeTimingSelection(label, change) {
    console.log("which time: ", label, " what to do: ", change);
  }
//-----------------------------------------------------------------------------

function check_time(timeID) {
  console.log("from check time function: ", PillData)
  const foundElement = PillData.intakeData.timings.find(element => element.timeId === timeID);
  if (foundElement) {
      console.log(`Found ${timeID}`);
      return 1;
  } else {
      console.log(`Cant Found ${timeID}`);
      return 0;
  }
}

function get_index(timeID){
  //let checkFlag=0
  for(let i =0 ; i< PillData.intakeData.timings.length;++i){
 
      if( PillData.intakeData.timings[i].timeId == timeID){return i}        
  }
  return 0
}

//-----------------------------------------------------------------------------

  function isSelectedList(t1) {
    //console.log("ran after it")
    if (
      PillData &&
      PillData.timings.some((t2) => t1 === t2.name && t2.dosage > 0)
    ) {
      //if()
      console.log(t1, "is selected");
      return (
        <PillintakeTab
          data={PillData.timings.find((t2) => t2.name === t1)}
          selected={true}
          name={t1}
          handle={HandlePillChanges}
        ></PillintakeTab>
      );
    } else {
      console.log(t1, "is not selected");
      return (
        <PillintakeTab
          data={{ name: t1, dosage: null }}
          selected={false}
          name={t1}
          handle={HandlePillChanges}
        ></PillintakeTab>
      );
    }
  }
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//Handle Value changes of all the buttons

  function HandlePillChanges(e) {
    setChanges(true)
    let el = e.target;
    console.log("From Handle Function: ", el.value);
    if (el.name == "pill-name") {
      console.log(el.value);
      setPillData((p) => {
        return {
          ...p,
          name: el.value,
        };
      });
    }
    if (el.name == "food-intake") {
      console.log(el.value);
      setPillData((p) => {
        return {
          ...p,
          intakeData:{
            ...p.intakeData,
            withFood:el.value=="Before"?0:1,
          }
          
        };
      });
    }
    if (el.name == "boxes") {
      console.log(el.value);
      setPillData((p) => {
        return {
          ...p,
          boxNumber: parseInt(el.value),
        };
      });
    }

    //Event Hannler for the Dosage Labels

    if ([(!languageChange?("Morning"):(screenContent['morning'])), (!languageChange?("Afternoon"):(screenContent['afternoon'])), (!languageChange?("Evening"):(screenContent['evening'])), (!languageChange?("Night"):(screenContent['night']))].includes(el.name)) {
      
      console.log(el.name)
      console.log(el.value)
      console.log(parseInt(el.value))
      console.log(typeof el.value)
      console.log(el.value.length)
      console.log(el.value[0])
      if(el.value.length>1 && el.value[0]=='0'){
        console.log("Found 0 at first")
        el.value = el.value.slice(1)
        console.log("new value: ", el.value)
      }
      //if(el.name in PillData.intakeData.timings)
      //PillData.intakeData.timings.forEach(t => {
      if(parseInt(el.value)>=0){

        console.log("Taken into consideration")
      let timArr = PillData.intakeData.timings
      let tmflag = 0
      for(let i =0 ; i<timArr.length;++i){

        if(intakelabels[timArr[i].timeId] == el.name){
         console.log("Time Label Exsits")
         //if(parseInt(el.value)==0)
          timArr[i].dosage = el.value=="" || parseInt(el.value)<0?0:parseInt(el.value)
          if(timArr[i].dosage==0){timArr.splice(i, 1);}
         tmflag = 1 
         break
        }
      }
        if(tmflag == 0){
          console.log("New Time Label Added")
          timArr.splice(Object.keys(intakelabels).find(key => intakelabels[key] === el.name)-1, 0, 
          {"timeId":parseInt(Object.keys(intakelabels).find(key => intakelabels[key] === el.name)),"dosage":el.value=="" || parseInt(el.value)<0?0:parseInt(el.value)});
        }
        console.log("Temp Tim Array: ", timArr)
          setPillData(
            (p)=>{
              return{
                ...p,
              intakeData:{
                ...p.intakeData,
                timings:timArr
              }
              }

            }
          )
        
      }
    }


      //console.log("came here")
      // let Dosagevalue = typeof el.value === String ? 0 : el.value;
      // let timArray = PillData.timings;
      // let labels = [];
      // timArray.map((l) => {
      //   labels.push(l.name);
      // });
      // let newData = false;
      // let isThere = timArray.findIndex((ele) => {
      //   return ele.name === el.name;
      // });
      //is EL.name in array and EL.val == 0
      //if(labels.includes(el.name) && (el.value == 0) ){

      // console.log("Dosage Value: ", Dosagevalue);
      // console.log("Index Value: ", isThere);
      // if (isThere > -1 && Dosagevalue == 0) {
      //   //then remove
      //   console.log("Removing the element at: ", isThere, " ", el.value);
      //   timArray = timArray
      //     .slice(0, isThere)
      //     .concat(timArray.slice(isThere + 1));
      //   console.log("after the updatation operation inside: ", timArray);
      // }
      //is EL.name in array and EL.val >= 0
      // (typeof(el.value) !== String)
      // if (isThere > -1 && Dosagevalue > 0) {
      //   //then update array
      //   console.log("Updating the element at: ", isThere, " ", el.value);
      //   timArray[isThere].dosage = parseInt(el.value);
      // }
      //is EL.name not in array and EL.val >= 0
      // if (isThere == -1 && Dosagevalue > 0) {
      //   //then add label and value
      //   console.log("Adding the element: ", el.name, el.value);
      //   console.log("Current value datatype ; ", typeof el.value);
      //   timArray.push({ name: el.name, dosage: parseInt(el.value) });
      // }
      // console.log("after the updatation operation: ", timArray);
      //timArray.map((t)=>{
      //   for(let i=0; i<timArray.length;++i){
      //         if(timArray[i].name===el.name){
      //           console.log("Just Updating the Array Value")
      //           if(parseInt(el.value) == 0){
      //             //timArray.pop(i)
      //             timArray = timArray.slice(0, i).concat(timArray.slice(i+1))
      //           }
      //           if(parseInt(el.value) != 0){
      //           timArray[i].dosage = parseInt(el.value);
      //           newData= false
      //           break;
      //           }
      //         }
      //        else{
      //         newData= true
      //          }
      //   }
      //   //)
      //   if(newData){
      //     console.log("Added New Value to the Array")
      //     timArray.push({"name":el.name,"dosage":parseInt(el.value)})

      //   }
      // console.log(el.value)
      // console.log("timArray: ", timArray)
      // setPillData((p) => {
      //   return {
      //     ...p,
      //     timings: timArray,
      //   };
      // });
    }
    // ---
  
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// Submit the data to server
const [changes, setChanges] = useState(false)
  async function SubmitData() { 
    if(isNewPill){
    fetch(`${baseUrl}/pills/${PillData.boxNumber}`, {
      
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        credentials:"include",
        body: JSON.stringify(PillData) // Convert data object to JSON string
      
    }).then(async (d)=>{
      console.log(await d.json())
      setChanges(false)
      setisNewPill(false)
      getFreeSlots()

    })
  }
  else{
    fetch(`${baseUrl}/pills/${PillData.boxNumber}`, {
      
        method: 'PUT', // HTTP method
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        credentials: 'include',
        body: JSON.stringify(PillData) // Convert data object to JSON string
      
    }).then(async (d)=>{
      console.log(await d.json())
      setChanges(false)

    })
  }
    
    console.log("State Data: ", PillData);
    console.log("JSON Data: ", pilldata);
  }

  const Navigate = useNavigate()

  async function deleteData(){
    console.log("Deleting Pill")
    fetch(`${baseUrl}/pills/${PillData.boxNumber}`, {
      
        method: 'DELETE', // HTTP method
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        } // Convert data object to JSON string
      
    }).then(async (d)=>{
      console.log(await d.json())
      Navigate('/');

    })
  }
//-----------------------------------------------------------------------------


  //UI - starting
  return (
( PillData && 
    <>
      <Header title={(!languageChange?("Add your Pill Details"):(screenContent['AddPillTitle']))}></Header>


      <CompartmentBox
        handle={HandlePillChanges}
        slots = {freeslot}
        new={isNewPill} 
        val={PillData.boxNumber}
      ></CompartmentBox>


      <main style={{ padding: "2rem 0rem 2rem 2rem" }}>
        <label
          style={{
            fontSize: "1.5rem",
          }}
        >
          {(!languageChange?("Name"):(screenContent['name']))}
        </label>
        <input
          type="text"
          placeholder="Enter pill name"
          value={PillData.name}
          //  onChange={handleInputChange}
          style={{
            //textDecoration:"underline",
            border: "none",
            borderBottom: "1px solid green",
            width: "70%",
            padding: "0 0.5rem",
            margin: "0 0.3rem",
          }}
          name="pill-name"
          onChange={(e) => HandlePillChanges(e)}
        ></input>


        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "0px solid red",
            width: "80vw",
          }}
        >
          <section
            style={{
              padding: "2rem 0rem",
              border: "0px solid red",
              //marginRight:"3rem",
              width: "60%",
            }}
          >
            <p>{(!languageChange?("Timings And Dosage"):(screenContent['TimingsAndDosage']))}</p>
            {/* {["Morning", "Afternoon", "Evening", "Night"].map((t1) =>
              isSelectedList(t1),
            )} */}
          <PillintakeTab
          data={

            check_time(1)?PillData.intakeData.timings[get_index(1)]:{"timeID":1,"dosage":0}
            }
          selected={ check_time(1)}
          name={intakelabels[1]}
          handle={HandlePillChanges}
        ></PillintakeTab>
         <PillintakeTab
          data={check_time(2)?PillData.intakeData.timings[get_index(2)]:{"timeID":2,"dosage":0}}
          selected={check_time(2)}
          name={intakelabels[2]}
          handle={HandlePillChanges}
        ></PillintakeTab>
         <PillintakeTab
          data={check_time(3)?PillData.intakeData.timings[get_index(3)]:{"timeID":3,"dosage":0}}
          selected={check_time(3)}
          name={intakelabels[3]}
          handle={HandlePillChanges}
        ></PillintakeTab>
         <PillintakeTab
          data={check_time(4)?PillData.intakeData.timings[get_index(4)]:{"timeID":4,"dosage":0}}
          selected={check_time(4)}
          name={intakelabels[4]}
          handle={HandlePillChanges}
        ></PillintakeTab>
          </section>
          <section
            style={{
              width: "40%",
              //padding:"0 1rem",
              border: "0px solid red",
            }}
          >
            <p>{(!languageChange?("Pill Intake"):(screenContent['PillIntake']))}</p>
            <label>
              <input
                type="radio"
                name="food-intake"
                value="Before"
                checked={ PillData.intakeData.withFood==0}
                onChange={(e) => HandlePillChanges(e)}
              />
              {(!languageChange?("Before Food"):(screenContent['BeforeFood']))}
            </label>
            <br></br>
            <label>
              <input
                type="radio"
                name="food-intake"
                value="After"
                checked={PillData.intakeData.withFood==1}
                onChange={(e) => HandlePillChanges(e)}
              />
              {(!languageChange?("After Food"):(screenContent['AfterFood']))}
            </label>
          </section>
        </div>
        {/* <button onClick={()=>{
          console.log(PillData.boxNumber)
        }}></button> */}
        {/* <Button>Refill &rarr;</Button> */}
        <Button theme={"success"} onClick={SubmitData} dis={!changes} >
        {(!languageChange?("Save Changes"):(screenContent['SaveChanges']))}
        </Button>
        <Button theme={"delete"} onClick={deleteData}  >
        {(!languageChange?("Delete Pill"):(screenContent['Delete']))}
        </Button>
      </main>
    </>
)
  );
}
