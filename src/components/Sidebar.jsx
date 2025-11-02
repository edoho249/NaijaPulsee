import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "News", path: "/news" },
    { name: "Weather", path: "/weather" },
    { name: "Lifestyle", path: "/lifestyle" },
  ];

  return (
    <>
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        <Menu size={24} />
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="logo">NaijaPulse</h2>
        <nav>
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
