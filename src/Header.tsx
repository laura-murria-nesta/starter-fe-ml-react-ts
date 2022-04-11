import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
return (
	<AppBar position="static">
		<Toolbar>
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2 }}
		>
		  <MenuIcon />
		</IconButton>
        <img src="/images/Nesta_Logo_White_RGB.png" alt="Nesta Logo" height={50}/>
		<Typography variant="h6"
			component="div" sx={{ flexGrow: 1 }}>
			Home Heating Advice
		</Typography>
		<Button variant="contained" color="primary">Login</Button>
		</Toolbar>
	</AppBar>
);
}
