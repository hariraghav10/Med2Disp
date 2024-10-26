import React, { useState,useEffect} from "react";

import config from '../appConfig.json'
import languageContent from '../data/languageContents.json'



function LoginPage() {
    const baseUrl = config.baseURL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // Here, you could add authentication logic or API calls
    setError("");

    try {
      const response = await fetch(baseUrl+"/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Include cookies in requests
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Handle successful login, e.g., redirect user, save token, etc.
      window.location.href = '/';
    } catch (error) {
      console.error("Error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      padding: "2rem",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      width: "300px",
      textAlign: "center",
    },
    input: {
      margin: "0.5rem 0",
      padding: "0.8rem",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      marginTop: "1rem",
      padding: "0.8rem",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#4CAF50",
      color: "#ffffff",
      cursor: "pointer",
    },
    header: {
      marginBottom: "1rem",
      fontSize: "1.5rem",
      color: "#333",
    },
  };

  
  let [languageChange, setLanguageChange] = useState(false) 
  let [screenContent, setScreenContent] = useState({})
  useEffect(()=>{
    const language = localStorage.getItem('Lang');
    const langChange = localStorage.getItem('LangChange')==="true";

   console.log(langChange)
    setLanguageChange(langChange);
    langChange&&setScreenContent(languageContent[language]['contents']);
    console.log(languageChange)
  },[])


  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.formContainer}>
        <h2 style={styles.header}> {(!languageChange?("Welcome"):(screenContent['Welcome']))}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
        {(!languageChange?("Login"):(screenContent['Login']))}
        </button>
        {error && <p style={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
