import React from "react";
import "./styles.css";
import {
  Paper,
  IconButton,
  Grid,
  makeStyles,
  Divider,
  Slider,
  Button,
  ButtonBase,
  Box
} from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import TrackMenuPopup from "./TrackMenuPopup";

const useStyles = makeStyles(theme => ({
  root: {
    // position: "relative",
    // top: -8,
    height: 100,
    background: theme.palette.secondary,
    borderRadius: 15,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(25)
    }
  },
  grid: {
    height: 100
  },
  slider: {
    position: "relative",
    top: 9
  },
  moreIcon: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(12.5),
      height: 52,
      borderBottomRightRadius: 15
    },
    [theme.breakpoints.down("sm")]: {
      height: 52
      // minWidth: 200
    }
  },
  dragHandleIcon: {
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      top: 14
      // left: -36
      // width: theme.spacing(12.5),
      // height: 52,
      // borderBottomRightRadius: 15
    }
  }
}));

export default function TrackHeader(props) {
  const classes = useStyles();
  const node = React.useRef();
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  // const [isTouchStart, setIsTouchStart] = React.useState(false);
  const [volume, setVolume] = React.useState(50);
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    if (node.current.contains(event.target)) {
      // inside click
      return;
    }
    setIsMouseOver(false);
  };

  const handleMoreClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <div className={classes.grid} ref={node}>
        <Paper
          className={classes.root}
          // color='secondary'
          style={{ background: "#237893" }}
          onPointerEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => {
            setIsMouseOver(false);
          }}
        >
          {isMouseOver ? (
            <Grid container direction="column">
              <Grid item style={{ height: 45 }} {...props.dragHandleProps}>
                <Slider
                  className={classes.slider}
                  onChange={(e, v) => setVolume(v)}
                  value={volume}
                  color="secondary"
                />
              </Grid>

              <Divider />

              <Grid item>
                <Grid container justify="space-evenly" direction="row">
                  <Grid xs item {...props.dragHandleProps}>
                    <DragIndicatorIcon className={classes.dragHandleIcon} />
                  </Grid>

                  <Divider orientation="vertical" flexItem />

                  <Grid xs item>
                    <ButtonBase
                      centerRipple
                      className={classes.moreIcon}
                      onClick={handleMoreClick}
                    >
                      <MoreVertIcon />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              className={classes.grid}
              // spacing={1}
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item {...props.dragHandleProps}>
                <HeadsetIcon fontSize="large" />
              </Grid>
            </Grid>
          )}
        </Paper>
        <TrackMenuPopup
          mouseOver={() => setIsMouseOver(true)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}
