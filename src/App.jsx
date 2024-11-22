import React, {useState} from 'react'
import Home from './Home';
import TodoList from './ToDoList/TodoList';
import CountdownTimer from './Counter/Counter';
import ProfileCard from './ProfileCard/ProfileCard';
import Signup from './Form/Signup';
import Products from './Cart/components/Products';
import Cart from './Cart/components/Cart';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  function removeAllItems(){
    setCartItems([]);
  }

  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/todolist' element={<TodoList />} />
      <Route path='/counter' element={<CountdownTimer />} />
      <Route path='/profile' element={<ProfileCard />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/products' element={<Products addToCart={addToCart}/>} />
      <Route path='/cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} removeAllItems={removeAllItems}/>} />
    </Routes>
  </div>
  )
}

export default App;
