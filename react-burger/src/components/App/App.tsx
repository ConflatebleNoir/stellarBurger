import React from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
// import appStyles './App.module.css'

const config = {
  url: 'https://norma.nomoreparties.space/api/ingredients'
};

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    fetch(`${config.url}`)
      .then(res => res.json())
      .then(res => setIngredients(res.data))
      .catch(error => {
        console.log('Ошибка', error)
      })
  }, [])

  return (
    <div >
      <AppHeader />
      <main >
        <BurgerIngredients items={ingredients} />
        <BurgerConstructor items={ingredients} />
      </main>
    </div>
  );
}

export default App;
