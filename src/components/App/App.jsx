import AppHeader from '../AppHeader/AppHeader'
import AppStyles from './App.module.css'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { removeModalIngredient } from '../../services/actions/ingredients.js'
import { switchIngredientsModalState, switchOrderModalState } from '../../services/actions/modal'
import { removeOrder } from '../../services/actions/order'
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import Login from '../../pages/Login/Login'
import Base from '../Base/Base'
import Register from '../../pages/Register/Register'


function App() {
  const dispatch = useDispatch();
  const ingredientsReqest = useSelector(state => state.ingredientsData.ingredientsReqest);
  const orderData = useSelector(state => state.orderData.orderDetails);
  const isOrderModalOpen = useSelector(state => state.modalData.isOrderModalOpen);
  const isIngredientModalOpen = useSelector(state => state.modalData.isIngredientModalOpen);
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;


  const handleModalClose = () => {
    isOrderModalOpen ? dispatch(switchOrderModalState(false)) : dispatch(switchIngredientsModalState(false));
    isOrderModalOpen ? dispatch(removeOrder()) : dispatch(removeModalIngredient());
  };

  return (
    <div className={AppStyles.container} >
      {ingredientsReqest
        ? <h1>Loading...</h1>
        : <>
          <AppHeader />
          <Routes location={background || location}>
            <Route exact path='/' element={<Base />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            {/* <Route exact path='/forgot-password'>
              <ForgotPassword />
            </Route>
            <Route exact path='/reset-password'>
              <ResetPassword />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
            <Route exact path='/ingredients/:id'>
              <IngredientDetails />?????????
            </Route> */}
          </Routes>
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
