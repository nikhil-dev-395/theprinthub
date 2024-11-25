import React, { useState, useEffect } from "react";
import "./HelpDesk.css";
import Nevbar from "./Nevbar";
import Footer from "./Footer";

function HelpDesk() {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setQueries([
        ...queries,
        { id: queries.length + 1, text: query, response: null },
      ]);
      setQuery(""); // Clear the input field after submission
    }
  };
  useEffect(() => {
    // Simulate a response from the help desk after 5 seconds
    const timer = setTimeout(() => {
      setQueries((prevQueries) =>
        prevQueries.map((q) =>
          q.response
            ? q
            : {
                ...q,
                response:
                  "Thank you for reaching out! Our team will assist you shortly.",
              }
        )
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [queries]);

  return (
    <div>
      <Nevbar />
      <div className="help-desk">
        <h1>Help Desk</h1>
        <form onSubmit={handleSubmit} className="help-desk-form">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query or issue..."
            required
          />
          <button type="submit">Submit Query</button>
        </form>

        <div className="queries-list">
          <h2>Submitted Queries</h2>
          {queries.length === 0 ? (
            <p>No queries yet. Submit your first question!</p>
          ) : (
            <ul>
              {queries.map((q) => (
                <li key={q.id}>
                  <strong>Query #{q.id}:</strong> {q.text}
                  {q.response ? (
                    <p>Response: {q.response}</p>
                  ) : (
                    <p>Waiting for response...</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HelpDesk;
