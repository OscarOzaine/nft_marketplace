import desktopClasses from './DesktopMenu.module.scss';
import {
    Link
} from 'react-router-dom';
import { Nav } from 'react-bootstrap'

const DesktopMenu = (props) => {
  const { account } = props;

  if (account) {
    return (
      <ul className={desktopClasses.list}>
        <Nav.Link as={Link} to="/marketplace">
          Marketplace
        </Nav.Link>
        <Nav.Link as={Link} to="/create">
          Create
        </Nav.Link>
        <Nav.Link as={Link} to="/my-listed-items">
          My Listed Items
        </Nav.Link>
        <Nav.Link as={Link} to="/my-purchases">
          My Purchases
        </Nav.Link>
      </ul>
    );
  }

  return (
    <ul className={desktopClasses.list}>
      <Nav.Link as={Link} to="/">
        Explore
      </Nav.Link>
      <Nav.Link as={Link} to="/marketplace">
        Marketplace
      </Nav.Link>
    </ul>
  );
};

export default DesktopMenu;
