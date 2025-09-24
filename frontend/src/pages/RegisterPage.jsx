import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { register } from "../services/api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });

 
      await login({ email, password });

      navigate("/");
    } catch (error) {
      alert("Registration failed. The email might already be in use.");
      console.log(error)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-white">Sign Up</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4 text-white">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded text-white"
          />
        </div>
        <div className="mb-4 text-white">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded text-white"
          />
        </div>
        <div className="mb-4 text-white">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
            className="w-full px-3 py-2 border rounded text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;