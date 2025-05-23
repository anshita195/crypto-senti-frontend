import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import CoinSelector from '../components/CoinSelector'
import PriceChart from '../components/PriceChart'
import TopPosts from '../components/TopPosts'

const SUPPORTED_COINS = ['bitcoin', 'ethereum', 'dogecoin']

function Dashboard() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin')
  const [timeRange, setTimeRange] = useState(24)

  const { data, isLoading, error } = useQuery(
    ['coinData', selectedCoin, timeRange],
    async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/coins/${selectedCoin}/timeseries`,
        { params: { hours: timeRange } }
      )
      return response.data
    },
    {
      refetchInterval: 60000, // Refetch every minute
      staleTime: 30000 // Consider data stale after 30 seconds
    }
  )

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading data: {error.message}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Crypto Sentiment Dashboard</h1>
        <CoinSelector
          coins={SUPPORTED_COINS}
          selectedCoin={selectedCoin}
          onSelect={setSelectedCoin}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <PriceChart
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Positive Posts</h2>
          <TopPosts
            posts={data?.data?.[0]?.topPosts?.filter(post => post.sentiment > 0) || []}
            isLoading={isLoading}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Negative Posts</h2>
          <TopPosts
            posts={data?.data?.[0]?.topPosts?.filter(post => post.sentiment < 0) || []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard 