import React from "react";
import classes from "./SecondSection.module.scss";
import img1 from "../../images/23849c1670acb9074d937496770589bf.png";
import img2 from "../../images/65803eef9bde1b76f0df2b649c759901.png";
import img3 from "../../images/ff55bdc0e9a44f55dd5046f0b632983f.png";
import img4 from "../../images/6d02967c76df9dd4f6c48e329500a17b.png";

export function SecondSection() {
  return (
    <div className={classes["second-section"]}>
      <img src={img1} alt="" className={classes["main-img"]} />
      <div className={classes["info-box"]}>
        <h3>Monkey Apes</h3>
        <div className={classes.avatars}>
          <img src={img1} alt="" className={classes["av-item"]} />
          <img src={img3} alt="" className={classes["av-item"]} />
          <img src={img2} alt="" className={classes["av-item"]} />
          <img src={img4} alt="" className={classes["av-item"]} />
        </div>
      </div>
      <div className={classes["count-box"]}>
        <div className={classes.item}>
          <p className={classes["sub-title"]}>Current Bid</p>
          <span className={classes.info}>0.45 ETH</span>
        </div>
        <div className={classes.item}>
          <p className={classes["sub-title"]}>Hodlers</p>
          <span className={classes.info}>900 Hodlers</span>
        </div>
        <div className={classes.item}>
          <p className={classes["sub-title"]}>Ending In</p>
          <span className={classes.info}>10h 32m 26s</span>
        </div>
      </div>
    </div>
  );
}
