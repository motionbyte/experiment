import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { setSeoHead } from "../../seo/setSeoHead";

export const NotFoundPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    setSeoHead({
      title: "Page not found — The Lost Symbols",
      description:
        "The page you requested is not on thelostsymbols.in. Return to the home page or use the menu.",
      canonicalPath: location.pathname || "/",
      robots: "noindex, nofollow",
    });
  }, [location.pathname]);

  return (
    <div style={{ padding: "40px 18px", maxWidth: 900, margin: "0 auto" }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go home</Link>
    </div>
  );
};

