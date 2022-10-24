import React from "react";
import SectionName from '../UI/SectionNames/SectionName';
import Categories from "./Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import CardItems from "./Items/CardItems";
import classes from './MainMarket.module.scss';

const MainMarket = () => {
  return (
    <div className={classes['main-container']}>
      <SectionName
        subTitle="NFT Marketplace" 
        icon="faFire"
      >
        Super Hot Drops
        <FontAwesomeIcon
          icon={faFire} 
          fontSize="1.3rem"
        />
      </SectionName>
      <Categories />
      <CardItems />
    </div>
  );
}

export default MainMarket;
