import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const Dashboard = () => {
  const statsData = [
    { label: "Total Sales (HID 000)", value: "5000000 LL", change: "+2.5%", positive: true, color: "bg-green-500" },
    { label: "Total Sales (WID 000)", value: "1200000 LL", change: "+1.5%", positive: true, color: "bg-blue-500" },
    { label: "Total Sales (HID 000)", value: "900000 LL", change: "-1.2%", positive: false, color: "bg-orange-500" },
    { label: "Total Sales (Estimate/HID)", value: "1200000 LL", change: "+3.8%", positive: true, color: "bg-yellow-500" },
  ];

  const stockData = [
    { month: "Jan", sales: 4000, inventory: 2400 },
    { month: "Feb", sales: 3000, inventory: 1398 },
    { month: "Mar", sales: 2000, inventory: 9800 },
    { month: "Apr", sales: 2780, inventory: 3908 },
    { month: "May", sales: 1890, inventory: 4800 },
    { month: "Jun", sales: 2390, inventory: 3800 },
    { month: "Jul", sales: 3490, inventory: 4300 },
  ];

  const pieData = [
    { name: "New Customers (0-1 Months)", value: 45 },
    { name: "Existing Customers (0-1 Months)", value: 30 },
    { name: "Returning (0-1 Months)", value: 15 },
    { name: "VIP Customers (0-1 Months)", value: 10 },
  ];

  const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"];

  const trendData = [
    { date: "01 Jan", sales: 2000 },
    { date: "02 Jan", sales: 2800 },
    { date: "03 Jan", sales: 3500 },
    { date: "04 Jan", sales: 3200 },
    { date: "05 Jan", sales: 4100 },
    { date: "06 Jan", sales: 3800 },
    { date: "07 Jan", sales: 4500 },
    { date: "08 Jan", sales: 5200 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <span className="text-white text-lg">📊</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              {stat.positive ? (
                <>
                  <TrendingUp size={16} className="text-green-500" />
                  <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                </>
              ) : (
                <>
                  <TrendingDown size={16} className="text-red-500" />
                  <span className="text-red-500 text-sm font-medium">{stat.change}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Most Selling Product */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Most Selling Product</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold text-gray-900 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Distribution */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Stock Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3B82F6" name="Sales" radius={[8, 8, 0, 0]} />
              <Bar dataKey="inventory" fill="#10B981" name="Inventory" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Trend */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Sales Trend Over Time</h3>
            <p className="text-sm text-gray-500">10000/000/0.0.1</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">High Demand</p>
            <p className="text-sm font-semibold text-gray-900">+45% Today</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#D1FAE5"
              strokeWidth={20}
              dot={false}
              isAnimationActive={false}
              opacity={0.2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
