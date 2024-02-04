import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Header from "../comp/Header"
import {pilldata} from '../data/pillsdata'
import TimingsTab from "../comp/TimingsTab";
import Button from '../comp/Button'
import PillintakeTab from "../comp/PillintakeTab";

export default function AddPillPage() {
    let data=pilldata.data[0]
    const [PillData, setPillData] = useState(data)
    console.log(data)

    function ChangeTimingSelection(label,change){
        console.log("which time: ", label, " what to do: ", change)

    }

    function isSelectedList(t1){
        
            if (PillData.timings.some(t2 => t1 === t2.name)) {
              console.log(t1, 'is selected');
             return( <PillintakeTab data={PillData.timings.find(t2 => t2.name == t1)} selected={true}></PillintakeTab>)
            } else {
              console.log(t1, 'is not selected');
             return( <PillintakeTab data={{"name":t1,"dosage":0}} selected={false}></PillintakeTab>)
            }
       
    }
    return(

        <>
              <Header title="Add your Pill Details"></Header>
              <main style={{padding:"2rem 0rem 2rem 2rem"}}>
                  <label style={{
                    fontSize:"1.5rem"
                }}>Name:</label>
              <input type="text" placeholder="Enter your name"
                value={PillData.name}
              //  onChange={handleInputChange}
                style={{
                    //textDecoration:"underline",
                    border:"none",
                    borderBottom:"1px solid green",
                    width:"70%",
                    padding:"0 0.5rem",
                    margin:"0 0.3rem"
                }}
                ></input>
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    border:"0px solid red",
                    width:"80vw"
                    
                }}>
                <section style={{
                    padding:"2rem 0rem",
                    border:"0px solid red",
                    //marginRight:"3rem",
                    width:"60%",
                }}>
                <p>Timings and Dosage</p>
                {
                  ['Morning', 'Afternoon', 'Evening', 'Night'].map(t1 => (
                 isSelectedList(t1)
                  ))
                
            }
            </section>
            <section style={{
                width:"40%",
                //padding:"0 1rem",
                border:"0px solid red"
            }}>
                <p>Pill Intake</p>
                <label>
                     <input type="radio" name="food" value="Before" checked={PillData.food=='Before'}/>
                     Before
                </label>
                <br></br>
                <label>
                     <input type="radio" name="food" value="After" checked={PillData.food=='After'}/>
                     After
                </label>
            </section>
            </div>

                    
  
              </main>

        </>

    )}