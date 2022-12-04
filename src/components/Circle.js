import React from "react";
import styles from "./circle.module.css";

import { useState, useEffect } from "react";

import image from "./image2.png"


import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Circle() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(35);
  const [amount, setAmount] = useState(1.5);
  const [progress, setProgress] = useState(0);
  const [start, setStart] = useState(true);


  useEffect(() => {
      let x = sec,
        y = min;

    const interval = setInterval(() => {
      if ((x === 0 && y === 0) || start === false) {
        setStart(false);
        return;
      }
      console.log(x, y, y + x / 60);

      if (x < 1) {
        setSec(59);
        setMin(y - 1);
      } else if (x < 60) {
        --x;
        setSec(x);
      }
      setProgress((y + x / 60) / amount);
      console.log(progress);
    }, 1000);

    return () => {
        
      clearInterval(interval);
    };
  }, [sec, start, progress]);

  const increase = () => {
    if (start === false) {
      setStart(true);
    }
    if (sec + 10 > 59) {
      setMin(min + 1);
      setSec(sec + 10 - 60);
    } else {
      setSec(sec + 10);
    }
  };

  return (
    <>
      <div className={styles.whole}>
        <h2>Routine Starting in...</h2>
        <p>sub heading here</p>
        <CircularProgressbar
          className={styles.progress}
          value={progress}
          maxValue={1}
          text={
            (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec)
          }
          styles={buildStyles({
            pathTransitionDuration: 0.2,
            trailColor: "#d6d6d6",
            pathColor: `rgba(108,62,119,255)`,
            textColor: "#2e2e2e",
          })}
        />
      </div>

      <div className={styles.btn}>
        <button  onClick={increase}>
        <b>+10 sec</b> 
        </button>


        <button  >
         <b> skip</b> 
        </button>
      </div>

      <div className={styles.steps}>
        
          <b>Steps 2/3</b> 
        
        <img src={image}/>
        <h2>Cleansing</h2>
      </div>
    </>
  );
}
