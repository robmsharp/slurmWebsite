import React from "react";
import icon_up1 from '../icons/squareupkey1.png';
import icon_up2 from '../icons/squareupkey2.png';

import icon_down1 from '../icons/squaredownkey1.png';
import icon_down2 from '../icons/squaredownkey2.png';

import icon_left1 from '../icons/squareleftkey1.png';
import icon_left2 from '../icons/squareleftkey2.png';

import icon_right1 from '../icons/squarerightkey1.png';
import icon_right2 from '../icons/squarerightkey2.png';

import icon_a1 from '../icons/akey1.png';
import icon_a2 from '../icons/akey2.png';

import icon_b1 from '../icons/bkey1.png';
import icon_b2 from '../icons/bkey2.png';

import { Stage, Layer, Image } from "react-konva";

import useImage from 'use-image';

const Keyboard = ({ upKey, downKey, leftKey, rightKey, aKey, bKey, handleMouseUp, handleMouseDown }) => {

    const [upPressed] = useImage(icon_up2);
    const [upReleased] = useImage(icon_up1);

    const [downPressed] = useImage(icon_down2);
    const [downReleased] = useImage(icon_down1);

    const [leftPressed] = useImage(icon_left2);
    const [leftReleased] = useImage(icon_left1);

    const [rightPressed] = useImage(icon_right2);
    const [rightReleased] = useImage(icon_right1);

    const [aPressed] = useImage(icon_a2);
    const [aReleased] = useImage(icon_a1);

    const [bPressed] = useImage(icon_b2);
    const [bReleased] = useImage(icon_b1);

    return (
        <>
            
            <Stage width={400} height={100}>
                <Layer>

                <Image
                        image={upKey.pressed ? upPressed : upReleased}
                        x={upKey.x}
                        y={upKey.pressed ? upKey.y1 : upKey.y2}
                        onMouseDown={() => handleMouseDown(upKey.keycode)}
                        onMouseUp={() => handleMouseUp(upKey.keycode)}
                        onMouseLeave={() => handleMouseUp(upKey.keycode)}
                    />

<Image
  image={downKey.pressed ? downPressed : downReleased}
  x={downKey.x}
  y={downKey.pressed ? downKey.y1 : downKey.y2}
  onMouseDown={() => handleMouseDown(downKey.keycode)}
  onMouseUp={() => handleMouseUp(downKey.keycode)}
  onMouseLeave={() => handleMouseUp(downKey.keycode)}
/>

<Image
  image={leftKey.pressed ? leftPressed : leftReleased}
  x={leftKey.x}
  y={leftKey.pressed ? leftKey.y1 : leftKey.y2}
  onMouseDown={() => handleMouseDown(leftKey.keycode)}
  onMouseUp={() => handleMouseUp(leftKey.keycode)}
  onMouseLeave={() => handleMouseUp(leftKey.keycode)}
/>

<Image
  image={rightKey.pressed ? rightPressed : rightReleased}
  x={rightKey.x}
  y={rightKey.pressed ? rightKey.y1 : rightKey.y2}
  onMouseDown={() => handleMouseDown(rightKey.keycode)}
  onMouseUp={() => handleMouseUp(rightKey.keycode)}
  onMouseLeave={() => handleMouseUp(rightKey.keycode)}
/>

<Image
  image={aKey.pressed ? aPressed : aReleased}
  x={aKey.x}
  y={aKey.pressed ? aKey.y1 : aKey.y2}
  onMouseDown={() => handleMouseDown(aKey.keycode)}
  onMouseUp={() => handleMouseUp(aKey.keycode)}
  onMouseLeave={() => handleMouseUp(aKey.keycode)}
/>

<Image
  image={bKey.pressed ? bPressed : bReleased}
  x={bKey.x}
  y={bKey.pressed ? bKey.y1 : bKey.y2}
  onMouseDown={() => handleMouseDown(bKey.keycode)}
  onMouseUp={() => handleMouseUp(bKey.keycode)}
  onMouseLeave={() => handleMouseUp(bKey.keycode)}
/>

                    
                    </Layer></Stage>
        </>
    );

};

export default Keyboard;