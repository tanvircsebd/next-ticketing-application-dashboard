"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt, faCheckCircle, faExclamationCircle, faChartBar, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import DashboardChart from "../(components)/DashboardChart";

const fetchStats = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets/stats", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch stats");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTickets: 0,
    solvedTickets: 0,
    activeTickets: 0,
    solvedPercentage: 0,
    categoryCounts: {},
    recentTickets: [],
  });

  useEffect(() => {
    const loadStats = async () => {
      const fetchedStats = await fetchStats();
      if (fetchedStats) setStats(fetchedStats);
    };
    loadStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Ticket Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Tickets Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faTicketAlt} className="text-3xl text-gray-700 mr-4" />
            <h2 className="text-xl font-semibold text-gray-700">Total Tickets</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalTickets}</p>
        </div>

        {/* Solved Tickets Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="text-3xl text-green-500 mr-4" />
            <h2 className="text-xl font-semibold text-gray-700">Solved Tickets</h2>
          </div>
          <p className="text-3xl font-bold text-green-500">{stats.solvedTickets}</p>
        </div>

        {/* Active Tickets Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faExclamationCircle} className="text-3xl text-yellow-500 mr-4" />
            <h2 className="text-xl font-semibold text-gray-700">Active Tickets</h2>
          </div>
          <p className="text-3xl font-bold text-yellow-500">{stats.activeTickets}</p>
        </div>

        {/* Solved Percentage Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faChartBar} className="text-3xl text-blue-500 mr-4" />
            <h2 className="text-xl font-semibold text-gray-700">Solved Percentage</h2>
          </div>
          <p className="text-3xl font-bold text-blue-500">{stats.solvedPercentage}%</p>
        </div>

        {/* Tickets by Category Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faBoxOpen} className="text-3xl text-gray-700 mr-4" />
            <h2 className="text-xl font-semibold text-gray-700">Tickets by Category</h2>
          </div>
          <ul className="space-y-2">
            {Object.entries(stats.categoryCounts || {}).map(([category, count]) => (
              <li key={category} className="text-gray-600">
                <span className="font-semibold">{category}:</span> {count}
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Tickets Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faTicketAlt} className="text-3xl text-gray-700 mr-4" />
            <h2 className="text-xl font-semibold text-gray-700">Recent Tickets</h2>
          </div>
          <ul className="space-y-2">
            {stats.recentTickets?.map((ticket) => (
              <li key={ticket._id} className="text-gray-600">
                <span className="font-semibold">{ticket.title}</span> -{" "}
                <span className="text-sm text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Category Breakdown Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between col-span-full lg:col-span-2">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faChartBar} className="text-3xl text-blue-500 mr-4" />
            <h2 className="text-xl font-semibold text-gray-700">Category Breakdown</h2>
          </div>
          <DashboardChart stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
