import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import Container from "@mui/material/Container";
import {useLocation} from "react-router";
import {selectUser} from "store/user/user";
import {useDispatch, useSelector} from "react-redux";
import ListItems from "layout/components/ListItems";
import {logout} from "helpers/firebase/logout";
import {getPageTitle} from "utils/getPageTitle";
import {transformData} from "utils/transformData";

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

const mdTheme = createTheme();
const drawerWidth: number = 240;


const Layout = (props: LayoutProps) => {
    const user = useSelector(selectUser).user;
    const [open, setOpen] = React.useState<boolean>(false);
    const location = useLocation();
    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
        <ThemeProvider theme={mdTheme}>
            {!user
                ? (<React.Fragment>{props.children}</React.Fragment>)
                : (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} drawerWidth={drawerWidth}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {getPageTitle(location.pathname)}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <ListItems logout={() => logout(dispatch)}/>
                        <Divider sx={{ my: 1 }} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {props.children}
                    </Container>
                </Box>
            </Box>)}
        </ThemeProvider>
    );
};

export default Layout;