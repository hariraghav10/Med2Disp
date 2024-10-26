import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../comp/Header";
import TimingsTab from "../comp/TimingsTab";
import Button from "../comp/Button";

import config from '../appConfig.json'
import languageContent from '../data/languageContents.json'


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

  
  let [languageChange, setLanguageChange] = useState(false) 
  let [screenContent, setScreenContent] = useState({})
  useEffect(()=>{
    const language = localStorage.getItem('Lang');
    const langChange = localStorage.getItem('LangChange')==="true";

   
    setLanguageChange(langChange);
    langChange&&setScreenContent(languageContent[language]['contents']);
    console.log('Language Change: ',langChange)
    console.log("Language Change State Variable: ", languageChange)
  },[])


  const intakelabels ={
    1:(!languageChange?("Morning"):(screenContent['morning'])),
    2:(!languageChange?("Afternoon"):(screenContent['afternoon'])),
    3:(!languageChange?("Evening"):(screenContent['evening'])),
    4:(!languageChange?("Night"):(screenContent['night'])),
    5:"Custom"
  }
  let title=((!languageChange)?("Configure App Settings"):(screenContent['ConfigureAppSettings']))
  console.log(title)
  return (
    <>
    {
    (timeData && (<>
      <Header title={title}></Header>
      <main style={{ padding: "2rem 0 2rem 2rem" }}>
        <section className="settings-section">
          <p className="settings-title">{(!languageChange?("User Detail"):(screenContent['UserDetail']))}</p>
          <label
            style={{
              fontSize: "1.5rem",
            }}
          >
            {(!languageChange?("Name"):(screenContent['name'])) + " :"}
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
          <p className="settings-title"> {(!languageChange?("Configure Timings"):(screenContent['ConfigureTimings']))}</p>

          {timeData[0] && <TimingsTab
            label={intakelabels[1]}
            name={0}
            time={timeData?timeData[0].time:'09:10'}
            handleChange={HandleTimeChange}
          ></TimingsTab> }
          <TimingsTab
            label={intakelabels[2]}
            name={1}
            time={timeData[1].time}
            handleChange={HandleTimeChange}
          ></TimingsTab>
          <TimingsTab
            label={intakelabels[3]}
            name={2}
            time={timeData[2].time}
            handleChange={HandleTimeChange}
          ></TimingsTab>
          <TimingsTab
            label={intakelabels[4]}
            name={3}
            time={timeData[3].time}
            handleChange={HandleTimeChange}
          ></TimingsTab>
           <Button theme={"success"} onClick={SubmitData} dis={!changes}>
           {(!languageChange?("Save Changes"):(screenContent['SaveChanges']))}
          </Button>
        </section>

        <section className="settings-section">
          <p className="settings-title">
          {(!languageChange?("Other Options"):(screenContent['OtherOptions']))}
          </p>
          <Button> {(!languageChange?("Refill All"):(screenContent['RefillAll']))} &rarr;</Button>
          <Button> {(!languageChange?("View Alert"):(screenContent['ViewAlert']))} &rarr;</Button>
         
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

      <div>

     <LanguageDropdown></LanguageDropdown>
     {/* <div>
        <button onClick={()=>{console.log(languageChange)}}>Show Language Change</button>
      </div> */}

      </div>
    </>))}
        </>
  );
}

const LanguageDropdown = () => {

  let [languageChange, setLanguageChange] = useState(false) 
  let [screenContent, setScreenContent] = useState({})
  useEffect(()=>{
    const language = localStorage.getItem('Lang');
    const langChange = localStorage.getItem('LangChange')==="true";

   
    setLanguageChange(langChange);
    if (langChange){
      setScreenContent(languageContent[language]['contents']);
    }
  
  },[])
  
  const [isOpen, setIsOpen] = useState(false);

  const dropdownStyle = {
      position: 'relative',
      display: 'inline-block',
      textAlign: 'center',
      margin:"auto auto 200px 40vw"
  };

  const buttonStyle = {
      cursor: 'pointer',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      width: '150px',
  };

  const dropdownContentStyle = {
      position: 'absolute',
      top: '100%',
      left: '0',
      zIndex: '10',
      width: '150px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      display: isOpen ? 'block' : 'none',
      backgroundColor: '#fff',
  };

  const itemStyle = {
      padding: '8px 12px',
      cursor: 'pointer',
      textAlign: 'left',
      width: '100%',
  };

  return (
      <div style={dropdownStyle}>
          <div
              onClick={() => setIsOpen(!isOpen)}
              style={buttonStyle}
          >
              {(!languageChange?("English"):(screenContent['language']))}  →
          </div>
          <div style={dropdownContentStyle}>
              <div onClick={() => setLanguage('en')} style={itemStyle}>English</div>
              <div onClick={() => setLanguage('ta')} style={itemStyle}>தமிழ்</div>
              <div onClick={() => setLanguage('te')} style={itemStyle}>తెలుగు</div>
              <div onClick={() => setLanguage('ml')} style={itemStyle}>മലയാളം</div>
          </div>
      
     

      </div>
      
  );
};


function setLanguage(lang) {
  if(lang != "en"){
    localStorage.setItem('Lang', lang);
    localStorage.setItem('LangChange', true);
  }
  else{
    localStorage.setItem('Lang', lang);
    localStorage.setItem('LangChange', false);
  }
  
}