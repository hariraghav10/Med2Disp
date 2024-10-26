import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
//import { pilldata } from "../data/pillsdata.js";
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PenIcon from "../Pen.png";
import Button from "@mui/material/Button";

import languageContent from '../data/languageContents.json'
export default function PillDetail(p) {
  const pill = p.data;
  const [IconShow, setIconShow] = useState(false);

  let [languageChange, setLanguageChange] = useState(false) 
  let [screenContent, setScreenContent] = useState({})
  useEffect(()=>{
    const language = localStorage.getItem('Lang');
    const langChange = localStorage.getItem('LangChange');

   
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
  const foodlabels ={
    0:(!languageChange?("Before Food"):(screenContent['BeforeFood'])),
    1:(!languageChange?("After Food"):(screenContent['AfterFood'])),
  }
  const Navigate = useNavigate();

  function handlePencilClick(id) {
    //alert("clikced")
    Navigate("/add?id=" + id);
  }

  console.log("index: ", p.ind);
  return (
    <div style={{ padding: "0.5rem 0" }}>
      <Accordion
        onChange={(event, isExpanded) => {
          setIconShow(isExpanded);
        }}
        sx={{ bgcolor: "primary.main" }}
        //expanded={p.ind==0}
        //expanded
      >
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "fit-content",
                border: "0px solid green",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  backgroundColor: "#00f59b",
                  margin: "0",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  fontSize: "1rem",
                }}
              >
                {" "}
                {pill.boxNumber}
              </p>
              <p
                style={{
                  marginLeft: "2rem",
                  margin: "0",
                  padding: "0.5rem 1rem",
                  marginTop: "0px",
                  fontSize: "1.4rem",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {pill.name}{" "}
              </p>
            </div>
            {IconShow && (
              <div
                style={{
                  border: "0px solid green",
                  marginRight: "1rem",
                  padding: "1rem",
                }}
                onClick={(e) => handlePencilClick(pill.boxNumber)}
              >
                <img
                  style={{ display: "block", border: "0px solid green" }}
                  src={PenIcon}
                  width="15px"
                  height="15px"
                />
              </div>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "primary.main1" }}>
          <div
            style={{
              display: "flex",
              border: "0px solid green",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "0px solid red",
                alignContent: "start",
                width: "40%",
              }}
            >
              {pill.intakeData.timings.map((intake) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>{intakelabels[intake.timeId]} </p>
                  <p style={{ fontWeight: "100" }}>{intake.dosage} Pill</p>
                </div>
              ))}
            </div>
            <p style={{ border: "0px solid pink" }}>{foodlabels[pill.intakeData.withFood] }</p>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
