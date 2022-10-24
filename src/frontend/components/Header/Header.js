import classes from "./Header.module.scss";
import { FirstSection } from "./FirstSection";
import { SecondSection } from "./SecondSection";

const Header = () => {
  return (
    <header className={classes.header}>
      <FirstSection />
      <SecondSection />
    </header>
  );
};

export default Header;
