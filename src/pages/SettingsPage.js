import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Header from "../comp/Header"
import TimingsTab from "../comp/TimingsTab";
import Button from '../comp/Button'
export default function SettingsPage() {

    const [inputValue, setInputValue] = useState('Steven Smith');

    let data = {
        "userdata":{
        "username": "Ram Kumar",
        },

        "defaulttimingsdata":{
            "Morning":"09:00",
            "Afternoon":"13:00",
            "Evening":"17:00",
            "Night":"21:00",
            }
    
    }
    const [settingsData, setSettingsData] = useState(data)

    // Handle input change
    const handleInputChange = (event) => {
        setSettingsData((d) => {
            return {
              ...d, 
              userdata:{
                username:event.target.value
              }
            }})  
    };

    function HandleTimeChange(timelabel, timing) {
        console.log("Got: ", timelabel, timing)
        setSettingsData((d) => {
          return {
            ...d,
            defaulttimingsdata: {
              ...d.defaulttimingsdata,
              [timelabel]: timing, // Use square brackets to set the property dynamically
            },
          };
        });
        console.log(settingsData);
      }

      function SubmitData(){
        console.log(settingsData)
      }
    return(

        <>
              <Header title="Configure the App settings"></Header>
            <main style={{padding:"2rem 0 2rem 2rem"}}>
                <section className="settings-section">
                <p className="settings-title">User Detail</p>
                <label style={{
                    fontSize:"1.5rem"
                }}>Name:</label>
                <input type="text" placeholder="Enter your name"
                value={settingsData.userdata.username}
                onChange={handleInputChange}
                style={{
                    //textDecoration:"underline",
                    border:"none",
                    borderBottom:"1px solid green",
                    width:"70%",
                    padding:"0 0.5rem",
                    margin:"0 0.3rem"
                }}
                ></input>
                </section>
                
                <section className="settings-section">
                <p className="settings-title">Configure Timings</p>
                
                <TimingsTab label={"Morning"} time={settingsData["defaulttimingsdata"].Morning} handleChange={HandleTimeChange}></TimingsTab>
                <TimingsTab label={"Afternoon"} time={settingsData["defaulttimingsdata"].Afternoon} handleChange={HandleTimeChange}></TimingsTab>
                <TimingsTab label={"Evening"} time={settingsData["defaulttimingsdata"].Evening} handleChange={HandleTimeChange}></TimingsTab>
                <TimingsTab label={"Night"} time={settingsData["defaulttimingsdata"].Night} handleChange={HandleTimeChange}></TimingsTab>
                </section>

                <section className="settings-section">
                <p className="settings-title">Other Options</p>
                <Button >Refill All  &rarr;</Button>
                <Button>View Alerts  &rarr;</Button>
                </section>
                <div style={{
                    width:"fit-content",
                    margin:"auto",
                    marginTop:"3rem",
                    marginRight:"2rem"
                }}>
                <Button theme={"success"} onClick={SubmitData}>Save Changes</Button>
                {/* <button onClick={()=> HandleTimeChange("Afternoon","22:00")}>update</button> */}
                </div>
            </main>
        </>

    )}