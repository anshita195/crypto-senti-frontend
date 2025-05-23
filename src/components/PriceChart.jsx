import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

function PriceChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-gray-500">Loading chart data...</div>
      </div>
    )
  }

  const chartData = data.map(point => ({
    timestamp: new Date(point.timestamp).toLocaleTimeString(),
    price: point.price,
    sentiment: point.sentiment.smoothedScore
  }))

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#82ca9d" 
            domain={[-1, 1]}
          />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            name="Price (INR)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="sentiment"
            stroke="#82ca9d"
            name="Sentiment Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart 