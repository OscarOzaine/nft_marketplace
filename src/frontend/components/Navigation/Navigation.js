import classes from './Nav.module.scss';

import useWindowSize from '../../hooks/use-windowSize';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import Button from '../UI/Button';

export const Navigation = (props) => {
  const { web3Handler, account } = props;
  const size = useWindowSize();
  const desktop = +size.width >= 1024;
  const mobile = +size.width <= 1023;
  const miniMobile = +size.width <= 475;
  
  return (
    <nav className={classes.nav}>
      <h1 className={classes.title}>
        Marketplace
      </h1>
      {desktop && (
        <DesktopMenu 
          account={account}
        />
      )}
      <div className={desktop ? classes.wrapper : classes['wrapper-mobile']}>
        {(!miniMobile && account) && (
          <Button variant="outline-light">
              {account.slice(0, 5) + '...' + account.slice(38, 42)}
          </Button>
        )}
        {(!miniMobile && !account) && (
          <Button onClick={web3Handler} variant="outline-light">
            Connect
          </Button>
        )}
      </div>
      {mobile && (
        <MobileMenu
          account={account}
        />
      )}
    </nav>
  );
};

export default Navigation;
