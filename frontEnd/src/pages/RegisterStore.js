import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStore } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.js";

function RegisterStore() {
  const [form, setForm] = useState({ storeName: "", slug: "" });
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerStore(form, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Set up your store</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="storeName" placeholder="Store name" value={form.storeName} onChange={handleChange}
          className="w-full border rounded px-3 py-2" required />
        <input name="slug" placeholder="store-url-slug" value={form.slug} onChange={handleChange}
          className="w-full border rounded px-3 py-2" required />
        <button type="submit" className="w-full bg-indigo-600 text-white rounded py-2 hover:bg-indigo-700">
          Create Store
        </button>
      </form>
    </div>
  );
}

export default RegisterStore;