import React from "react";
import ReactDOM from "react-dom";
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
  ButtonBase
} from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MoreVertIcon from "@material-ui/icons/More";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import TrackHeader from "./TrackHeader";
import LoopBubble from "./LoopBubble";
import LoopContainer from "./LoopContainer";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import App from "./App";
const theme = createMuiTheme({
  palette: {
    type: "dark",
    paper2: "#343434",
    paper3: "#656565",
    drumKit: "#e56b6f",
    samplr: "#d8bbff"
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    {/* <CssBaseline /> */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);
