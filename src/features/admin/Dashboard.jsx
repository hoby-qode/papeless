import { useEffect, useState } from "react";

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqFD0mtFP8Jc273LJL9DMwCIdJ7XUNlQTZWkhkYEs-SW0dhLbQtSirldkxt2Iw4F9pkSV5WIvp3KWj/pub?output=csv"
    )
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.split("\n");
        const headers = lines[0].split(",");

        const data = lines.slice(1).map((line) => {
          const values = line.split(",");
          const obj = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim();
          });
          return obj;
        });

        setRows(data);
      });
  }, []);
  return (
    <div className="p-4">
      🎉 Bienvenue dans l’espace Admin
      <div>
        {rows.map((row, i) => (
          <li key={i}>
            {JSON.stringify(row.image)}
            {row.name} - {row.price} MGA
          </li>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
