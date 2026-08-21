import React from "react";
import { useAuth } from "../context/AuthContext.js";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800">Welcome{user ? `, ${user.name}` : ""}</h1>
      <p className="text-gray-500 mt-2">
        Merchant dashboard placeholder — products, orders, and the AI Analytics Assistant will live here.
      </p>
    </div>
  );
}

export default Dashboard;