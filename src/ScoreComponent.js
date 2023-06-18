import React, { useEffect, useState } from "react";
import "./App.css";

const Score = () => {
  const [data, setData] = useState([]);
  const [randomScore, setRandomScore] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [uniqueDates, setUniqueDates] = useState([]);
  const [hoveredVcode, setHoveredVcode] = useState("");
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });
  const [pointAdvantage, setPointAdvantage] = useState(null);

  const fetchData = () => {
    fetch("http://212.106.184.211/score?game=RA&limit=1000&offset=0")
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        const dates = [...new Set(actualData.map((item) => item.created_at.split(" ")[0]))];
        setUniqueDates(dates);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateRandomScore = () => {
    const filteredData = data.filter((item) => item.created_at.split(" ")[0] === selectedDate);
    if (filteredData.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      const randomItem = filteredData[randomIndex];
      setRandomScore(randomItem);
    } else {
      setRandomScore(null);
    }
  };

  const handleMouseEnter = (vcode, event, index) => {
    const currentScore = data[index].score;
    const nextScore = data[index + 1]?.score || null;
    const pointAdvantage = nextScore !== null ? currentScore - nextScore : null;
    setHoveredVcode(vcode);
    setPointAdvantage(pointAdvantage);
    setHoveredPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredVcode("");
    setPointAdvantage(null);
  };

  return (
    <div className="App">
      <h1 className="score-heading">SCORE</h1>
      <div className="select-container">
        <select className="date-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          <option value="">DATA</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <button className="random-button" onClick={generateRandomScore}>
        Losuj
      </button>
      {randomScore && (
        <div>
          <p>Wylosowany wynik:</p>
          <p>Game: {randomScore.game === "RA" ? "Reset Adventure" : randomScore.game}</p>
          <p>Date: {randomScore.created_at.split(" ")[0]}</p>
          <p>Score: {randomScore.score}</p>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td onMouseEnter={(e) => handleMouseEnter(item.vcode, e, index)} onMouseLeave={handleMouseLeave}>
                {item.game === "RA" ? "Reset Adventure" : item.game}
              </td>
              <td onMouseEnter={(e) => handleMouseEnter(item.vcode, e, index)} onMouseLeave={handleMouseLeave}>
                {item.created_at.split(" ")[0]}
              </td>
              <td onMouseEnter={(e) => handleMouseEnter(item.vcode, e, index)} onMouseLeave={handleMouseLeave}>
                {item.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hoveredVcode && (
        <div className="hovered-vcode" style={{ top: hoveredPosition.y, left: hoveredPosition.x }}>
          <p>Vcode: {hoveredVcode}</p>
          <p>Przewaga punktowa: {pointAdvantage !== null ? pointAdvantage : "Brak"}</p>
        </div>
      )}
    </div>
  );
}
export default Score;
