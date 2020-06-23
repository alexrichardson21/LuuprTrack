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
  ButtonBase,
  Drawer,
  GridList,
  GridListTile
} from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MoreVertIcon from "@material-ui/icons/More";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import TrackHeader from "./TrackHeader";
import LoopBubble from "./LoopBubble";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const sections = ["yuh huh", "ya bish", "jabrony"];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
    // marginRight: 135,
  },
  horizontalScroll: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    // display: 'flex',
    flexWrap: "nowrap",
    transform: "translateZ(0)"
    // justifyContent: 'space-around',
    // overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  hoverOver: {
    background: "#111111"
  },
  drawerPaper: {
    background: "transparent",
    boxShadow: "none",
    borderStyle: "none"
    // width: 150,
    // color: "#111111"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  offset: theme.mixins.toolbar
}));

export default function LoopContainer(props) {
  const classes = useStyles();
  const [isGrabbedLoop, setIsGrabbedLoop] = React.useState(false);
  const drawer = (
    <Drawer
      anchor="right"
      classes={{
        paper: classes.drawerPaper
      }}
      variant="permanent"
      open
    >
      <Droppable isCombineEnabled droppableId="sections" direction="vertical">
        {(provided, snapshot) => (
          <Grid
            container
            direction="column"
            spacing={3}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {sections.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided, snapshot) => (
                  <Grid
                    item
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={
                      snapshot.combineWith ? classes.hoverOver : classes.section
                    }

                    // style={getItemStyle(
                    //   snapshot.isDragging,
                    //   provided.draggableProps.style
                    // )}
                  >
                    <VolumeOffIcon
                    // items={item.loops.length}
                    // color={item.color}
                    />
                  </Grid>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Drawer>
  );

  const loops =
    props.loops &&
    props.loops.map((loop, index) => (
      <Draggable
        key={`loop${loop.loopId}`}
        draggableId={`loop${loop.loopId}`}
        index={index}
      >
        {(provided, snapshot) => (
          <Grid
            key={`loop${loop.loopId}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            item
          >
            <LoopBubble
              index={index}
              loopProps={loop}
              isOpen={loop.isOpen}
              isPlaying={loop.isPlaying}
              playClickCallback={props.playClickCallback}
              editClickCallback={props.editClickCallback}
              dragHandleProps={provided.dragHandleProps}
            />
          </Grid>
        )}
      </Draggable>
    ));

  const onDragEnd = e => {
    props.swapLoopCallback(e.source.index, e.destination.index);
    setIsGrabbedLoop(false);
  };

  return (
    <DragDropContext
      onDragEnd={e => onDragEnd(e)}
      onBeforeCapture={() => setIsGrabbedLoop(true)}
    >
      {isGrabbedLoop && drawer}
      <Droppable droppableId={`loops${props.trackId}`} direction={"horizontal"}>
        {(provided, snapshot) => (
          // <div className={classes.horizontalScroll}>
          <Grid
            container
            direction={"row"}
            ref={provided.innerRef}
            spacing={2}
            wrap="nowrap"
            // className={classes.gridList}
            // style={{ whiteSpace: "nowrap" }}
            // style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {loops}

            {provided.placeholder}
          </Grid>
          // </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
