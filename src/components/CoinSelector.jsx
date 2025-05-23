function CoinSelector({ coins, selectedCoin, onSelect }) {
  return (
    <div className="flex space-x-2">
      {coins.map(coin => (
        <button
          key={coin}
          onClick={() => onSelect(coin)}
          className={`px-4 py-2 rounded-md ${
            selectedCoin === coin
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {coin.charAt(0).toUpperCase() + coin.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default CoinSelector 