import React from "react";
import "../styles/Dashboard.css";
import News from "./News";
import Weather from "./Weather";
import Lifestyle from "./Lifestyle";
import Crypto from "./Crypto"; // ✅ import crypto

function Dashboard() {
  return (
    <div className="dashboard">
      <section>
        <News />
      </section>
      <section>
        <Weather />
      </section>
      <section>
        <Lifestyle />
      </section>
      <section>
        <Crypto /> {/* ✅ crypto section */}
      </section>
    </div>
  );
}

export default Dashboard;
