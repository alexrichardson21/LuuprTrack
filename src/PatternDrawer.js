import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { ButtonBase, Button, Paper, Grid } from "@material-ui/core";
import PatternBubble from "./PatternBubble";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  paper: {
    background: "transparent",
    boxShadow: "none",
    borderStyle: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
    // background: "transparent",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(9) + 1
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(7) + 1
    // }
  },
  section: {
    height: 66,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  const [sections, setSections] = React.useState([0, 1, 2]);

  const handleDrawerOpen = () => {
    props.setOpenCallback(true);
  };

  const handleDrawerClose = () => {
    props.setOpenCallback(false);
  };

  const sectionsLayout = props.patterns.map((p, i) => (
    <Grid item>
      <PatternBubble
        open={props.open}
        pattern={p}
        index={i}
        playPatternCallback={props.playPatternCallback}
        setNameCallback={props.setNameCallback}
      />
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="right"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open
          })
        }}
      >
        <div className={classes.toolbar}>
          {props.open ? (
            <IconButton
              className={classes.closeButton}
              onClick={handleDrawerClose}
            >
              <ChevronRightIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.openButton}
              onClick={handleDrawerOpen}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        </div>
        <Grid container spacing={2} direction="column">
          {sectionsLayout}
        </Grid>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
