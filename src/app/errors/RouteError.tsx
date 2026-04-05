import React, { useEffect } from "react";
import { isRouteErrorResponse, useLocation, useRouteError } from "react-router-dom";
import { setSeoHead } from "../../seo/setSeoHead";

export const RouteError: React.FC = () => {
  const err = useRouteError();
  const location = useLocation();

  useEffect(() => {
    setSeoHead({
      title: "Error — The Lost Symbols",
      description: "Something went wrong loading this page. Try again or return to the home page.",
      canonicalPath: location.pathname || "/",
      robots: "noindex, nofollow",
    });
  }, [location.pathname]);

  const message = (() => {
    if (isRouteErrorResponse(err)) {
      return `${err.status} ${err.statusText}`;
    }
    if (err instanceof Error) return err.message;
    return "Unknown error";
  })();

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0, color: "var(--text-h)" }}>Something broke</h1>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 12,
          background: "rgba(0,0,0,0.55)",
          color: "var(--text)",
        }}
      >
        {message}
      </pre>
    </div>
  );
};

