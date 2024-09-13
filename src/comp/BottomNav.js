import { BottomNavigation, BottomNavigationAction } from "@mui/material";
//import {makeStyles} from "@emotion/styles"
import { useEffect, useState } from "react";
import HomeIcon from "../Home.png";
import AddIcon from "../Add.png";
import SettingsIcon from "../Settings.png";
import { redirect, useLocation, useNavigate } from "react-router-dom";
export default function BottomNav() {
  const [value, setValue] = useState(0);
  let page = useLocation();
  page = page.pathname;
  console.log("page: ", page);

  useEffect(() => {
    page == "/" && setValue(0);
    page == "/add" && setValue(1);
    page == "/settings" && setValue(2);
    page == "/refill" && setValue(3);
  });
  /*
    const useStyles = makeStyles({
        root: {
          '& .Mui-selected': {
            color: 'blue', // Change the color when the button is selected
          },
          '& .MuiBottomNavigationAction-root': {
            '&:hover': {
              color: 'red', // Change the color on hover
            },
          },
        },
      });
  */
  const Navigate = useNavigate();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "60px",
        border: "0px solid green",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue == 0) {
            Navigate("/");
          }
          if (newValue == 1) {
            Navigate("/add");
          }
          if (newValue == 2) {
            Navigate("/settings");
          }
          if (newValue == 3) {
            Navigate("/refill");
          }
        }}
        sx={{}}
        //className={useStyles.root}
      >
        <BottomNavigationAction
          label="HOME"
          icon={
            <img
              src={HomeIcon}
              style={{
                marginBottom: "2px",
              }}
            ></img>
          }
        />
        <BottomNavigationAction
          label="ADD PILL"
          icon={
            <img
              src={AddIcon}
              style={{
                marginBottom: "2px",
              }}
            ></img>
          }
        />
        <BottomNavigationAction
          label="SETTINGS"
          icon={
            <img
              src={SettingsIcon}
              style={{
                marginBottom: "2px",
              }}
            ></img>
          }
        />
        <BottomNavigationAction
          label="REFILL"
          icon={
            <img
              src={HomeIcon}
              style={{
                marginBottom: "2px",
              }}
            ></img>
          }
        />
      </BottomNavigation>
    </div>
  );
}
