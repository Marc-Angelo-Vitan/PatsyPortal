// app/main/management/campaigns/page.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Colors } from '../../../styles/colors';

export default function CampaignsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'promotions' | 'discounts'>('promotions');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const promotionCards = [
    {
      id: 1,
      title: 'Happy Hour Special',
      description: '50% off on all coffee drinks from 3 PM to 5 PM',
      status: 'Active',
      type: 'Time-based',
      discount: '50% OFF',
      validUntil: '2024-12-31',
      usageCount: 342,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#F59E0B',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      href: '/main/campaign/promo',
    },
    {
      id: 2,
      title: 'Weekend Brew Fest',
      description: 'Buy 1 Get 1 Free on all specialty drinks on weekends',
      status: 'Active',
      type: 'BOGO',
      discount: 'BOGO Free',
      validUntil: '2024-05-30',
      usageCount: 187,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: Colors.primary,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      href: '/main/campaign/promo',
    },
    {
      id: 3,
      title: 'New Customer Welcome',
      description: 'First-time customers get 20% off their entire order',
      status: 'Active',
      type: 'First Order',
      discount: '20% OFF',
      validUntil: '2024-12-31',
      usageCount: 89,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      color: '#3B82F6',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      href: '/main/campaign/promo',
    },
    {
      id: 4,
      title: 'Morning Rush',
      description: 'Free pastry with any large coffee purchase before 10 AM',
      status: 'Scheduled',
      type: 'Bundle',
      discount: 'Free Pastry',
      validUntil: '2024-04-15',
      usageCount: 0,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      href: '/main/campaign/promo',
    },
  ];

  const discountCards = [
    {
      id: 1,
      title: 'Student Discount',
      description: '15% off for students with valid ID',
      code: 'STUDENT15',
      status: 'Active',
      type: 'Percentage',
      value: '15%',
      minPurchase: '$0',
      validUntil: '2024-12-31',
      usageCount: 456,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: Colors.primary,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      href: '/main/campaign/discount',
    },
    {
      id: 2,
      title: 'Loyalty Member',
      description: '10% off for loyalty program members',
      code: 'LOYALTY10',
      status: 'Active',
      type: 'Percentage',
      value: '10%',
      minPurchase: '$10',
      validUntil: '2024-12-31',
      usageCount: 892,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: '#F59E0B',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      href: '/main/campaign/discount',
    },
    {
      id: 3,
      title: 'Flash Sale',
      description: '$5 off on orders above $25',
      code: 'FLASH5',
      status: 'Active',
      type: 'Fixed Amount',
      value: '$5 OFF',
      minPurchase: '$25',
      validUntil: '2024-04-10',
      usageCount: 234,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: '#EF4444',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      href: '/main/campaign/discount',
    },
    {
      id: 4,
      title: 'Referral Discount',
      description: 'Refer a friend and both get $10 off',
      code: 'REFER10',
      status: 'Scheduled',
      type: 'Referral',
      value: '$10 OFF',
      minPurchase: '$15',
      validUntil: '2024-06-30',
      usageCount: 0,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      href: '/main/campaign/discount',
    },
  ];

  const stats = [
    { label: 'Active Promotions', value: '3', change: '+2 this month', color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Active Discounts', value: '3', change: '+1 this month', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Total Redemptions', value: '2,200', change: '+28% vs last month', color: 'text-amber-600', bgColor: 'bg-amber-100' },
    { label: 'Conversion Rate', value: '18.5%', change: '+5.2%', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: Colors.primary }}>
          Campaign Management
        </h1>
        <p className="text-gray-500 mt-1">
          Create and manage promotions and discounts to boost sales and customer loyalty
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <svg className={`w-5 h-5 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('promotions')}
            className={`pb-4 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'promotions'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={activeTab === 'promotions' ? { color: Colors.primary, borderColor: Colors.primary } : {}}
          >
            🎉 Promotions
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {promotionCards.filter(p => p.status === 'Active').length} Active
            </span>
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`pb-4 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'discounts'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={activeTab === 'discounts' ? { color: Colors.primary, borderColor: Colors.primary } : {}}
          >
            🏷️ Discount Codes
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {discountCards.filter(d => d.status === 'Active').length} Active
            </span>
          </button>
        </nav>
      </div>

      {/* Create Campaign Buttons */}
      <div className="flex justify-end gap-3">
        {activeTab === 'promotions' ? (
          <Link
            href="/main/campaign/promo"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-tertiary transition flex items-center gap-2 text-sm font-medium shadow-sm"
            style={{ backgroundColor: Colors.primary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Promotion
          </Link>
        ) : (
          <Link
            href="/main/campaign/discount"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-tertiary transition flex items-center gap-2 text-sm font-medium shadow-sm"
            style={{ backgroundColor: Colors.primary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Discount
          </Link>
        )}
      </div>

      {/* Campaign Cards Grid */}
      {activeTab === 'promotions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {promotionCards.map((promo) => (
            <Link
              key={promo.id}
              href={promo.href}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`p-6 ${promo.bgColor}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={promo.iconColor}>
                    {promo.icon}
                  </div>
                  <div className="flex gap-2">
                    <span 
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        promo.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {promo.status}
                    </span>
                    <span className="rounded-full bg-white/60 px-2.5 py-1 text-xs font-medium text-gray-600">
                      {promo.type}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {promo.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {promo.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold" style={{ color: promo.color }}>
                      {promo.discount}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Valid until</p>
                    <p className="text-sm font-medium text-gray-700">{promo.validUntil}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm text-gray-600">{promo.usageCount} redemptions</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'discounts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {discountCards.map((discount) => (
            <Link
              key={discount.id}
              href={discount.href}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`p-6 ${discount.bgColor}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={discount.iconColor}>
                    {discount.icon}
                  </div>
                  <div className="flex gap-2">
                    <span 
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        discount.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {discount.status}
                    </span>
                    <span className="rounded-full bg-white/60 px-2.5 py-1 text-xs font-medium text-gray-600">
                      {discount.type}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {discount.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {discount.description}
                </p>
                <div className="bg-white/50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Discount Code</p>
                      <p className="text-lg font-mono font-bold tracking-wider" style={{ color: discount.color }}>
                        {discount.code}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(discount.code);
                        alert('Code copied to clipboard!');
                      }}
                      className="p-1.5 bg-white rounded-lg shadow-sm hover:shadow transition"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold" style={{ color: discount.color }}>
                      {discount.value}
                    </span>
                    {discount.minPurchase !== '$0' && (
                      <span className="text-xs text-gray-500">min. {discount.minPurchase}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Valid until</p>
                    <p className="text-sm font-medium text-gray-700">{discount.validUntil}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm text-gray-600">{discount.usageCount} used</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Performance Overview Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Campaign Performance</h2>
            <p className="text-xs text-gray-500 mt-0.5">Top performing promotions and discounts</p>
          </div>
          <button className="text-sm text-primary hover:underline" style={{ color: Colors.primary }}>
            View Analytics →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Redemptions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Revenue Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Conversion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Happy Hour Special', type: 'Time-based', redemptions: 342, revenue: '$4,278', conversion: '24%', status: 'Active' },
                { name: 'Student Discount', type: 'Percentage', redemptions: 456, revenue: '$5,124', conversion: '18%', status: 'Active' },
                { name: 'Weekend Brew Fest', type: 'BOGO', redemptions: 187, revenue: '$2,890', conversion: '32%', status: 'Active' },
                { name: 'Loyalty Member', type: 'Percentage', redemptions: 892, revenue: '$8,936', conversion: '45%', status: 'Active' },
                { name: 'New Customer Welcome', type: 'First Order', redemptions: 89, revenue: '$1,245', conversion: '12%', status: 'Active' },
              ].map((campaign, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{campaign.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{campaign.type}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-800">{campaign.redemptions}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-green-600">{campaign.revenue}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: campaign.conversion, backgroundColor: Colors.primary }} />
                      </div>
                      <span className="text-xs text-gray-600">{campaign.conversion}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/main/campaign/promo"
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Manage Promotions</p>
              <p className="text-xs text-green-600">Create and edit promotional offers</p>
            </div>
          </div>
        </Link>
        <Link
          href="/main/campaign/discount"
          className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
              <span className="text-xl">🏷️</span>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Manage Discounts</p>
              <p className="text-xs text-amber-600">Create and edit discount codes</p>
            </div>
          </div>
        </Link>
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <p className="text-sm font-medium text-purple-800">Analytics</p>
              <p className="text-xs text-purple-600">View campaign performance metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}