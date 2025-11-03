export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=music OR entertainment OR football Nigeria&language=en&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch lifestyle news" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching lifestyle news" });
  }
}
