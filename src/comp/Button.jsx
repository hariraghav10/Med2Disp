import React from 'react'

export default function Button (p) {

    let mainStyle={
        padding:"1rem 2rem",
        backgroundColor:"#EDEDED",
        border:"none",
        fontWeight:"bold",
        width:"75%",
        borderRadius:"10px", 
        margin:"0.6rem 0"
    }

    let successStyle = {
        backgroundColor:"#35EA88",
        width:"fit-content",
    }

    let Style = {}
    if(p.theme && p.theme == "success"){
        Style = {...mainStyle, ...successStyle}
    }
    else{
        Style = mainStyle
    }
  return (
    <button style={Style} onClick={p.onClick}>
        {p.children}
    </button>
  )
}
