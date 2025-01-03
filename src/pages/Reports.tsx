import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart2, TrendingUp, Users } from "lucide-react";

export function Reports() {
  const [companies, setCompanies] = useState<any[]>([]);

  // Initialize dummy data in localStorage if not already set
  useEffect(() => {
    const storedCompanies = localStorage.getItem("companies");
    if (!storedCompanies) {
      const dummyData = [
        {
          id: 1,
          name: "Company A",
          lastCommunication: "2023-12-15",
          nextCommunication: "2024-01-10",
          communicationMethods: ["Email", "Call"],
        },
        {
          id: 2,
          name: "Company B",
          lastCommunication: "2023-12-20",
          nextCommunication: "2024-01-05",
          communicationMethods: ["Email", "Email"],
        },
        {
          id: 3,
          name: "Company C",
          lastCommunication: "2023-12-12",
          nextCommunication: "2024-01-15",
          communicationMethods: ["SMS", "Call", "Email"],
        },
        {
          id: 4,
          name: "Company D",
          lastCommunication: "2023-12-25",
          nextCommunication: "2024-01-20",
          communicationMethods: ["Email", "Call", "Email"],
        },
        {
          id: 5,
          name: "Company E",
          lastCommunication: "2023-11-30",
          nextCommunication: "2024-01-05",
          communicationMethods: ["SMS", "Call"],
        },
      ];
      localStorage.setItem("companies", JSON.stringify(dummyData));
      setCompanies(dummyData);
    } else {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  // Calculate Communication Frequency
  const calculateCommunicationFrequency = (days: number) => {
    const today = new Date();
    const dateRange = new Date(today.setDate(today.getDate() - days));
    return companies.filter((company) => new Date(company.lastCommunication) >= dateRange).length;
  };

  const communicationFrequency = calculateCommunicationFrequency(30);

  // Calculate Engagement Rate
  const calculateEngagementRate = () => {
    const methodCount = companies.reduce((acc, company) => {
      company.communicationMethods.forEach((method) => {
        acc[method] = (acc[method] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    return methodCount;
  };

  const engagementRate = calculateEngagementRate();

  // Prepare data for charts
  const engagementRateData = Object.entries(engagementRate).map(([method, count]) => ({
    name: method,
    value: count,
  }));

  const topPerformingCompanies = companies
    .map((company) => ({
      ...company,
      communicationCount: companies.filter((comp) => comp.name === company.name).length,
    }))
    .sort((a, b) => b.communicationCount - a.communicationCount)
    .slice(0, 5);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Communication Frequency Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Communication Frequency</h2>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </div>
          </div>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: "Last 30 days", count: communicationFrequency }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Rate Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Engagement Rate</h2>
              <p className="text-sm text-gray-500">By communication type</p>
            </div>
          </div>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={engagementRateData} dataKey="value" nameKey="name" outerRadius={60} fill="#8884d8" label>
                  {engagementRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Companies Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Top Performing Companies</h2>
              <p className="text-sm text-gray-500">Based on communication performance</p>
            </div>
          </div>
          <div className="mt-4 h-48">
            <ul className="space-y-2">
              {topPerformingCompanies.map((company) => (
                <li key={company.id} className="text-sm text-gray-600">
                  {company.name}: {company.communicationCount} communications
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
