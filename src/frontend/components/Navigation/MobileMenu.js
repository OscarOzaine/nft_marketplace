import React, { useState } from 'react';
import menuClass from './MobileMenu.module.scss';
import Button from '../UI/Button';
import useWindowSize from '../../hooks/use-windowSize';

const MobileMenu = (props) => {
  const { account } = props;
  const [isOpen, setIsOpen] = useState(false);

  const size = useWindowSize();
  const miniMobile = +size.width <= 475;

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  const hamClass = isOpen
    ? `${menuClass.hamburger} ${menuClass['hamburger--active']}`
    : menuClass.hamburger;

  const listClass = isOpen
    ? `${menuClass.navigation} ${menuClass['navigation--active']}`
    : menuClass.navigation;

  if (account) {
    
    return (
      <div className={menuClass.box}>
      <button className={hamClass} onClick={openHandler}>
        <span className={menuClass['hamburger-box']}>
          <span className={menuClass['hamburger-inner']}></span>
        </span>
      </button>
      <div className={listClass}>
        <ul className={menuClass['navigation-list']}>
          <li className={menuClass['navigation-item']}>
            <a href="/marketplace">
              Marketplace
            </a>
          </li>
          <li className={menuClass['navigation-item']}>
            <a href="/create">
              Create
            </a>
          </li>
          <li className={menuClass['navigation-item']}>
            <a href="/my-listed-items">
              My Listed Items
            </a>
          </li>
          <li className={menuClass['navigation-item']}>
            <a href="/my-purchases">
              My Purchases
            </a>
          </li>
          {miniMobile && (
            <Button>
              Sign in
            </Button>
          )}
        </ul>
      </div>
    </div>
    );
  }

  return (
    <div className={menuClass.box}>
      <button className={hamClass} onClick={openHandler}>
        <span className={menuClass['hamburger-box']}>
          <span className={menuClass['hamburger-inner']}></span>
        </span>
      </button>
      <div className={listClass}>
        <ul className={menuClass['navigation-list']}>
          <li className={menuClass['navigation-item']}>
            <a href="#">
                Explore
            </a>
          </li>
          <li className={menuClass['navigation-item']}>
            <a href="#">
                Marketplace
            </a>
          </li>
          {miniMobile && (
            <Button>
              Sign in
            </Button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
