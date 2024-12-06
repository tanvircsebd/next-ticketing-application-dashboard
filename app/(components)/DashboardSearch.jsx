import { useState } from "react";

const DashboardSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/Tickets/search?query=${query}`);
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search tickets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((ticket) => (
          <li key={ticket._id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSearch;
