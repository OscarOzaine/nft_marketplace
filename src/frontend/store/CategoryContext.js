import { createContext } from 'react';

const CategoryContext = createContext({
  category: '',
  changeCategory: (name) => {},
});

export default CategoryContext;
