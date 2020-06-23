import React from "react";
import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HeadsetIcon from "@material-ui/icons/Headset";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

export default function TrackMenuPopup(props) {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isSolo, setIsSolo] = React.useState(false);

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
        onMouseOver={props.mouseOver}
      >
        <MenuItem onClick={() => setIsSolo(!isSolo)}>
          <HeadsetIcon color={isSolo ? "primary" : "inherit"} />
          Solo
        </MenuItem>
        <MenuItem onClick={() => setIsMuted(!isMuted)}>
          <VolumeOffIcon color={isMuted ? "secondary" : "inherit"} />
          Mute
        </MenuItem>
      </Menu>
    </div>
  );
}
