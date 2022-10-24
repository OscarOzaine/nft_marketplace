import classes from './Button.module.scss';

const Button = (props) => {
  const fontClass = props.size ? classes[props.size] : "";
  const typeClass = props.typeClass ? classes[props.typeClass] : "";

  const titleClasses = `${classes.button} ${fontClass} ${typeClass}`;

  return (
    <button
      onClick={props.onClick}
      className={titleClasses}
    >
      {props.children}
    </button>
  );
};

export default Button;
