import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

function MLDashboard() {
  const [testText, setTestText] = useState('')
  const [evaluationResult, setEvaluationResult] = useState(null)

  const { data: performanceData, isLoading: performanceLoading } = useQuery(
    'mlPerformance',
    async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/ml/performance`)
      return response.data
    },
    {
      refetchInterval: 300000, // Refetch every 5 minutes
      staleTime: 60000
    }
  )

  const { data: correlationData, isLoading: correlationLoading } = useQuery(
    'correlationAnalysis',
    async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/ml/correlation`)
      return response.data
    },
    {
      refetchInterval: 300000,
      staleTime: 60000
    }
  )

  const handleEvaluateText = async () => {
    if (!testText.trim()) return

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/ml/evaluate`, {
        text: testText
      })
      setEvaluationResult(response.data)
    } catch (error) {
      console.error('Error evaluating text:', error)
    }
  }

  const modelComparisonData = performanceData?.modelComparison ? [
    {
      model: 'Baseline',
      accuracy: (performanceData.modelComparison.baseline.accuracy * 100).toFixed(1)
    },
    {
      model: 'ML',
      accuracy: (performanceData.modelComparison.ml.accuracy * 100).toFixed(1)
    },
    {
      model: 'Hybrid',
      accuracy: (performanceData.modelComparison.hybrid.accuracy * 100).toFixed(1)
    }
  ] : []

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ML Model Performance</h2>
        
        {performanceLoading ? (
          <div className="text-gray-500">Loading performance data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Model Accuracy Comparison</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modelComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="accuracy" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Correlation Analysis</h3>
              {correlationLoading ? (
                <div className="text-gray-500">Loading correlation data...</div>
              ) : correlationData ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {correlationData.correlation.toFixed(3)}
                    </div>
                    <div className="text-sm text-blue-700">
                      Sentiment-Price Correlation
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div>Interpretation: {correlationData.interpretation}</div>
                    <div>Data Points: {correlationData.dataPoints}</div>
                    <div>Time Range: {correlationData.timeRange} hours</div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">No correlation data available</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Test Sentiment Analysis</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to analyze:
            </label>
            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter crypto-related text to test sentiment analysis..."
            />
          </div>
          
          <button
            onClick={handleEvaluateText}
            disabled={!testText.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Evaluate Sentiment
          </button>
        </div>

        {evaluationResult && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Analysis Results:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">Baseline Score:</div>
                <div className="text-lg font-bold">{evaluationResult.baseline.toFixed(3)}</div>
              </div>
              <div>
                <div className="font-medium">ML Score:</div>
                <div className="text-lg font-bold">{evaluationResult.ml.toFixed(3)}</div>
              </div>
              <div>
                <div className="font-medium">Hybrid Score:</div>
                <div className="text-lg font-bold">{evaluationResult.hybrid.toFixed(3)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {performanceData?.recommendations && performanceData.recommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {performanceData.recommendations.map((rec, index) => (
              <li key={index} className="flex items-center text-green-700">
                <span className="mr-2">✅</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MLDashboard 