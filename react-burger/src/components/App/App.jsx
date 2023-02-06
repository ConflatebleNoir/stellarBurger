import { useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import AppStyles from './App.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients.js'

function App() {
  const dispatch = useDispatch();
  const ingredientsReqest = useSelector(state => state.ingredientsData.ingredientsReqest);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={AppStyles.container} >
      {ingredientsReqest ? <h1>Loading...</h1>
        : <>
          <AppHeader />
          <main className={AppStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </>
      }
    </div>
  );
};

export default App;
