import "./vacationsGraph.css";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { AppState } from "../../../Redux/AppState";
import VacationModel from "../../../Models/VacationModel";
import { useSelector } from "react-redux";
import useTitle from "../../../Utils/UseTitle";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { useEffect } from "react";
import { DownloadForOffline } from "@mui/icons-material";
import { CSVLink } from "react-csv";

export function VacationsGraph(): JSX.Element {
  const vacations = useSelector<AppState, VacationModel[]>(
    (appState) => appState.vacations
  );
  useTitle("Graph");

  useEffect(() => {
    vacationsService
      .getAllVacations()
      .then((vacations) => vacations)
      .catch((err) => notify.error(err.message));
  }, []);

  let data = [];
  data.push(["Likes", "Destinations"]);

  for (let i = 0; i < vacations.length; i++) {
    data.push([vacations[i]?.likesCount, vacations[i]?.destination]);
  }

  let dataGraph = [];

  for (let i = 0; i < vacations.length; i++) {
    dataGraph.push({
      Destination: vacations[i]?.destination,
      Likes: vacations[i]?.likesCount,
    });
  }

  return (
    <div className="VacationsGraph">
      <div>
        <h2>Vacations Graph</h2>
        <div className="CsvLink">
          <CSVLink data={data} filename={"VacationsFollowers.csv"}>
            <button>
              <DownloadForOffline /> Download CSV
            </button>
          </CSVLink>
        </div>
      </div>
      <div className="chart-container">
        <BarChart width={900} height={400} data={dataGraph}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            className="numberOfFollowers"
            dataKey="Destination"
            fontSize={12} // Adjust the font size for X-axis labels
            tick={{ fill: "red", fontSize: 15 }} // Adjust tick font size and color
          />
          <YAxis
            allowDecimals={false}
            fontSize={12} // Adjust the font size for Y-axis labels
            tick={{ fill: "red", fontSize: 12 }} // Adjust tick font size and color
          />
          <Tooltip
            labelStyle={{ fontSize: 15 }} // Adjust label font size in Tooltip
            itemStyle={{ fontSize: 18 }} // Adjust item font size in Tooltip
          />
          <Bar dataKey="Likes" fill={"black"} />
        </BarChart>
      </div>
    </div>
  );
}
