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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import TrackHeader from "./TrackHeader";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EditIcon from "@material-ui/icons/Edit";
// import clsx from "clsx";
import StopIcon from "@material-ui/icons/Stop";
import CloseIcon from "@material-ui/icons/Close";
import { ButtonBase, Button, Paper, Grid, TextField } from "@material-ui/core";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  form: {
    width: 80
  },
  row: {
    height: 33
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
  moreButton: {
    height: 32,
    width: 90
  },
  dragHandleIcon: {
    position: "relative",
    left: 35,
    top: 4
  },
  playButton: {
    height: 33,
    width: 60,
    borderTopLeftRadius: 30
  },
  minimizedPlayButton: {
    height: 66,
    width: 73,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30
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
    width: theme.spacing(7) + 1
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(9) + 1
    // }
  },
  section: {
    height: 66,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    background: "#730921"
  },
  sectionText: {
    transform: [{ rotate: "90deg" }]
    // rotate: 90,
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

export default function PatternBubble(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [sections, setSections] = React.useState([0, 1, 2]);
  const [name, setName] = React.useState("section");

  return (
    <Paper
      className={clsx(classes.section, {
        [classes.sectionOpen]: props.open,
        [classes.sectionClose]: !props.open
      })}
    >
      {props.open ? (
        <Grid container direction="column">
          <Grid item>
            <Grid container className={classes.row} direction="row">
              <Grid item>
                <ButtonBase
                  onClick={() => props.playPatternCallback(props.index)}
                  className={classes.playButton}
                >
                  <PlayArrowIcon />
                </ButtonBase>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                style={{ marginRight: 5 }}
              />

              <Grid item xs>
                <form noValidate autoComplete="off">
                  <TextField
                    placeholder={`Section ${props.index + 1}`}
                    value={props.pattern.name}
                    onChange={event => {
                      props.setNameCallback(event.target.value, props.index);
                    }}
                    size="small"
                    id="standard-basic"
                  />
                </form>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item>
            <Grid container direction="row">
              <Grid item xs>
                <DragIndicatorIcon className={classes.dragHandleIcon} />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item>
                <ButtonBase className={classes.moreButton}>
                  <MoreVertIcon />
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <ButtonBase
          container
          onClick={() => props.playPatternCallback(props.index)}
          justify="center"
          alignItems="center"
          className={classes.minimizedPlayButton}
        >
          <Typography noWrap>
            {props.pattern.name
              ? props.pattern.name
              : `Section ${props.index + 1}`}
          </Typography>
        </ButtonBase>
      )}
    </Paper>
  );
}
