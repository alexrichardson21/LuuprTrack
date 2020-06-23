import React from "react";
import "./styles.css";
import {
  Paper,
  IconButton,
  Grid,
  makeStyles,
  Divider,
  Slider,
  useMediaQuery,
  createMuiTheme,
  CssBaseline,
  Button,
  ButtonBase
} from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import TrackHeader from "./TrackHeader";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import StopIcon from "@material-ui/icons/Stop";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.paper3,
    height: 66,
    // width: 80,
    borderRadius: 30,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(12)
    }
  },
  isPlaying: {
    background: "#297532"
  },
  isOpen: {
    borderStyle: "solid",
    borderWidth: 1
    // borderColor: theme.palette.secondary
  },
  outline: {
    borderStyle: "solid"
  },
  playButton: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(5.9),
      // borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      height: 33
    }
  },
  editButton: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(5.9),
      borderTopRightRadius: 30,
      // borderTopLeftRadius: 30,
      height: 33
    }
  },
  moreIcon: {
    position: "relative",
    left: -8,
    top: -1
  },
  dragHandleIcon: {
    position: "relative",
    left: -8,
    top: 5
  },
  playIcon: {
    position: "relative",
    left: 6,
    top: 2
  },
  editIcon: {
    position: "relative",
    left: -5,
    top: 1
  },
  closeIcon: {
    position: "relative",
    left: -8,
    top: 1
  },
  // vertDivider: {
  //   position: "relative",
  //   left: 5
  // },
  bottomRightButton: {
    width: theme.spacing(5.9),
    height: 33,
    borderBottomRightRadius: 30
  }
}));

export default function LoopBubble(props) {
  const classes = useStyles();
  const node = React.useRef();
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const handleClick = event => {
    if (node.current.contains(event.target)) {
      // inside click
      return;
    }
    setIsMouseOver(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={node}>
      <Paper
        onPointerEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        elevation={props.loopProps.isOpen ? 10 : 1}
        className={clsx(
          classes.root,
          props.isPlaying && classes.isPlaying,
          props.isOpen && classes.isOpen
        )}
      >
        {!isMouseOver && <div {...props.dragHandleProps} />}
        {isMouseOver && (
          <Grid container direction="column">
            <Grid item>
              <Grid container justify="flex-end" direction="row">
                <Grid item>
                  <ButtonBase size="small" className={classes.playButton}>
                    {!props.isPlaying ? (
                      <PlayArrowIcon
                        className={classes.playIcon}
                        style={{ fontSize: 20 }}
                        onClick={() => props.playClickCallback(props.index)}
                      />
                    ) : (
                      <StopIcon
                        className={classes.playIcon}
                        style={{ fontSize: 20 }}
                        onClick={() => props.playClickCallback(props.index)}
                      />
                    )}
                  </ButtonBase>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.vertDivider}
                />
                <Grid item>
                  <ButtonBase size="small" className={classes.editButton}>
                    {!props.isOpen ? (
                      <EditIcon
                        className={classes.editIcon}
                        style={{ fontSize: 19 }}
                        onClick={() => props.editClickCallback(props.index)}
                      />
                    ) : (
                      <CloseIcon
                        className={classes.closeIcon}
                        style={{ fontSize: 19 }}
                        onClick={() => props.editClickCallback(props.index)}
                      />
                    )}
                  </ButtonBase>
                </Grid>
              </Grid>
            </Grid>

            <Divider />

            <Grid item>
              <Grid container justify="flex-end" direction="row">
                <Grid item {...props.dragHandleProps}>
                  <DragIndicatorIcon
                    style={{ fontSize: 20 }}
                    className={classes.dragHandleIcon}
                  />
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.vertDivider}
                />
                <Grid item>
                  <ButtonBase
                    size="small"
                    focusRipple
                    className={classes.bottomRightButton}
                  >
                    <MoreVertIcon
                      style={{ fontSize: 20 }}
                      className={classes.moreIcon}
                    />
                  </ButtonBase>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
}
