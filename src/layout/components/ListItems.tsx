import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import {Link} from "react-router-dom";


interface ListItemsProps {
    logout: () => void
}

const ListItems = (props: ListItemsProps) => {
    return (
        <React.Fragment>
            <Link to={"/"}>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                </Link>
                <Link to={"files"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Inventory2Icon />
                        </ListItemIcon>
                        <ListItemText primary="Files" />
                    </ListItemButton>
                </Link>
                <Link to={"/profile"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </Link>
                <Link to={"/login"} onClick={props.logout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </Link>
        </React.Fragment>
    );
}

export default ListItems;