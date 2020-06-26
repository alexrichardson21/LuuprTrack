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
  GridList
} from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MoreVertIcon from "@material-ui/icons/More";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import TrackHeader from "./TrackHeader";
import LoopBubble from "./LoopBubble";
import LoopContainer from "./LoopContainer";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PatternDrawer from "./PatternDrawer";
import clsx from "clsx";

// import HeadsetIcon from '@material-ui/icons/Headset';
const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 15,

    // width: '80%',
    borderRadius: 15,

    height: 100
  },

  tracks: {
    marginLeft: theme.spacing(1.5)
  },
  tracksOpen: {
    // marginRight: theme.spacing(25),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    width: `calc(100% - ${220}px)`
  },
  tracksClose: {
    // marginRight: theme.spacing(10),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    // overflowX: "hidden",
    width: `calc(100% - ${110}px)`
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(7) + 1
    // }
  },
  track: {
    background: "#343434",
    borderRadius: 15,
    // width: '90%',
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(4)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(4)
    }
  },
  trackContainer: {
    // width: '90%'
  },

  draggingTrack: {
    // position: 'relative',
    // top: -50,
    height: 100
  },
  outline: {
    borderStyle: "solid"
  },
  mobileHeader: {
    position: "relative",
    top: -10
  },
  slider: {
    // height: 10
    // paddingLeft: -theme.spacing(2),
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2)
  }
}));

const sampleTrackData = [
  {
    trackId: 0,
    type: "Samplr",
    volume: 50,
    muted: false,
    solo: false,
    loops: [
      {
        loopId: 0,
        isPlaying: false,
        isOpen: false
      },
      {
        loopId: 1,
        isPlaying: false,
        isOpen: false
      },
      {
        loopId: 2,
        isPlaying: false,
        isOpen: false
      }
    ]
  },
  {
    trackId: 1,
    type: "Drum Kit",
    volume: 50,
    muted: false,
    solo: false,
    loops: [
      {
        loopId: 0,
        isPlaying: false,
        isOpen: false
      },
      {
        loopId: 1,
        isPlaying: false,
        isOpen: false
      },
      {
        loopId: 2,
        isPlaying: false,
        isOpen: false
      },
      {
        loopId: 3,
        isPlaying: false,
        isOpen: false
      },
      {
        loopId: 4,
        isPlaying: false,
        isOpen: false
      }
    ]
  }
];

const samplePatternData = [
  {
    id: 0,
    name: null,
    loops: [
      {
        trackId: 0,
        loopId: 2
      }
    ],
    isPlaying: false
  },
  {
    id: 1,
    name: "Verse 1",
    loops: [
      {
        trackId: 1,
        loopId: 1
      },
      {
        trackId: 0,
        loopId: 2
      }
    ],
    isPlaying: false
  }
];

export default function Tracks() {
  const classes = useStyles();
  const [tracks, setTracks] = React.useState(sampleTrackData);
  const [patterns, setPatterns] = React.useState(samplePatternData);
  const [isDraggingTrack, setIsDraggingTrack] = React.useState(false);
  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const trackLayout = tracks.map((track, index) => (
    <Draggable
      key={`track${track.trackId}`}
      draggableId={`track${track.trackId}`}
      index={index}
    >
      {(provided, snapshot) => (
        <Grid ref={provided.innerRef} {...provided.draggableProps} item>
          <Paper className={classes.root}>
            {isDraggingTrack ? (
              <Grid
                container
                // spacing={3}
                direction={"row"}
                justify="center"
                alignItems={"center"}
                className={classes.draggingTrack}
              >
                <Grid item {...provided.dragHandleProps}>
                  <HeadsetIcon />
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                // spacing={3}
                // component={Paper}
                wrap="nowrap"
                direction={"row"}
                justify="flex-start"
                alignItems={"center"}
                className={classes.trackContainer}
              >
                <Grid item>
                  <TrackHeader
                    track={track}
                    trackType={track.type}
                    dragHandleProps={provided.dragHandleProps}
                  />
                </Grid>
                <Grid xs item style={{ marginLeft: 20 }}>
                  <LoopContainer
                    loops={track.loops}
                    trackId={track.trackId}
                    isBigScreen={isBigScreen}
                    swapLoopCallback={(i, j) => {
                      const a = tracks.slice();
                      [a[index].loops[i], a[index].loops[j]] = [
                        a[index].loops[j],
                        a[index].loops[i]
                      ];
                      setTracks(a);
                    }}
                    editClickCallback={loopIndex => {
                      // const a = tracks.slice();
                      // let b = a[i].loops.slice();
                      const a = tracks.slice();
                      const p = a[index].loops[loopIndex].isOpen;
                      // console.log(p);
                      if (!p) {
                        const b = a.map(t => ({
                          ...t,
                          loops: t.loops.map(l => ({ ...l, isOpen: false }))
                        }));

                        b[index].loops.splice(loopIndex, 1, {
                          ...b[index].loops[loopIndex],
                          isOpen: true
                        });
                        console.log(b);
                        setTracks(b);
                      } else {
                        // const a = tracks.slice();
                        a[index].loops[loopIndex].isOpen = false;
                        setTracks(a);
                      }
                    }}
                    playClickCallback={loopIndex => {
                      const a = tracks.slice();
                      let b = a[index].loops.slice();
                      const p = b[loopIndex].isPlaying;
                      if (!p) {
                        b = b.map(l => ({ ...l, isPlaying: false }));
                      }
                      a[index].loops = b;
                      // console.log(a);
                      b[loopIndex].isPlaying = !p;
                      setTracks(a);
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {/* </Paper> */}
          </Paper>
        </Grid>
      )}
    </Draggable>
  ));

  const onDragEnd = e => {
    // switch source.index and destination.index
    const a = tracks.slice();
    [a[e.source.index], a[e.destination.index]] = [
      a[e.destination.index],
      a[e.source.index]
    ];
    setTracks(a);
    setIsDraggingTrack(false);
  };

  return (
    <div
      className={clsx(classes.tracks, {
        [classes.tracksOpen]: isDrawerOpen,
        [classes.tracksClose]: !isDrawerOpen
      })}
    >
      <DragDropContext
        onDragEnd={e => onDragEnd(e)}
        onBeforeCapture={() => setIsDraggingTrack(true)}
      >
        <Droppable droppableId="tracks" direction="vertical">
          {(provided, snapshot) => (
            <Grid
              container
              direction="column"
              ref={provided.innerRef}
              spacing={0}
              // style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {trackLayout}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      <PatternDrawer
        patterns={patterns}
        playPatternCallback={i => {
          console.log(i);
          setTracks(
            tracks.map(t => ({
              ...t,
              loops: t.loops.map(l => ({ ...l, isPlaying: false }))
            }))
          );
          if (!patterns[i].isPlaying) {
            patterns[i].loops.forEach(l => {
              const trackIndex = tracks.findIndex(t => t.trackId === l.trackId);
              const a = tracks.slice();
              let b = a[trackIndex].loops.slice();
              const loopIndex = b.findIndex(m => m.loopId === l.loopId);
              const p = b[loopIndex].isPlaying;
              if (!p) {
                b = b.map(l => ({ ...l, isPlaying: false }));
              }
              a[trackIndex].loops = b;
              // console.log(a);
              b[loopIndex].isPlaying = !p;
              setTracks(a);
            });
          } else {
          }
        }}
        setNameCallback={(name, i) => {
          const a = patterns.slice();
          a[i].name = name;
          setPatterns(a);
        }}
        setOpenCallback={t => setIsDrawerOpen(t)}
        open={isDrawerOpen}
      />
    </div>
  );
}
