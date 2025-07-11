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

  // Collect all posts from all timestamps and remove duplicates
  const allPosts = data?.data?.flatMap(point => point.topPosts || []) || []
  const uniquePosts = Array.from(
    new Map(allPosts.map(post => [post.id, post])).values()
  )
  
  // Sort posts by absolute sentiment score and then by score
  const sortedPosts = [...uniquePosts].sort((a, b) => {
    // First sort by absolute sentiment (strongest sentiment first)
    const sentimentDiff = Math.abs(b.sentiment) - Math.abs(a.sentiment)
    if (sentimentDiff !== 0) return sentimentDiff
    // If sentiments are equal in magnitude, sort by score
    return b.score - a.score
  })

  // Split into positive and negative posts
  const positivePosts = sortedPosts.filter(post => post.sentiment > 0);
  const negativePosts = sortedPosts.filter(post => post.sentiment < 0);

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
            posts={positivePosts}
            isLoading={isLoading}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Negative Posts</h2>
          <TopPosts
            posts={negativePosts}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard 