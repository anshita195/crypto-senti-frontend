function TopPosts({ posts, isLoading }) {
  if (isLoading) {
    return (
      <div className="text-gray-500">Loading posts...</div>
    )
  }

  if (!posts.length) {
    return (
      <div className="text-gray-500">No posts available</div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div
          key={post.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="font-semibold text-gray-900 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {post.text?.slice(0, 200)}
              {post.text?.length > 200 ? '...' : ''}
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>r/{post.subreddit}</span>
              <span>
                Score: {post.score} | Sentiment: {post.sentiment.toFixed(2)}
              </span>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}

export default TopPosts 