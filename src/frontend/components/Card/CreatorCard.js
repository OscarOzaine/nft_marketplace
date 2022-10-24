import classes from "./CreatorCard.module.scss";
import eth from "../../images/Eth.png";

export const CreatorCard = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes["data-box"]}>
        <div className={classes["main-bgc"]}>
          <div
            className={classes.creatorImage}
            style={{ backgroundImage: `url(${props.img})` }}
          ></div>
        </div>
        <div className={classes.data}>
          <h3>{props.name}</h3>
          <div className={classes["value-box"]}>
            <div className={classes.bgc}>
              <img src={eth} alt="" />{" "}
            </div>
            <p>{props.totalVolume}</p>
          </div>
        </div>
      </div>
      <div className={classes.dots}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
