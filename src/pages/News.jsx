import React, { useEffect, useState } from "react";
import "../styles/News.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NEWSAPI_KEY = "486b3a8076774361be518929a57881e0";

function News() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/everything?q=politics Nigeria&language=en&pageSize=12&apiKey=${NEWSAPI_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.articles?.length) {
          setArticles(data.articles);
        } else {
          setError("No political news available right now.");
        }
      } catch (err) {
        console.error("Error fetching political news:", err);
        setError("Could not load political news.");
      }
    };

    fetchNews();
  }, []);

  if (error) return <p className="center error">{error}</p>;
  if (!articles.length) return <p className="center">Loading political news...</p>;

  return (
    <div className="news-section">
      <div className="section-header">
        <h2>📰 World news</h2>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {articles.map((a, i) => (
          <SwiperSlide key={i}>
            <div className="news-card">
              {a.urlToImage ? (
                <img src={a.urlToImage} alt={a.title} className="news-img" />
              ) : (
                <div className="news-img-placeholder">No image</div>
              )}
              <h3>{a.title}</h3>
              <p>{a.description || "No description."}</p>
              <a href={a.url} target="_blank" rel="noreferrer">
                Read more →
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default News;
