import { useState, useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
// import AppStyles from './App.module.css'

const config = {
  url: 'https://norma.nomoreparties.space/api/ingredients'
};

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(`${config.url}`)
      .then(res => res.json())
      .then(res => setIngredients(res.data))
      .catch(error => {
        console.log('Ошибка', error)
      })
  }, [])

  return (
    <div style={{ maxWidth: '1920px' }} >
      <AppHeader />
      <main style={{ display: 'flex', justifyContent: 'center', margin: '0 auto', maxWidth: '1280px', columnGap: '40px', padding: '0' }}>
        <BurgerIngredients items={ingredients} />
        <BurgerConstructor items={ingredients} />
      </main>
    </div>
  );
}

export default App;
