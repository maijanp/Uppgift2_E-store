import { ChangeEvent, FormEvent, useState } from "react";
import { IUserData } from "../../models/IUserData";


export const CreateAccountForm = () => {
const [userData, setUserData] = useState<IUserData>({
  email: '',
  firstName: '',
  lastName:'',
  street:'',
  city:'',
  zipCode: ''
})

const [password, setPassword] = useState('')
const [error, setError] = useState('')


const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target
  if (name === 'password') {
    setPassword(value)
  } else {
    setUserData(prev => ({
      ...prev,
      [name] : value
    }))
  }
}

    const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fullUserData = {...userData, password}
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullUserData),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registrering lyckades!')
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
        <input type="email" name="email" id="email" placeholder="Email" value={userData.email} onChange={handleChange}/>
        <input type="password"name="password" id="password" placeholder="Password" value={password} onChange={handleChange}/>
        <input type="text" name="firstName" id="firstName" placeholder="Name"value={userData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" id="lastName" placeholder="Last Name" value={userData.lastName} onChange={handleChange}/>
        <input type="text" name="street" id="street" placeholder="Street" value={userData.street} onChange={handleChange}/>
        <input type="text" name="city" id="city" placeholder="City" value={userData.city} onChange={handleChange}/>
        <input type="text" name="zipCode" id="zipCode" placeholder="Zip Code" value={userData.zipCode} onChange={handleChange}/>
        <button type="submit">Create Account</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};
