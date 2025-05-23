import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Routes from './config/Routes';
import { WishlistProvider } from './contexts/WishlistContext';

function App() {
    return (
        <WishlistProvider>
            <BrowserRouter>
                <Header />
                <Routes />
                <Footer />
            </BrowserRouter>
        </WishlistProvider>
    );
}

export default App;