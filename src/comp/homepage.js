import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
function HomePage() {
    const [data, setData] = useState([
       
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchData = async () => {
            try {
              // Example: Dynamically determine the base URL
              const baseUrl = window.location.protocol + '//' + window.location.hostname + ':' + '3030';

              const apiUrl = baseUrl + '/meds';

              const response = await fetch(apiUrl);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
      
              const result = await response.json();
              setData(result);
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData(); 
    },[])
  return (
    <div className="Home-App" style={{margin:'auto',border:'0px solid black', width:'fit-content', marginTop:'100px'}}>
        <h1 style={{color:'green'}}>List of Medicines</h1>
        <ul>
        {data.map((medicine, index) => (
          <li key={index}>
            <strong>Medicine Name:</strong> {medicine.medicineName}<br />
            <strong>Dosage:</strong> {medicine.dosage}<br />
            <strong>Food:</strong> {medicine.food}<br />
            <strong>Time of Day:</strong> {medicine.timeOfDay}<br />
            <br />
          </li>

        ))}
      </ul>
     <Link href="/add" to={'/add'} style={{display:'flex', width:'fit-content', margin:'auto', textDecoration:'none', border:'1px solid green', padding:'1rem', color:'green', alignItems:'center'}}> <span style={{fontSize:'30px',display:'block', border:'0px solid black', marginTop:'-5px', marginRight:'10px'}}>+</span> Add Medicine</Link>
    </div>
  );
}

export default HomePage;
