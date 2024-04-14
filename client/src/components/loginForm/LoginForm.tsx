import { FormEvent, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const LoginForm = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const { setUser } = useAuth()
const navigate = useNavigate()


    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
       setUser(data.user)
       navigate("/")
       const redirectTo = localStorage.getItem('redirectTo') || '/'
       localStorage.removeItem('redirectTo')
       navigate(redirectTo)
        
      } else {
        console.error("login Failed:", data.message);
        setError(data.message)
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="text" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Sign in</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};
