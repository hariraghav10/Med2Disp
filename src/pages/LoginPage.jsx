import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import config from '../appConfig.json'
import languageContent from '../data/languageContents.json'



function LoginPage() {
    const baseUrl = config.baseURL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true); // Set loading state while waiting for response
  
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies for session handling
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Capture error details if provided
        throw new Error(errorData.message || "Failed to log in");
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
  
      // Set user state, token, or any other necessary state here
      // For example: setUser(data.user) or setToken(data.token)
  
      navigate("/"); // Redirect only after successful state update
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
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
