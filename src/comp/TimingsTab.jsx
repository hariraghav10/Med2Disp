export default function TimingsTab(p){
    return(

        <>
            <div style={{
                padding:"0rem 1.6rem",
                backgroundColor:"#EDEDED",
                margin:"1rem 0",
                width:"75%",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                borderRadius:'20px',
            }}>
                <p style={{
                    display:"inline-block"
                }}>{p.label}</p>
                <label></label>
                <input type="time" value={p.time}
                onChange={e=>{
                    p.handleChange(p.label,e.target.value)
                    console.log(e.target.value)
                }}

                style={{
                    border:"none",
                    borderBottom:"1px solid black",
                    backgroundColor:"inherit",
                    padding:"0.2rem 0.6rem",
                    borderRadius:"0px",
                    margin:"0"  
                }}
                />
            </div>
        </>

    )
}