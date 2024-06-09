// import { NavLink } from "react-router-dom";
// import VacationModel from "../../../Models/VacationModel";
// import { notify } from "../../../Utils/Notify";
// import { vacationsService } from "../../../Services/VacationsService";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { red } from "@mui/material/colors";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { AppState } from "../../../Redux/AppState";
// import UserModel from "../../../Models/UserModel";
// import { JSX } from "react/jsx-runtime";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";

// type VacationCardProps = {
//   vacation: VacationModel;
// };

// function VacationCard(props: VacationCardProps): JSX.Element {
//   const user = useSelector<AppState, UserModel>((appState) => appState.user);
//   // const [isLiked, setIsLiked] = useState(false); // Track favorite state
//   const [isLiked, setIsLiked] = useState<boolean>(props.vacation.isLiked); // Track favorite state

//   useEffect(() => {
//     setIsLiked(props.vacation.isLiked);
//   }, [props.vacation.isLiked]);

//   async function deleteMe() {
//     try {
//       const sure = window.confirm("Are you sure?");
//       if (!sure) return;

//       await vacationsService.deleteVacation(props.vacation.id);
//       notify.success("Vacation has been deleted.");
//     } catch (err: any) {
//       notify.error(err);
//     }
//   }

//   // async function handleLikeClick() {
//   //   if (props.vacation.isLiked) {
//   //     await vacationsService.unLike(user.id, props.vacation.id);
//   //   } else {
//   //     await vacationsService.addLike(user.id, props.vacation.id);
//   //     setIsLiked(!isLiked);
//   //   }
//   // }

//   async function handleLikeClick() {
//     try {
//       if (isLiked) {
//         await vacationsService.unLike(user.id, props.vacation.id);
//         setIsLiked(false);
//       } else {
//         await vacationsService.addLike(user.id, props.vacation.id);
//         setIsLiked(true);
//       }
//     } catch (err: any) {
//       notify.error(err);
//     }
//   }

//   const startDate = new Intl.DateTimeFormat("en-GB").format(
//     new Date(props.vacation.startDate)
//   );
//   const endDate = new Intl.DateTimeFormat("en-GB").format(
//     new Date(props.vacation.endDate)
//   );

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: 4,
//         alignContent: "start",
//       }}
//     >
//       <Card sx={{ maxWidth: 345, maxHeight: 500, boxShadow: 12 }}>
//         {user?.roleId === 2 && (
//           // <IconButton
//           //   aria-label="add to favorites"
//           //   onClick={handleLikeClick} // Add onClick handler for favorite icon
//           //   style={{ color: isLiked ? red[500] : "inherit" }} // Change color based on favorite state
//           // >
//           //   <FavoriteIcon />
//           //   {props.vacation.likesCount}
//           // </IconButton>
//           <Box
//             sx={{ position: "relative", display: "flex", alignItems: "center" }}
//           >
//             <IconButton
//               aria-label="add to favorites"
//               onClick={handleLikeClick}
//               style={{ color: isLiked ? red[500] : "inherit" }}
//             >
//               <FavoriteIcon />
//             </IconButton>
//             <Box
//               sx={{
//                 position: "absolute",
//                 left: "38px",
//                 backgroundColor: "#fce4ec",
//                 padding: "4px",
//                 borderRadius: "8px",
//               }}
//             >
//               <Typography variant="body1">{`Likes:${props.vacation.likesCount || 0}`}</Typography>
//             </Box>
//             {/* <Typography variant="body1">{props.vacation.likesCount}</Typography> */}
//           </Box>
//         )}
//         {user?.roleId === 1 && (
//           <>
//             <IconButton aria-label="delete" onClick={deleteMe}>
//               <DeleteOutlineRounded />
//             </IconButton>

//             <NavLink to={"/vacations/edit/" + props.vacation.id}>
//               {/* <button>E</button> */}
//               <IconButton aria-label="Edit">
//                 <DriveFileRenameOutlineIcon />
//               </IconButton>
//             </NavLink>
//           </>
//         )}
//         <CardHeader
//           title={props.vacation.destination}
//           subheader={`${startDate} - ${endDate}`}
//         />
//         <CardMedia
//           component="img"
//           sx={{
//             height: 240,
//             objectFit: "contain",
//           }}
//           image={props.vacation.imageUrl}
//           alt="vacation"
//         />
//         <CardContent>
//           <Typography
//             variant="body2"
//             color="text.secondary"
//             sx={{
//               height: 100,
//               objectFit: "contain",
//             }}
//           >
//             {props.vacation.description}
//           </Typography>
//         {/* <CardHeader title={`$${props.vacation.price}`} /> */}
//         <Typography variant="h6" sx={{ marginTop: 2, textAlign: "center", fontWeight: "bold", color: "#4caf50" }}>
//           {`$${props.vacation.price}`}
//         </Typography>
//         </CardContent>

//       </Card>
//     </Box>
//   );
// }

// export default VacationCard;

// _________________________________________

// import { NavLink } from "react-router-dom";
// import VacationModel from "../../../Models/VacationModel";
// import { notify } from "../../../Utils/Notify";
// import { vacationsService } from "../../../Services/VacationsService";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { red } from "@mui/material/colors";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { AppState } from "../../../Redux/AppState";
// import UserModel from "../../../Models/UserModel";
// import { JSX } from "react/jsx-runtime";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";

// type VacationCardProps = {
//   vacation: VacationModel;
// };

// function VacationCard(props: VacationCardProps): JSX.Element {
//   const user = useSelector<AppState, UserModel>((appState) => appState.user);
//   const [isLiked, setIsLiked] = useState<boolean>(props.vacation.isLiked);

//   useEffect(() => {
//     setIsLiked(props.vacation.isLiked);
//   }, [props.vacation.isLiked]);

//   async function deleteMe() {
//     try {
//       const sure = window.confirm("Are you sure?");
//       if (!sure) return;

//       await vacationsService.deleteVacation(props.vacation.id);
//       notify.success("Vacation has been deleted.");
//     } catch (err: any) {
//       notify.error(err);
//     }
//   }

//   async function handleLikeClick() {
//     try {
//       if (isLiked) {
//         await vacationsService.unLike(user.id, props.vacation.id);
//         setIsLiked(false);
//       } else {
//         await vacationsService.addLike(user.id, props.vacation.id);
//         setIsLiked(true);
//       }
//     } catch (err: any) {
//       notify.error(err);
//     }
//   }

//   const startDate = new Intl.DateTimeFormat("en-GB").format(
//     new Date(props.vacation.startDate)
//   );
//   const endDate = new Intl.DateTimeFormat("en-GB").format(
//     new Date(props.vacation.endDate)
//   );

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: 4,
//         alignContent: "start",
//       }}
//     >
//       <Card sx={{ maxWidth: 345, maxHeight: 500, display: "flex", flexDirection: "column", boxShadow: 12 }}>
//         <Box sx={{ flexGrow: 1 }}>
//           {user?.roleId === 2 && (
//             <Box
//               sx={{ position: "relative", display: "flex", alignItems: "center" }}
//             >
//               <IconButton
//                 aria-label="add to favorites"
//                 onClick={handleLikeClick}
//                 style={{ color: isLiked ? red[500] : "inherit" }}
//               >
//                 <FavoriteIcon />
//               </IconButton>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: "38px",
//                   backgroundColor: "#fce4ec",
//                   padding: "4px",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Typography variant="body1">{`Likes: ${props.vacation.likesCount || 0}`}</Typography>
//               </Box>
//             </Box>
//           )}
//           {user?.roleId === 1 && (
//             <>
//               <IconButton aria-label="delete" onClick={deleteMe}>
//                 <DeleteOutlineRounded />
//               </IconButton>

//               <NavLink to={"/vacations/edit/" + props.vacation.id}>
//                 <IconButton aria-label="Edit">
//                   <DriveFileRenameOutlineIcon />
//                 </IconButton>
//               </NavLink>
//             </>
//           )}
//           <CardHeader
//             title={props.vacation.destination}
//             subheader={`${startDate} - ${endDate}`}
//           />
//           <CardMedia
//             component="img"
//             sx={{
//               height: 200,
//               objectFit: "contain",
//             }}
//             image={props.vacation.imageUrl}
//             alt="vacation"
//           />
//         </Box>
//         <CardContent sx={{ flexShrink: 0 }}>
//           <Typography
//             variant="body2"
//             color="text.secondary"
//             sx={{
//               height: 80,
//               objectFit: "contain",
//             }}
//           >
//             {props.vacation.description}
//           </Typography>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               marginTop: 2, 
//               textAlign: "center", 
//               fontWeight: "bold", 
//               color: "#4caf50" 
//             }}
//           >
//             {`$${props.vacation.price}`}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// export default VacationCard;

// __________________________________


// import { NavLink } from "react-router-dom";
// import VacationModel from "../../../Models/VacationModel";
// import { notify } from "../../../Utils/Notify";
// import { vacationsService } from "../../../Services/VacationsService";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { red } from "@mui/material/colors";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { AppState } from "../../../Redux/AppState";
// import UserModel from "../../../Models/UserModel";
// import { JSX } from "react/jsx-runtime";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";

// type VacationCardProps = {
//   vacation: VacationModel;
// };

// function VacationCard(props: VacationCardProps): JSX.Element {
//   const user = useSelector<AppState, UserModel>((appState) => appState.user);
//   const [isLiked, setIsLiked] = useState<boolean>(props.vacation.isLiked);

//   useEffect(() => {
//     setIsLiked(props.vacation.isLiked);
//   }, [props.vacation.isLiked]);

//   async function deleteMe() {
//     try {
//       const sure = window.confirm("Are you sure?");
//       if (!sure) return;

//       await vacationsService.deleteVacation(props.vacation.id);
//       notify.success("Vacation has been deleted.");
//     } catch (err: any) {
//       notify.error(err);
//     }
//   }

//   async function handleLikeClick() {
//     try {
//       if (isLiked) {
//         await vacationsService.unLike(user.id, props.vacation.id);
//         setIsLiked(false);
//       } else {
//         await vacationsService.addLike(user.id, props.vacation.id);
//         setIsLiked(true);
//       }
//     } catch (err: any) {
//       notify.error(err);
//     }
//   }

//   const startDate = new Intl.DateTimeFormat("en-GB").format(
//     new Date(props.vacation.startDate)
//   );
//   const endDate = new Intl.DateTimeFormat("en-GB").format(
//     new Date(props.vacation.endDate)
//   );

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: 4,
//         alignContent: "start",
//       }}
//     >
//       <Card sx={{ maxWidth: 345, maxHeight: 500, display: "flex", flexDirection: "column", boxShadow: 12 }}>
//         <Box sx={{ flexGrow: 1 }}>
//           {user?.roleId === 2 && (
//             <Box
//               sx={{ position: "relative", display: "flex", alignItems: "center" }}
//             >
//               <IconButton
//                 aria-label="add to favorites"
//                 onClick={handleLikeClick}
//                 style={{ color: isLiked ? red[500] : "inherit" }}
//               >
//                 <FavoriteIcon />
//               </IconButton>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: "38px",
//                   backgroundColor: "#fce4ec",
//                   padding: "4px",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Typography variant="body1">{`Likes: ${props.vacation.likesCount || 0}`}</Typography>
//               </Box>
//             </Box>
//           )}
//           {user?.roleId === 1 && (
//             <>
//               <IconButton aria-label="delete" onClick={deleteMe}>
//                 <DeleteOutlineRounded />
//               </IconButton>

//               <NavLink to={"/vacations/edit/" + props.vacation.id}>
//                 <IconButton aria-label="Edit">
//                   <DriveFileRenameOutlineIcon />
//                 </IconButton>
//               </NavLink>
//             </>
//           )}
//           <CardHeader
//             title={props.vacation.destination}
//             subheader={`${startDate} - ${endDate}`}
//           />
//           <CardMedia
//             component="img"
//             sx={{
//               height: 240,
//               objectFit: "cover",
//               width: "100%", // Make sure the image covers the entire width
//             }}
//             image={props.vacation.imageUrl}
//             alt="vacation"
//           />
//         </Box>
//         <CardContent sx={{ flexShrink: 0 }}>
//           <Typography
//             variant="body2"
//             color="text.secondary"
//             sx={{
//               height: 80,
//               objectFit: "contain",
//             }}
//           >
//             {props.vacation.description}
//           </Typography>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               marginTop: 2, 
//               textAlign: "center", 
//               fontWeight: "bold", 
//               color: "#4caf50" 
//             }}
//           >
//             {`$${props.vacation.price}`}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// export default VacationCard;


// ___________________________
// import { NavLink } from "react-router-dom";
// import VacationModel from "../../../Models/VacationModel";
// import { notify } from "../../../Utils/Notify";
// import { vacationsService } from "../../../Services/VacationsService";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { red } from "@mui/material/colors";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { AppState } from "../../../Redux/AppState";
// import UserModel from "../../../Models/UserModel";
// import { JSX } from "react/jsx-runtime";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";

// type VacationCardProps = {
//   vacation: VacationModel;
// };

// function VacationCard(props: VacationCardProps): JSX.Element {
//   const user = useSelector<AppState, UserModel>((appState) => appState.user);
//   const [isLiked, setIsLiked] = useState<boolean>(props.vacation.isLiked);

//   useEffect(() => {
//     setIsLiked(props.vacation.isLiked);
//   }, [props.vacation.isLiked]);

//   async function deleteMe() {
//     try {
//       const sure = window.confirm("Are you sure?");
//       if (!sure) return;

//       await vacationsService.deleteVacation(props.vacation.id);
//       notify.success("Vacation has been deleted.");
//     } catch (err: any) {
//       notify.error(err);
//     }
//   }

//   async function handleLikeClick() {
//     try {
//       if (isLiked) {
//         await vacationsService.unLike(user.id, props.vacation.id);
//         setIsLiked(false);
//       } else {
//         await vacationsService.addLike(user.id, props.vacation.id);
//         setIsLiked(true);
//       }
//     } catch (err: any) {
//       notify.error(err);
//     }
//   }

//   const startDate = new Intl.DateTimeFormat("en-GB").format(
//     new Date(props.vacation.startDate)
//   );
//   const endDate = new Intl.DateTimeFormat("en-GB").format(
//     new Date(props.vacation.endDate)
//   );

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: 4,
//         alignContent: "start",
//       }}
//     >
//       <Card sx={{ maxWidth: 345, maxHeight: 500, display: "flex", flexDirection: "column", boxShadow: 12 }}>
//         <Box sx={{ flexGrow: 1 }}>
//           {user?.roleId === 2 && (
//             <Box
//               sx={{ position: "relative", display: "flex", alignItems: "center" }}
//             >
//               <IconButton
//                 aria-label="add to favorites"
//                 onClick={handleLikeClick}
//                 style={{ color: isLiked ? red[500] : "inherit" }}
//               >
//                 <FavoriteIcon />
//               </IconButton>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: "38px",
//                   backgroundColor: "#fce4ec",
//                   padding: "4px",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Typography variant="body1">{`Likes: ${props.vacation.likesCount || 0}`}</Typography>
//               </Box>
//             </Box>
//           )}
//           {user?.roleId === 1 && (
//             <>
//               <IconButton aria-label="delete" onClick={deleteMe}>
//                 <DeleteOutlineRounded />
//               </IconButton>

//               <NavLink to={"/vacations/edit/" + props.vacation.id}>
//                 <IconButton aria-label="Edit">
//                   <DriveFileRenameOutlineIcon />
//                 </IconButton>
//               </NavLink>
//             </>
//           )}
//           <CardHeader
//             title={props.vacation.destination}
//             subheader={`${startDate} - ${endDate}`}
//             sx={{ paddingBottom: 0, paddingTop: 1 }} // Reduce top and bottom padding
//           />
//           <CardMedia
//             component="img"
//             sx={{
//               height: 240,
//               objectFit: "cover",
//               width: "100%",
//             }}
//             image={props.vacation.imageUrl}
//             alt="vacation"
//           />
//         </Box>
//         <CardContent sx={{ flexShrink: 0 }}>
//           <Typography
//             variant="body2"
//             color="text.secondary"
//             sx={{
//               height: 80,
//               objectFit: "contain",
//               marginTop: 1,
//             }}
//           >
//             {props.vacation.description}
//           </Typography>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               marginTop: 2, 
//               textAlign: "center", 
//               fontWeight: "bold", 
//             }}
//           >
//             {`$${props.vacation.price}`}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// export default VacationCard;

// ________________________________________

import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { notify } from "../../../Utils/Notify";
import { vacationsService } from "../../../Services/VacationsService";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { JSX } from "react/jsx-runtime";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import { vacationActionCreators } from "../../../Redux/VacationsSlice";

type VacationCardProps = {
  vacation: VacationModel;
};

function VacationCard(props: VacationCardProps): JSX.Element {
  const user = useSelector<AppState, UserModel>((appState) => appState.user);
  const [isLiked, setIsLiked] = useState<number>(props.vacation.isLiked);
  const [likesCount, setLikesCount] = useState<number>(props.vacation.likesCount);

  useEffect(() => {
    setIsLiked(props.vacation.isLiked);
    setLikesCount(props.vacation.likesCount);
  }, [props.vacation.isLiked, props.vacation.likesCount]);

  async function deleteMe() {
    try {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;

      await vacationsService.deleteVacation(props.vacation.id);
      notify.success("Vacation has been deleted.");
    } catch (err: any) {
      notify.error(err);
    }
  }

  async function handleLikeClick() {
    try {
      if (isLiked) {
        await vacationsService.unLike(user.id, props.vacation.id);
        setIsLiked(0);
        setLikesCount(likesCount - 1);
      } else {
        await vacationsService.addLike(user.id, props.vacation.id);
        setIsLiked(1);
        setLikesCount(likesCount + 1);
      }
    } catch (err: any) {
      notify.error(err);
    }
  }

  const startDate = new Intl.DateTimeFormat("en-GB").format(
    new Date(props.vacation.startDate)
  );
  const endDate = new Intl.DateTimeFormat("en-GB").format(
    new Date(props.vacation.endDate)
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 4,
        alignContent: "start",
      }}
    >
      <Card sx={{ maxWidth: 345, maxHeight: 500, display: "flex", flexDirection: "column", boxShadow: 12 }}>
        <Box sx={{ flexGrow: 1 }}>
          {user?.roleId === 2 && (
            <Box
              sx={{ position: "relative", display: "flex", alignItems: "center" }}
            >
              <IconButton
                aria-label="add to favorites"
                onClick={handleLikeClick}
                style={{ color: isLiked ? red[500] : "inherit" }}
              >
                <FavoriteIcon />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  left: "38px",
                  backgroundColor: "#fce4ec",
                  padding: "4px",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="body1">{`Likes: ${likesCount}`}</Typography>
              </Box>
            </Box>
          )}
          {user?.roleId === 1 && (
            <>
              <IconButton aria-label="delete" onClick={deleteMe}>
                <DeleteOutlineRounded />
              </IconButton>

              <NavLink to={"/vacations/edit/" + props.vacation.id}>
                <IconButton aria-label="Edit">
                  <DriveFileRenameOutlineIcon />
                </IconButton>
              </NavLink>
            </>
          )}
          <CardHeader
            title={props.vacation.destination}
            subheader={`${startDate} - ${endDate}`}
            sx={{ paddingBottom: 0, paddingTop: 1 }} // Reduce top and bottom padding
          />
          <CardMedia
            component="img"
            sx={{
              height: 240,
              objectFit: "cover",
              width: "100%",
            }}
            image={props.vacation.imageUrl}
            alt="vacation"
          />
        </Box>
        <CardContent sx={{ flexShrink: 0 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 80,
              objectFit: "contain",
              marginTop: 1,
            }}
          >
            {props.vacation.description}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              marginTop: 2, 
              textAlign: "center", 
              fontWeight: "bold", 
            }}
          >
            {`$${props.vacation.price}`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default VacationCard;



