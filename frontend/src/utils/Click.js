import { useState } from "react";
import useSound from "use-sound";
import clickUrl from "../assets/click.flac";

const Click = () => {
  const [playClick1, { stop }] = useSound(clickUrl, { volume: 0.5 });

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    playClick1();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    stop();
  };

  return { isHovering, handleMouseEnter, handleMouseLeave };
};

export default Click;
