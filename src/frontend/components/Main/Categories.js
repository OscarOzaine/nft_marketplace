import { useContext } from "react";
import classes from './Categories.module.scss';
import CategoryContext from '../../store/CategoryContext';

const Categories = () => {
  const CategoryCtx = useContext(CategoryContext);

  const changeCategory = (name) => {
    CategoryCtx.changeCategory(name);
  };
  const currCategory = CategoryCtx.category;

  const category = [
    { id: 0, name: "Art", apiName: "art" },
    { id: 1, name: "Music", apiName: "music" },
    { id: 2, name: "Sport", apiName: "sport" },
    { id: 3, name: "Photography", apiName: "photography" },
    { id: 4, name: "Virtual Worlds", apiName: "virtualWords" },
    { id: 5, name: "Utility", apiName: "utility" },
    { id: 6, name: "Collectibles", apiName: "collectibles" },
  ];

  const categories = category.map((item) => {
    const checkActive = currCategory === item.apiName ? classes.active : null;
    return (
      <li key={item.id}>
        <button
          name={item.name}
          onClick={() => changeCategory(item.apiName)}
          className={checkActive}
        >
          {item.name}
        </button>
      </li>
    );
  });

  return (
    <div className={classes.categories}>
      <ul>{categories}</ul>
    </div>
  );
};

export default Categories;
