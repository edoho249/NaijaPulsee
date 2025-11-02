import React, { useEffect, useState } from "react";

const Crypto = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    const proxy = "https://corsproxy.io/?";
    const geckoAPI =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin";

    try {
      const res = await fetch(proxy + geckoAPI);
      if (!res.ok) throw new Error("CoinGecko failed");
      const data = await res.json();
      setCoins(data);
      console.log("✅ Fetched from CoinGecko");
    } catch (error) {
      console.warn("⚠️ CoinGecko failed, switching to CoinCap...");
      fetchCoinCap();
    }
  };

  const fetchCoinCap = async () => {
    try {
      const res = await fetch("https://api.coincap.io/v2/assets?limit=3");
      const data = await res.json();
      const formatted = data.data.map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        current_price: parseFloat(coin.priceUsd).toFixed(2),
        market_cap: parseFloat(coin.marketCapUsd).toLocaleString(),
        volume: parseFloat(coin.volumeUsd24Hr).toLocaleString(),
        rank: coin.rank,
        change: parseFloat(coin.changePercent24Hr).toFixed(2),
        image: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`,
      }));
      setCoins(formatted);
      console.log("✅ Fetched from CoinCap");
    } catch (err) {
      console.error("❌ Both sources failed:", err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return fetchCoins();

    const proxy = "https://corsproxy.io/?";
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${search.toLowerCase()}`;
    try {
      const res = await fetch(proxy + url);
      if (!res.ok) throw new Error("Coin not found");
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      alert("Coin not found. Try Bitcoin, Ethereum, Dogecoin, etc.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        color: "#fff",
        background: "#0d0d0d",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#1db954", marginBottom: "20px" }}>💰 Crypto Tracker</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search coin (e.g. bitcoin)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #333",
            width: "220px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#1db954",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {coins.map((coin) => (
          <div
            key={coin.id}
            style={{
              background: "#1a1a1a",
              borderRadius: "10px",
              padding: "20px",
              width: "250px",
              boxShadow: "0 0 15px rgba(255,255,255,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={coin.image}
              alt={coin.name}
              style={{ width: "60px", height: "60px", marginBottom: "10px" }}
            />
            <h3 style={{ marginBottom: "5px" }}>
              {coin.name} <span style={{ color: "#aaa" }}>({coin.symbol})</span>
            </h3>
            {coin.rank && <p>Rank: #{coin.rank}</p>}
            <p style={{ fontWeight: "bold", color: "#1db954" }}>
              💲 {coin.current_price}
            </p>
            {coin.market_cap && (
              <p>Market Cap: ${Number(coin.market_cap).toLocaleString()}</p>
            )}
            {coin.volume && (
              <p>Volume (24h): ${Number(coin.volume).toLocaleString()}</p>
            )}
            {coin.change && (
              <p
                style={{
                  color: coin.change >= 0 ? "#00ff88" : "#ff4444",
                  fontWeight: "bold",
                }}
              >
                {coin.change >= 0 ? "▲" : "▼"} {coin.change}% (24h)
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crypto;
