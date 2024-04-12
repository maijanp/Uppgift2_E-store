import { FormEvent, useState } from "react";


export const CreateAccountForm = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')


    const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleCreateAccount}>
        <h2>Create Account</h2>
        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="text" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Create Account</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};
