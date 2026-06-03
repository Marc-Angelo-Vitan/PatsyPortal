/* eslint-disable @typescript-eslint/no-explicit-any */
// app/main/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Colors } from "../../../styles/colors";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("week");
  const [isLoading, setIsLoading] = useState(true);

  // Load data only once when component mounts
  useEffect(() => {
    // Simulate data loading - replace with actual API call
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Stats Data
  const stats = {
    totalSales: 48250,
    totalSalesChange: "+12.5%",
    totalOrders: 1248,
    totalOrdersChange: "+8.2%",
    loyalCustomers: 342,
    loyalCustomersChange: "+15.3%",
    averageOrder: 38.65,
    averageOrderChange: "+4.1%",
  };

  // Campaign Stats
  const campaignStats = {
    activePromotions: 3,
    activeDiscounts: 4,
    totalRedemptions: 2200,
    redemptionRate: 18.5,
  };

  // Barista Stats
  const baristaStats = {
    totalBaristas: 8,
    activeBaristas: 6,
    onLeave: 1,
    topPerformer: "Olivia Kim",
  };

  // Sales Data for Line Chart
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [3250, 4120, 3880, 4950, 6120, 8750, 7980],
        borderColor: Colors.primary,
        backgroundColor: "rgba(15, 58, 49, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Top Products Data for Bar Chart
  const topProductsData = {
    labels: [
      "Espresso",
      "Latte",
      "Cappuccino",
      "Americano",
      "Mocha",
      "Cold Brew",
    ],
    datasets: [
      {
        label: "Units Sold",
        data: [245, 189, 156, 134, 112, 98],
        backgroundColor: Colors.primary,
        borderRadius: 8,
      },
    ],
  };

  // Customer Loyalty Data for Donut Chart
  const loyaltyData = {
    labels: ["Gold Members", "Silver Members", "Bronze Members", "Regular"],
    datasets: [
      {
        data: [48, 95, 126, 73],
        backgroundColor: [
          "#F8D576", // Gold
          "#C0C0C0", // Silver
          "#CD7F32", // Bronze
          Colors.primary,
        ],
        borderWidth: 0,
      },
    ],
  };

  // Campaign Performance Data
  const campaignPerformanceData = {
    labels: ["Happy Hour", "Student", "Weekend Brew", "Loyalty"],
    datasets: [
      {
        label: "Redemptions",
        data: [342, 456, 187, 892],
        backgroundColor: Colors.primary,
        borderRadius: 8,
      },
    ],
  };

  // Barista Performance Data
  const baristaPerformanceData = {
    labels: ["Emma W.", "Liam C.", "Sophia R.", "Olivia K.", "Mason L.", "Ethan J."],
    datasets: [
      {
        label: "Orders Completed",
        data: [156, 142, 98, 189, 87, 112],
        backgroundColor: Colors.secondary || "#D4A843",
        borderRadius: 8,
      },
    ],
  };

  // Recent Transactions
  const recentTransactions = [
    {
      id: 1,
      customer: "John Smith",
      amount: 45.5,
      items: 3,
      status: "completed",
      time: "10:30 AM",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      amount: 28.75,
      items: 2,
      status: "completed",
      time: "10:15 AM",
    },
    {
      id: 3,
      customer: "Mike Wilson",
      amount: 67.2,
      items: 4,
      status: "pending",
      time: "10:00 AM",
    },
    {
      id: 4,
      customer: "Emma Davis",
      amount: 34.9,
      items: 2,
      status: "completed",
      time: "9:45 AM",
    },
    {
      id: 5,
      customer: "James Brown",
      amount: 52.3,
      items: 3,
      status: "completed",
      time: "9:30 AM",
    },
  ];

  // Recent Campaign Activity
  const recentCampaignActivity = [
    { id: 1, name: "Student Discount", redemptions: 12, status: "Active", time: "5 mins ago" },
    { id: 2, name: "Happy Hour Special", redemptions: 8, status: "Active", time: "15 mins ago" },
    { id: 3, name: "Flash Sale", redemptions: 23, status: "Active", time: "1 hour ago" },
    { id: 4, name: "Referral Discount", redemptions: 2, status: "Scheduled", time: "3 hours ago" },
  ];

  // Chart Options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  // Show loading only on first visit
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: Colors.primary }}
          ></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: Colors.primary }}>
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
      </div>

      {/* Stats Grid - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              {stats.totalSalesChange}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            ${stats.totalSales.toLocaleString()}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Total Sales</p>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              {stats.totalOrdersChange}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {stats.totalOrders.toLocaleString()}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Total Orders</p>
        </div>

        {/* Loyal Customers Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              {stats.loyalCustomersChange}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {stats.loyalCustomers.toLocaleString()}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Loyalty Members</p>
        </div>

        {/* Average Order Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              {stats.averageOrderChange}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            ${stats.averageOrder}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Average Order Value</p>
        </div>
      </div>

      {/* Stats Grid - Row 2 (Campaign & Barista Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Promotions Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              Active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {campaignStats.activePromotions}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Active Promotions</p>
        </div>

        {/* Active Discounts Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-100 rounded-lg">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm0 8h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2z" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              Active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {campaignStats.activeDiscounts}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Active Discount Codes</p>
        </div>

        {/* Total Baristas Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              {baristaStats.activeBaristas} Active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {baristaStats.totalBaristas}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Total Baristas</p>
        </div>

        {/* Redemptions Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
              {campaignStats.redemptionRate}% Rate
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {campaignStats.totalRedemptions.toLocaleString()}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Total Redemptions</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link
          href="/main/management/product"
          className="rounded-xl shadow-sm p-4 text-white hover:shadow-lg transition text-center"
          style={{ backgroundColor: Colors.primary }}
        >
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-sm font-medium">Add Product</p>
        </Link>

        <Link
          href="/main/management/member"
          className="rounded-xl shadow-sm p-4 text-white hover:shadow-lg transition text-center"
          style={{ backgroundColor: Colors.secondary || "#D4A843" }}
        >
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-sm font-medium">Add Member</p>
        </Link>

        <Link
          href="/main/management/barista"
          className="rounded-xl shadow-sm p-4 text-white hover:shadow-lg transition text-center"
          style={{ backgroundColor: Colors.info || "#3498db" }}
        >
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-sm font-medium">Manage Baristas</p>
        </Link>

        <Link
          href="/main/campaign/promo"
          className="rounded-xl shadow-sm p-4 text-white hover:shadow-lg transition text-center"
          style={{ backgroundColor: "#F59E0B" }}
        >
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <p className="text-sm font-medium">Create Promo</p>
        </Link>

        <Link
          href="/main/campaign/discount"
          className="rounded-xl shadow-sm p-4 text-white hover:shadow-lg transition text-center"
          style={{ backgroundColor: "#8B5CF6" }}
        >
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm0 8h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2z" />
          </svg>
          <p className="text-sm font-medium">Create Discount</p>
        </Link>
      </div>

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Sales Trend</h3>
            <div className="flex gap-2">
              <button className="text-xs px-2 py-1 bg-gray-100 rounded">Daily</button>
              <button className="text-xs px-2 py-1 text-white rounded" style={{ backgroundColor: Colors.primary }}>Weekly</button>
              <button className="text-xs px-2 py-1 bg-gray-100 rounded">Monthly</button>
            </div>
          </div>
          <div className="h-80">
            <Line data={salesData} options={lineOptions} />
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
          <div className="h-80">
            <Bar data={topProductsData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Charts Grid - Row 2 (Campaign & Barista Performance) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Campaign Performance</h3>
            <Link href="/main/management/campaigns" className="text-sm hover:underline" style={{ color: Colors.primary }}>
              View All →
            </Link>
          </div>
          <div className="h-80">
            <Bar data={campaignPerformanceData} options={barOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Active Promotions</p>
              <p className="text-xl font-bold" style={{ color: Colors.primary }}>{campaignStats.activePromotions}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Redemption Rate</p>
              <p className="text-xl font-bold text-purple-600">{campaignStats.redemptionRate}%</p>
            </div>
          </div>
        </div>

        {/* Barista Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Barista Performance</h3>
            <Link href="/main/management/barista" className="text-sm hover:underline" style={{ color: Colors.primary }}>
              View All →
            </Link>
          </div>
          <div className="h-80">
            <Bar data={baristaPerformanceData} options={barOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Top Performer</p>
              <p className="text-md font-bold text-amber-600">{baristaStats.topPerformer}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-500">On Leave</p>
              <p className="text-xl font-bold text-yellow-600">{baristaStats.onLeave}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Loyalty Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loyalty Members</h3>
          <div className="h-64">
            <Doughnut data={loyaltyData} options={doughnutOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F8D576" }}></div>
              <span>Gold: 48</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span>Silver: 95</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#CD7F32" }}></div>
              <span>Bronze: 126</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: Colors.primary }}></div>
              <span>Regular: 73</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <Link href="/main/management/sales" className="text-sm hover:underline" style={{ color: Colors.primary }}>
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="py-3 text-sm font-medium text-gray-800">{transaction.customer}</td>
                    <td className="py-3 text-sm text-gray-600">{transaction.items} items</td>
                    <td className="py-3 text-sm font-semibold text-gray-800">${transaction.amount}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{transaction.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Campaign Activity Feed */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Campaign Activity</h3>
          <Link href="/main/management/campaigns" className="text-sm hover:underline" style={{ color: Colors.primary }}>
            Manage Campaigns →
          </Link>
        </div>
        <div className="space-y-3">
          {recentCampaignActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.status === "Active" ? "bg-green-500" : "bg-yellow-500"}`} />
                <div>
                  <p className="text-sm font-medium text-gray-800">{activity.name}</p>
                  <p className="text-xs text-gray-500">{activity.redemptions} redemptions</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-1 rounded-full ${activity.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {activity.status}
                </span>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}