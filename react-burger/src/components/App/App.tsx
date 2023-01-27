import { useState, useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import { getData } from '../../api/api'
import PropTypes from 'prop-types';

const config = {
  url: 'https://norma.nomoreparties.space/api/ingredients'
};

function App() {
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    getData(config)
      .then(res => {
        setIngredients(res.data)
      })
      .catch(error => {
        console.log('Ошибка', error)
      })
  }, []);

  if (ingredients === null) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div style={{ maxWidth: '100%' }} >
        <AppHeader />
        <main style={{ display: 'flex', margin: '0 auto', maxWidth: '1280px', columnGap: '40px', padding: '0' }}>
          <BurgerIngredients items={ingredients} />
          <BurgerConstructor items={ingredients} />
        </main>
      </div>
    );
  }
};

export default App;
