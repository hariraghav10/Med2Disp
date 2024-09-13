export default function PillintakeTab(p) {
  const intakelabels ={
    1:"Morning",
    2:"Afternoon",
    3:"Evening",
    4:"Night",
    5:"Custom"
  }
  console.log(p.data);
  return (
    <div
      style={{
        backgroundColor: p.selected ? "#7014f2" : "#CECECE",
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0rem 0.8rem",
        margin: "1rem 0rem",
        borderRadius: "10px",
      }}
    >
      <p
        style={{
          fontSize: "0.9rem",
          fontWeight: p.selected ? "bold" : "normal",
        }}
      >
        {p.name}
      </p>
      <div>
        {/* <label>dose :</label> */}
        <input
          type="number"
          value={parseInt(p.data.dosage)}
          placeholder={parseInt(p.data.dosage) ? null : "0"}
          style={{
            width: "24px",
            marginLeft: "0.2rem",
            border: "none",
            borderBottom: "1px solid gray",
            backgroundColor: "inherit",
            lineHeight: "2px",
            padding: "0rem",
            fontSize: "1rem",
            textJustify: "center",
          }}
          name={p.name}
          onChange={(e) => {
            console.log("what happened: ", e.target.name);
            console.log("what happened: ", e.target.value);
            p.handle(e);
          }}
        ></input>
      </div>
    </div>
  );
}
