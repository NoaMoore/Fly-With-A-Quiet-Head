import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { vacationActionCreators } from "../../../Redux/VacationsSlice";

function Navbar(): JSX.Element {
  const user = useSelector<AppState, UserModel>((appState) => appState.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowAllClick = () => {
    if (!user) {
      window.location.href = "/login"; 
      return;
    }
    dispatch(vacationActionCreators.resetFilters());
    navigate("/vacations")
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            <Button color="inherit" component={NavLink} to="/home">
              Home
            </Button>
            <Button color="inherit" onClick={handleShowAllClick}>
              Vacations
            </Button>
            {user?.roleId === 1 && (
              <Button color="inherit" component={NavLink} to="vacations/new">
                Add Vacation
              </Button>
            )}
            {user?.roleId === 1 && (
              <Button color="inherit" component={NavLink} to="graph">
                Reports
              </Button>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
