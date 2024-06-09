// import { useEffect, useState } from "react";
// import { vacationsService } from "../../../Services/VacationsService";
// import useTitle from "../../../Utils/UseTitle";
// import "./VacationsList.css";
// import { notify } from "../../../Utils/Notify";
// import VacationModel from "../../../Models/VacationModel";
// import VacationCard from "../VacationCard/VacationCard";
// import { Box, Button } from "@mui/material";
// import { useSelector } from "react-redux";
// import { AppState } from "../../../Redux/AppState";
// import UserModel from "../../../Models/UserModel";

// function VacationList(): JSX.Element {
//   const vacations = useSelector<AppState, VacationModel[]>(
//     (state) => state.vacations
//   );
//   const user = useSelector<AppState, UserModel>((appState) => appState.user);

//   const [filteredVacations, setFilteredVacations] =
//     useState<VacationModel[]>(vacations);
//   // items = vacations
//   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
//   let filters: string[] = [
//     "My vacations",
//     "Active vacations",
//     "Future vacations",
//   ];

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const vacationsPerPage = 8;
//   // Custom Hook:
//   useTitle("Our Hot Vacations");

//   useEffect(() => {
//     vacationsService
//       .getAllVacations()
//       .then((vacations) => {
//         const totalPages = Math.ceil(vacations.length / vacationsPerPage);
//         setTotalPages(totalPages);
//         return vacations;
//       })
//       .catch((err) => notify.error(err.message));
//   }, []);

//   const startIndex = (page - 1) * vacationsPerPage;
//   const endIndex = startIndex + vacationsPerPage;
//   const currentVacations = vacations.slice(startIndex, endIndex);

//   const nextPage = () => {
//     setPage((prevPage: number) => Math.min(prevPage + 1, totalPages));
//   };

//   const prevPage = () => {
//     setPage((prevPage: number) => Math.max(prevPage - 1, 1));
//   };

//   const handleFilterButtonClick = (selectedCategory: string) => {
//     setSelectedFilters([selectedCategory]); // Set only the clicked category as selected
//   };

//   useEffect(() => {
//     filterVacations();
//   }, [selectedFilters]);

//   const filterVacations = () => {
//     if (selectedFilters.length > 0) {
//       let tempVacations = selectedFilters.map((selectedCategory: string) => {
//         // let temp = vacations.filter((vacation) => vacation.isFollowing && selectedCategory ==="החופשות שלי")
//         // return temp;
//         let temp;
//         if (selectedCategory === "My vacations") {
//           temp = vacations.filter((vacation) => vacation.isLiked);
//         }
//         if (selectedCategory === "Future vacations") {
//           temp = vacations.filter(
//             (vacation) => new Date(vacation.startDate) > new Date()
//           );
//         }
//         if (selectedCategory === "Active vacations") {
//           temp = vacations.filter(
//             (vacation) =>
//               new Date(vacation.startDate) <= new Date() &&
//               new Date(vacation.endDate) >= new Date()
//           );
//         }
//         return temp;
//       });

//       setFilteredVacations(tempVacations.flat());
//     } else {
//       setFilteredVacations([...vacations]);
//     }
//   };

//   return (
//     <Box className="vacations-list">
//       {user?.roleId === 2 && (
//         <Box className="button-container">
//           {filters.map((category, idx) => (
//             <button
//               onClick={() => handleFilterButtonClick(category)}
//               className={`button ${
//                 selectedFilters?.includes(category) ? "active" : ""
//               }`}
//               key={`filters-${idx}`}
//             >
//               {category}
//             </button>
//           ))}
//         </Box>
//       )}

//       <Box
//         className="vacations-container"
//         // sx={{
//         //   width: "100%",
//         //   display: "grid",
//         //   gridTemplateColumns: "repeat(4, minmax(300px, 1fr))",
//         //   gap: 2,
//         //   height: "100%",
//         //   overflowY: "auto"
//         // }}
//       >
//         {selectedFilters.length > 0
//           ? filteredVacations.map((v) => (
//               <VacationCard key={v.id} vacation={v} />
//             ))
//           : currentVacations.map((v) => (
//               <VacationCard key={v.id} vacation={v} />
//             ))}
//       </Box>

//       <Box className="pagination">
//         <Button variant="outlined" onClick={prevPage} disabled={page === 1}>
//           Previous
//         </Button>
//         <Box className="page-number">{page}</Box>
//         <Button
//           variant="outlined"
//           onClick={nextPage}
//           disabled={page === totalPages}
//         >
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default VacationList;


import { useEffect, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import useTitle from "../../../Utils/UseTitle";
import "./VacationsList.css";
import { notify } from "../../../Utils/Notify";
import VacationModel from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";

function VacationList(): JSX.Element {
  const vacations = useSelector<AppState, VacationModel[]>((state) => state.vacations);
  const user = useSelector<AppState, UserModel>((appState) => appState.user);

  const [filteredVacations, setFilteredVacations] =
    useState<VacationModel[]>(vacations);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filters: string[] = ["My vacations", "Active vacations", "Future vacations"];

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const vacationsPerPage = 8;
  useTitle("Our Hot Vacations");

  useEffect(() => {
    vacationsService
      .getAllVacations()
      .then((vacations) => {
        const totalPages = Math.ceil(vacations.length / vacationsPerPage);
        setTotalPages(totalPages);
        setFilteredVacations(vacations); // Set vacations when fetched
        return vacations;
      })
      .catch((err) => notify.error(err.message));
  }, []);

  const startIndex = (page - 1) * vacationsPerPage;
  const endIndex = startIndex + vacationsPerPage;
  const currentVacations = filteredVacations.slice(startIndex, endIndex);

  const nextPage = () => {
    setPage((prevPage: number) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setPage((prevPage: number) => Math.max(prevPage - 1, 1));
  };

  const handleFilterButtonClick = (selectedCategory: string) => {
    setSelectedFilters([selectedCategory]);
  };

  useEffect(() => {
    filterVacations();
  }, [selectedFilters]);

  const filterVacations = () => {
    if (selectedFilters.length > 0) {
      let tempVacations = selectedFilters.map((selectedCategory: string) => {
        let temp;
        if (selectedCategory === "My vacations") {
          temp = vacations.filter((vacation) => vacation.isLiked);
        }
        if (selectedCategory === "Future vacations") {
          temp = vacations.filter(
            (vacation) => new Date(vacation.startDate) > new Date()
          );
        }
        if (selectedCategory === "Active vacations") {
          temp = vacations.filter(
            (vacation) =>
              new Date(vacation.startDate) <= new Date() &&
              new Date(vacation.endDate) >= new Date()
          );
        }
        return temp;
      });

      setFilteredVacations(tempVacations.flat());
    } else {
      setFilteredVacations([...vacations]);
    }
  };

  return (
    <Box className="vacations-list">
      {user?.roleId === 2 && (
        <Box className="button-container">
          {filters.map((category, idx) => (
            <button
              onClick={() => handleFilterButtonClick(category)}
              className={`button ${
                selectedFilters?.includes(category) ? "active" : ""
              }`}
              key={`filters-${idx}`}
            >
              {category}
            </button>
          ))}
        </Box>
      )}

      <Box className="vacations-container">
        {currentVacations.map((v) => (
          <VacationCard key={v.id} vacation={v} />
        ))}
      </Box>

      <Box
        className="pagination"
        sx={{
          backgroundColor: 'transparent', // Ensure the background is transparent
          border: 'none', // Ensure there's no border
          boxShadow: 'none', // Remove any shadow if present
          padding: 0, // Ensure there's no padding
        }}
      >
        <Button
          className="pagination-button"
          variant="outlined"
          onClick={prevPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Box className="page-number">{page}</Box>
        <Button
          className="pagination-button"
          variant="outlined"
          onClick={nextPage}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default VacationList;
