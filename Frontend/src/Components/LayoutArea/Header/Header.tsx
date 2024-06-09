import { Typography } from "@mui/material";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Typography className="font" variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>
            Fly With a Quiet Head
            </Typography>
            <AuthMenu />
        </div>
    );
}

export default Header;
