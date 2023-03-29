import { useEffect, FC } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import AppStyles from './App.module.css'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import { getIngredients, removeModalIngredient } from '../../services/actions/ingredients'
import { switchIngredientsModalState, switchOrderFeedModalState, switchOrderModalState } from '../../services/actions/modal'
import { removeOrder } from '../../services/actions/order'
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import Login from '../../pages/Login/Login'
import Base from '../Base/Base'
import Register from '../../pages/Register/Register'
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword'
import ResetPassword from '../../pages/ResetPassword/ResetPassword'
import Profile from '../../pages/Profile/Profile'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import NotFound from '../../pages/NotFound/NotFound'
import Loader from '../Loader/Loader'
import Feed from '../../pages/Feed/Feed'
import { useDispatch, useSelector } from '../../services/hooks/hooks'
import OrderInfoFull from '../OrderInfoFull/OrderInfoFull'
import { setWipeOrderData } from '../../services/actions/generalOrders'
import { reachUserData } from '../../services/actions/user'


const App: FC = () => {
  const dispatch = useDispatch();
  const ingredientsReqest = useSelector((state) => state.ingredientsData.ingredientsRequest);
  const orderData = useSelector((state) => state.orderData.orderDetails);
  const isOrderModalOpen = useSelector((state) => state.modalData.isOrderModalOpen);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const accessToken = useSelector((state) => state.userData.accessToken);
  const orderNumber = useSelector((state) => state.generalOrders.orderData?.number);

  const handleIngredientModalClose = () => {
    dispatch(switchIngredientsModalState(false));
    dispatch(removeModalIngredient());
    navigate(state?.background.pathname);
  }

  const handleOrderDetailsClose = () => {
    dispatch(switchOrderModalState(false));
    dispatch(removeOrder());
  }

  const handleOrderInfoModalClose = () => {
    dispatch(switchOrderFeedModalState(false));
    navigate(state?.background.pathname);
    dispatch(setWipeOrderData());
    console.log(state?.background);
  }

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(reachUserData(accessToken));
  }, [dispatch, accessToken]);

  console.log(state?.background)
  return (
    <div className={AppStyles.container} >
      {ingredientsReqest
        ? <Loader />
        : <>
          <AppHeader />
          <Routes location={state?.background || location}>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Base />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/profile/*' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='*' element={<NotFound />} />
            <Route path='/ingredients/:id' element={<IngredientDetails heading="Детали ингредиента" />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/feed/:orderNumber' element={<OrderInfoFull isModal={false} />} />
            <Route path='/profile/orders/:orderNumber' element={<OrderInfoFull isModal={false} />} />
          </Routes>
          {state?.background && (
            <Routes>
              <Route path='/ingredients/:id' element={
                <Modal
                  title={'Детали ингредиента'}
                  handleModalClose={handleIngredientModalClose}
                >
                  <IngredientDetails />
                </Modal>
              } />
            </Routes>
          )}
          {state?.background && (
            <Routes>
              <Route path='/feed/:orderNumber' element={
                <Modal
                  title={`#${orderNumber}`}
                  number={true}
                  handleModalClose={handleOrderInfoModalClose}
                >
                  <OrderInfoFull isModal={true} />
                </Modal>
              } />
            </Routes>
          )}
          {state?.background && (
            <Routes>
              <Route path='/profile/orders/:orderNumber' element={
                <Modal
                  title={`#${orderNumber}`}
                  number={true}
                  handleModalClose={handleOrderInfoModalClose}
                >
                  <OrderInfoFull isModal={true} />
                </Modal>
              } />
            </Routes>
          )}
          {isOrderModalOpen && (
            <Modal handleModalClose={handleOrderDetailsClose}>
              {orderData ? <OrderDetails /> : <Loader />}
            </Modal>
          )}
        </>
      }
    </div>
  );
};

export default App;
