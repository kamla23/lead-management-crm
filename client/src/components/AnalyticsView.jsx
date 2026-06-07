import { BarChart3, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./AnalyticsView.css";

function AnalyticsView({ stats }) {
  const chartData = [
    { name: "New", value: stats.New || stats.new || 0, color: "#2563eb" },
    {
      name: "Contacted",
      value: stats.Contacted || stats.contacted || 0,
      color: "#f59e0b",
    },
    {
      name: "Qualified",
      value: stats.Qualified || stats.qualified || 0,
      color: "#7c3aed",
    },
    {
      name: "Converted",
      value: stats.Converted || stats.converted || 0,
      color: "#059669",
    },
    { name: "Lost", value: stats.Lost || stats.lost || 0, color: "#ef4444" },
  ];

  const totalLeads = stats.total || 0;
  const convertedLeads = stats.Converted || 0;
  const conversionRate = totalLeads
    ? ((convertedLeads / totalLeads) * 100).toFixed(1)
    : "0.0";

  const activeFunnelCount =
    (stats.New || 0) + (stats.Contacted || 0) + (stats.Qualified || 0);
  const activeFunnelPercent = totalLeads
    ? ((activeFunnelCount / totalLeads) * 100).toFixed(0)
    : 0;
  const lossRatioPercent = totalLeads
    ? (((stats.Lost || 0) / totalLeads) * 100).toFixed(0)
    : 0;

  return (
    <div className="analytics-page">
      <header className="head">
        <h1>Lead Analytics & Insights</h1>
      </header>

      <div className="analytics-container">
        <div className="analytics-card main-chart-card">
          <div className="card-title-wrapper">
            <BarChart3 className="title-icon" />
            <h3>Lead Pipeline Status Distribution</h3>
          </div>

          <div className="conversion-highlight">
            <div className="conversion-rate-box">
              <TrendingUp className="highlight-icon" />
              <h2>{conversionRate}%</h2>
              <p>Overall Conversion Rate</p>
            </div>
            <div className="total-meta">
              <span>Total Leads:</span> <strong>{totalLeads}</strong>
            </div>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 13 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
                  contentStyle={{
                    background: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    padding: "8px 12px",
                    fontSize: "13px",
                  }}
                  itemStyle={{ color: "#111827", padding: "2px 0" }}
                  labelStyle={{
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "4px",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={45}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-side-grid">
          <div className="analytics-card mini-card">
            <h4>Pipeline Health</h4>

            <div className="progress-group">
              <div className="progress-label">
                <span>Active Funnel</span>
                <span>{activeFunnelPercent}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill color-blue"
                  style={{ width: `${activeFunnelPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="progress-group pipeline-margin-top">
              <div className="progress-label">
                <span>Loss Ratio</span>
                <span>{lossRatioPercent}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill color-red"
                  style={{ width: `${lossRatioPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsView;
