import { purple, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#BED7FF',
      main2:"#E4EFFF",
    },
    secondary: {
      main: red.A400,
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    // Name of the component
    MuiBottomNavigation: {
      styleOverrides: {
        // Name of the slot
        root: {
          height:"100%",
          backgroundColor:"rgb(53, 234, 136)",
          backgroundColor:"#F7F7F7",
          border:"0px solid red",
          boxShadow:'-1px 0px 50px 2px rgba(0,0,0,0.1)',
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
         fontWeight:"bold",
         fontSize:"2rem",
         backgroundColor:"#F7F7F7",
         backgroundColor:"blue",
         backgroundColor:"rgb(53, 234, 136)",
         backgroundColor:"#F7F7F7",
         //padding:"10px",
         height:"100%",
          '&:hover': {
            backgroundColor:"white"
            
          },
          '&.Mui-selected': {
            // Background color for the selected tab
            color: 'rgb(53, 234, 136)',
            color:"black", 
            fontWeight:"bold" ,
            backgroundColor:"#E4EFFF",
            backgroundColor:"#BED7FF",
            backgroundColor:"rgb(53, 234, 136)",
            borderRadius:"6px",

            // Text color for the selected tab
          },
        },
      },
    },
  },
});

export default theme;