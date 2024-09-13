import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../comp/Header";
import TimingsTab from "../comp/TimingsTab";
import Button from "../comp/Button";

import config from '../appConfig.json'


export default function SettingsPage() {

  //const baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + "3030";
  const baseUrl = config.baseURL
  const [inputValue, setInputValue] = useState("Steven Smith");

  let data = {
    userdata: {
      username: "Ram Kumar",
    },

    defaulttimingsdata: {
      Morning: "09:00",
      Afternoon: "13:00",
      Evening: "17:00",
      Night: "21:00",
    },
  };
  const [settingsData, setSettingsData] = useState(data);
  const [timeData, setTimeData] = useState();
  const [changes,setChanges] = useState(false);

  useEffect(()=>{
    fetchTimes()
  },[])

  useEffect(()=>{
    console.log("re renderign")
  },[timeData])


  async function fetchTimes(){
   
    let data = await fetch(`${baseUrl}/times`)
    if (!data.ok) {
      console.log("Network response was not ok");
    }
    let datajson = (await data.json()).data
    console.log("Fetched time: ", datajson)
    setTimeData(datajson)
  }



  // Handle input change
  const handleInputChange = (event) => {
    setSettingsData((d) => {
      return {
        ...d,
        userdata: {
          username: event.target.value,
        },
      };
    });
  };

  function HandleTimeChange(timelabel, timing) {
    setChanges(true)
    console.log("Got: ", timelabel, timing);
    let tempTime = timeData
    tempTime[timelabel].time = timing
    //setTimeData(tempTime)
    setTimeData(prevState => {
      const modifiedState = [...prevState]; // Create a new array with the same elements as prevState
      modifiedState[timelabel].time = timing; // Modify the new array
      return modifiedState; // Return the new array as the updated state
  });
    // setSettingsData((d) => {
    //   return {
    //     ...d,
    //     defaulttimingsdata: {
    //       ...d.defaulttimingsdata,
    //       [timelabel]: timing, // Use square brackets to set the property dynamically
    //     },
    //   };
    // });
    console.log(tempTime);
    console.log(timeData)
  }

  function SubmitData() {
    //console.log(settingsData);
    console.log(timeData)
    fetch(`${baseUrl}/times`, {
      
    method: 'PUT', // HTTP method
    headers: {
      'Content-Type': 'application/json' // Specify the content type as JSON
    },
    body: JSON.stringify(timeData) // Convert data object to JSON string
  
}).then(async (d)=>{
  console.log(await d.json())
  setChanges(false)
  
  

})
  }
  return (
    <>
    {
    (timeData && (<>
      <Header title="Configure the App settings"></Header>
      <main style={{ padding: "2rem 0 2rem 2rem" }}>
        <section className="settings-section">
          <p className="settings-title">User Detail</p>
          <label
            style={{
              fontSize: "1.5rem",
            }}
          >
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={settingsData.userdata.username}
            onChange={handleInputChange}
            style={{
              //textDecoration:"underline",
              border: "none",
              borderBottom: "1px solid green",
              width: "70%",
              padding: "0 0.5rem",
              margin: "0 0.3rem",
            }}
          ></input>
        </section>

        <section className="settings-section">
          <p className="settings-title">Configure Timings</p>

          {timeData[0] && <TimingsTab
            label={"Morning"}
            name={0}
            time={timeData?timeData[0].time:'09:10'}
            handleChange={HandleTimeChange}
          ></TimingsTab> }
          <TimingsTab
            label={"Afternoon"}
            name={1}
            time={timeData[1].time}
            handleChange={HandleTimeChange}
          ></TimingsTab>
          <TimingsTab
            label={"Evening"}
            name={2}
            time={timeData[2].time}
            handleChange={HandleTimeChange}
          ></TimingsTab>
          <TimingsTab
            label={"Night"}
            name={3}
            time={timeData[3].time}
            handleChange={HandleTimeChange}
          ></TimingsTab>
           <Button theme={"success"} onClick={SubmitData} dis={!changes}>
            Save Changes
          </Button>
        </section>

        <section className="settings-section">
          <p className="settings-title">Other Options</p>
          <Button>Refill All &rarr;</Button>
          <Button>View Alerts &rarr;</Button>
         
        </section>
        {/* <div style={{
                    width:"fit-content",
                    margin:"auto",
                    marginTop:"3rem",
                    marginRight:"2rem"
                }}> */}
        {/* <Button theme={"success"} onClick={SubmitData}>Save Changes</Button> */}
        {/* <button onClick={()=> HandleTimeChange("Afternoon","22:00")}>update</button> */}
        {/* </div> */}
      </main>

    </>))}
        </>
  );
}
