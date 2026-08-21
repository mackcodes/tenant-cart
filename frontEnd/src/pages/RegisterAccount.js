import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAccount } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.js";

function RegisterAccount() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerAccount(form);
      login(data.user, data.token);
      navigate("/register-store");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Create your account</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange}
          className="w-full border rounded px-3 py-2" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full border rounded px-3 py-2" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full border rounded px-3 py-2" required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange}
          className="w-full border rounded px-3 py-2" required />
        <button type="submit" className="w-full bg-indigo-600 text-white rounded py-2 hover:bg-indigo-700">
          Continue
        </button>
      </form>
    </div>
  );
}

export default RegisterAccount;