import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import { UserContext } from "./context/UserContext";
import Game from "./game";
import Rooms from "./components/Rooms";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";

import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

import "./App.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(2),
  },
  searchFilterDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
  },
  searchBarRoot: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    width: "95%",
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  checkBoxContainer: {
    padding: theme.spacing(2),
  },
  navItemsRight: {
    margin: "auto",
    marginRight: 0,
  },
}));
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function App(props) {
  const classes = useStyles();
  const user = useContext(UserContext);

  if (!user.id) {
    return <Login />;
  }

  return (
    <SocketProvider id={user.id}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Connect-4</Typography>
            <div className={classes.navItemsRight}>
              <Link
                href="https://github.com/Juggernaut9/connect-4"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <IconButton
                  aria-label="Github repository link"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <GitHubIcon />
                </IconButton>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box my={2}>
          <Switch>
            <Route path="/" exact>
              <Rooms />
            </Route>
            <Route path="/game">
              <Box py={4}>
                <Game />
              </Box>
            </Route>
          </Switch>
        </Box>
      </Container>
    </SocketProvider>
  );
}

export default App;
