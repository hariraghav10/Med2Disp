import React, { useState } from 'react';
import { redirect,useNavigate, Link } from "react-router-dom";
const MedicineForm = () => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [food, setFood] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
        e.preventDefault();

    const formData = {
      medicineName,
      dosage,
      food,
      timeOfDay,
    };

    try {
      const baseUrl = window.location.protocol + '//' + window.location.hostname + ':' + '3030';

      const apiUrl = baseUrl + '/submit';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
        // You can perform additional actions after successful submission
        const responseData = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', responseData);
        return navigate("/");

      } else {
        console.error('Failed to submit form data.');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
    redirect("/alkn");
  };

  return (
    <>
    {// just html tags
    }
    <form onSubmit={handleSubmit} className='form'>
      <label>
        Medicine Name:
        <input
          type="text"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />
      </label>

      <br />

      <label>
        Dosage:
        <input
          type="text"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />
      </label>

      <br />

      <label>
        Food:
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
      </label>

      <br />

      <label>
        Time of Day:
        <input
          type="text"
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value)}
        />
      </label>

      <br />

      <button type="submit">Submit</button>
    </form>
    <Link href="/" to={"/"} style={{display:'block', width:'fit-content', margin:'auto', textDecoration:'none', border:'1px solid green', padding:'1rem', color:'green',marginTop:'30px'}}>Home →</Link>
     </>
  );
};

export default MedicineForm;
