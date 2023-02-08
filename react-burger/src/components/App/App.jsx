import { useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import AppStyles from './App.module.css'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, getIngredients, removeModalIngredient } from '../../services/actions/ingredients.js'
import { switchIngredientsModalState, switchOrderModalState } from '../../services/actions/modal'
import { removeOrder } from '../../services/actions/order'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const ingredientsReqest = useSelector(state => state.ingredientsData.ingredientsReqest);
  const orderData = useSelector(state => state.orderData.orderData);
  const isOrderModalOpen = useSelector(state => state.modalData.isOrderModalOpen);
  const isIngredientModalOpen = useSelector(state => state.modalData.isIngredientModalOpen);
  const initIngredients = useSelector(state => state.ingredientsData.ingredientsList);
  const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    isOrderModalOpen ? dispatch(switchOrderModalState(false)) : dispatch(switchIngredientsModalState(false));
    isOrderModalOpen ? dispatch(removeOrder()) : dispatch(removeModalIngredient());
  };

  const handleDrop = (itemId) => {
    const currentItem = initIngredients.find(item => item._id === itemId._id);
    const currentBun = currentIngredients.find(item => item.type === 'bun');
    const currentBunIndex = currentIngredients.indexOf(currentBun);

    if (currentItem.type === 'bun' && currentBun) {
      const currentItemCopy = currentIngredients.slice();
      currentItemCopy.splice(currentBunIndex, 1, currentItem);
      dispatch(addIngredient(currentItemCopy));
    } else {
      dispatch(addIngredient([...currentIngredients, currentItem]));
    }
  }

  return (
    <div className={AppStyles.container} >
      {ingredientsReqest
        ? <h1>Loading...</h1>
        : <>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <main className={AppStyles.main}>
              <BurgerIngredients />
              <BurgerConstructor onDropHandler={handleDrop} />
            </main>
          </DndProvider>
          {isIngredientModalOpen && (
            <Modal title={'Детали ингредиента'} handleModalClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          )}
          {isOrderModalOpen && (
            <Modal handleModalClose={handleModalClose}>
              {orderData ? <OrderDetails /> : <p>Loading...</p>}
            </Modal>
          )}
        </>
      }
    </div>
  );
};

export default App;
