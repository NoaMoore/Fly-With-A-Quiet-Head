import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import Page404 from "../page404/page404";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import { VacationsGraph } from "../../VacationsArea/vacationsGraph/vacationsGraph";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Home: */}
        <Route path="/home" element={<Home />} />

        {/* Vacations: */}
        <Route path="/vacations/" element={<VacationsList />} />

        {/* Add Vacation: */}
        <Route path="/vacations/new" element={<AddVacation />} />

        {/* Edit Vacation: */}
        <Route path="/vacations/edit/:id" element={<EditVacation />} />

        {/* Register: */}
        <Route path="/register" element={<Register />} />

        {/* Login: */}
        <Route path="/login" element={<Login />} />

        {/* Graph: */}
        <Route path="/graph" element={<VacationsGraph />} />

        {/* Default Route: */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Page not found route: */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
