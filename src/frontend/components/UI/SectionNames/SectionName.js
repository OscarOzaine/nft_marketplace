import React from "react";
import classes from "./SectionNames.module.scss";

const SectionName = (props) => {
  const fontClass = props.fontSize ? classes[props.fontSize] : '';
  const titleClasses = `${classes.title} ${fontClass}`;

  return (
    <div className={classes.box}>
      <p className={classes['sub-title']}>
        {props.subTitle}
      </p>
      <h3 className={titleClasses}>{props.children}</h3>
    </div>
  );
}

export default SectionName;