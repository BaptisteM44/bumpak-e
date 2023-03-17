import { useState } from "react";
import useSound from "use-sound";
import clickUrl from "../assets/click.flac";
import click2Url from "../assets/click2.wav";
import clickBag from "../assets/bubble.ogg"

const Click = () => {
const [playClick1, { stopClick1 }] = useSound(clickUrl, { volume: 0.5 });
const [playClick2] = useSound(click2Url);
const [playClick3] = useSound(clickBag);

const [isHovering, setIsHovering] = useState(false);

const handleMouseEnter = () => {
setIsHovering(true);
playClick1();
};

const handleMouseLeave = () => {
setIsHovering(false);
stopClick1();
};

const handleClick = () => {
playClick2();
};
const handleClickBag = () => {
  playClick3();
  };

return { isHovering, handleMouseEnter, handleMouseLeave, handleClick, handleClickBag };
};

export default Click;