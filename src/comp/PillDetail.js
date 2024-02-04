import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {pilldata} from '../data/pillsdata.js'
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PenIcon from '../Pen.png'
import Button from '@mui/material/Button';
export default function PillDetail(p) {
  const pill = p.data
    const [IconShow, setIconShow] = useState(false)
    function handlePencilClick(){
        alert("clikced")
    }
    return(

        <div style={{padding:"0.5rem 0"}}>
    
            <Accordion  onChange={(event, isExpanded) => {
                setIconShow(isExpanded)
            }}
            sx={{bgcolor:"primary.main"}}
            >
        <AccordionSummary
         
          aria-controls="panel1-content"
          id="panel1-header"
        >
        <div style={{display:"flex", alignItems:"center",  justifyContent:"space-between", width:"100%"}}>
        
        
        <div style={{display:"flex",height:"fit-content", border:"0px solid green", justifyContent:"space-around", alignItems:"center" }}>
         
         <p style={{backgroundColor:"#35EA88",margin:"0", padding:"0.5rem 1rem", borderRadius:'5px', fontSize:"1rem"}}> {pill.compartment}</p>
         <p style={{marginLeft:"2rem",margin:"0",padding:"0.5rem 1rem", marginTop:"0px", fontSize:"1.4rem"}}>{pill.name} </p>
        
        </div>
          {
            IconShow &&  
           <div style={{ border:"0px solid green", marginRight:"1rem", padding:'1rem'}} onClick={(e)=>handlePencilClick()}>
                <img  style={{display:"block",border:"0px solid green", }} src={PenIcon} width="15px" height="15px"/>
          </div>
        
        }
          </div>
          
        </AccordionSummary>
        <AccordionDetails  sx={{bgcolor:"primary.main1"}}>

        <div style={{ display:"flex", border:"0px solid green", justifyContent:"space-around", alignItems:"center" }}>
          <div  style={{ border:"0px solid red", alignContent:"start", width:"40%"}}> 

          {pill.timings.map(time=>(
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <p style={{fontWeight:"bold"}}>{time.name}  </p>
            <p style={{fontWeight:"100",}}>{time.dosage} Pill</p>
          </div>
         
          ))} 
          
          
          </div>
          <p style={{ border:"0px solid pink"}}>{pill.food +" Food"}</p>
          </div>
        </AccordionDetails>
      </Accordion>

            

        
           

        </div>

    )}