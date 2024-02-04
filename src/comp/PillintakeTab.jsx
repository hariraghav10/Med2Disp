

export default function PillintakeTab(p) {
    console.log(p.data)
  return (
    <div style={{
        backgroundColor: p.selected ? '#BED7FF': '#CECECE',
        width:"80%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"0rem 0.8rem",
        margin:"1rem 0rem",
        borderRadius:"10px",
    }}>
      <p style={{
        fontSize:"0.9rem",
        fontWeight:p.selected?"bold":"normal"
      }}>{p.data.name}</p>
      <div>
      {/* <label>dose :</label> */}
      <input type="number" value={p.data.dosage} style={{
        width:'24px',
        marginLeft:"0.2rem",
        border:"none",
        borderBottom:'1px solid gray',
        backgroundColor:'inherit',
        lineHeight:"2px",
        padding:'0rem',
        fontSize:'1rem',
        textJustify:"center"
        
      }}></input>
      </div>
    </div>
  )
}
