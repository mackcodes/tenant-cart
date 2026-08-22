import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.js";

function Dashboard() {
  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex min-h-[76px] w-[calc(100%-40px)] max-w-[1180px] items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold">
              Tenant<span className="text-clay">Cart</span>
            </h1>

            <p className="mt-1 text-xs text-mutedInk">
              Merchant dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-mutedInk sm:inline">
              {user?.name || "Merchant"}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="border border-ink bg-transparent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[calc(100%-40px)] max-w-[1180px] py-12">
        <section className="border border-line bg-cream p-8">
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-clay">
            Welcome back
          </p>

          <h2 className="mt-3 font-serif text-4xl font-normal">
            Hello, {user?.name || "Merchant"}.
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-mutedInk">
            Manage your products, track your orders, and understand your store
            performance from one workspace.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <DashboardCard
            title="Products"
            description="Add and manage your store products."
          />

          <DashboardCard
            title="Orders"
            description="Review and update customer orders."
          />

          <DashboardCard
            title="Analytics"
            description="Explore your store performance."
          />
        </section>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  description,
}) {
  return (
    <article className="border border-line bg-white p-6">
      <h3 className="font-serif text-2xl font-normal">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-mutedInk">
        {description}
      </p>

      <button
        type="button"
        className="mt-5 text-sm font-bold text-clay hover:underline"
      >
        Open {title.toLowerCase()} →
      </button>
    </article>
  );
}

export default Dashboard;