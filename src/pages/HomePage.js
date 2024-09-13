import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../comp/Header";
import PillDetail from "../comp/PillDetail";
import PillsList from "../comp/PillsList";
import Button from "../comp/Button";
//import { pilldata } from "../data/pillsdata";
import { Plugins } from '@capacitor/core';
import { Network } from '@capacitor/network';
//const { Network } = Plugins;

import config from '../appConfig.json'


export default function HomePage() {
 
  //let baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + "3030";
  //baseUrl = 'http://172.21.48.1:3030'
  const baseUrl = config.baseURL;

  //testing ----
  const [ipAddress, setIpAddress] = useState(null);
  


  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const info = await Network.getInfo();
        setIpAddress(info.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  // ----


  // const [baseUrl, setBaseUrl] = useState('');

  // useEffect(() => {
  //   const newBaseUrl = window.location.protocol + "//" + window.location.hostname + ":" + "3030";
  //   setBaseUrl(newBaseUrl);
  //   console.log('baseUrl is : ', newBaseUrl);
  // }, [baseUrl]); // Empty dependency array to run this effect only once on component mount


  //console.log("HomePage.jsx : ", pilldata.data)
  let [PillData, setPillData] = useState(null);
  useEffect(()=>{
    getAllPills();
  },[])
  async function getAllPills(){
    try{
      //alert(baseUrl)
      let pills = await fetch(`${baseUrl}/pills`)
      if (!pills.ok) {
        alert("Network response was not ok");
      }
      let pillsjson = await pills.json()
      setPillData(pillsjson);
      console.log("from the Homepage comp, State : ", pillsjson);
      //console.log("from the Homepage comp, JSON  : ", pilldata);
      

    }
    catch (error) {
     //alert(error);
     console.log(error);
    }
  }
  return (
    <>
      <Header title="Pills in the Dispenser"></Header>
      <div style={{ width: "90%", margin: "auto" }}>
        <PillsList data={PillData}></PillsList>
      </div>

      {/* Testing Ip with Button---- */}
      {/* <Button onClick={(e)=>{
        alert(`Base Url: ${baseUrl}`)
      }}>{`Show BaseURL: ${baseUrl}`}</Button> */}
      {/* ---- Testing Ip with Button */}

      <div>
      
      {/* Testing Ip ---- */}
      {/* <h1>Device IP Address</h1>
      {ipAddress ? <p>Your IP Address: {ipAddress}</p> : <p>Loading...</p>} */}
      {/* ---- Testing Ip */}

    </div>
      
    </>
  );
}
