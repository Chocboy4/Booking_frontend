// LoginPage.jsx
import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password }, { withCredentials: true }); // Include withCredentials
      setUser(data); // Set user context with received data
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert("Login Failed");
      console.error(error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4 ">Login Form</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="@yourEmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't you have an account yet?
            <Link to={"/register"} className="underline text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
