import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginRequest } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.js";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginRequest(form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Log in to TenantCart</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full border rounded px-3 py-2" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full border rounded px-3 py-2" required />
        <button type="submit" className="w-full bg-indigo-600 text-white rounded py-2 hover:bg-indigo-700">
          Log in
        </button>
        <p className="text-sm text-gray-500">
          No account? <Link to="/register-account" className="text-indigo-600">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;