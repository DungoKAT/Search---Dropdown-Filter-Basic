import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Commponents
import Header from './Components/Header';
import ShopPage from './Components/ShopPage';
import CartPage from './Components/CartPage';

// CSS
import './App.css';

function App() {
    return (
        <Router>
            <div className="page-app">
                <Header/>
                <div className="container">
                    <Routes>
                        <Route path='/shop-page' element={<ShopPage/>} exact/>
                        <Route path='/cart-page' element={<CartPage/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
        
    );
}

export default App;
