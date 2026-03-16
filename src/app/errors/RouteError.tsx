import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const RouteError: React.FC = () => {
  const err = useRouteError();

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

