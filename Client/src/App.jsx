import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import ListArticles from './components/ListArticles';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import ShowCategories from './components/categories/ShowAllCategories';
import ShowOneCategorie from './components/categories/ShowOneCategorie';
import ArticlePage from './components/articles/ArticlePage';
import PageDashboard from './components/PageDashboard';
import ListArticlesReserched from './components/ListArticlesReserched';
import { Tribar } from './components/Navbars/Tribar';
import { SortingContext } from './components/Context/SortingContext';
import ShowOneSub from './components/articles/ShowOneSub';
import Navbar from './components/Navbars/Navbar';
import Footer from './components/Footer';
import AuthProvider from './components/Providers/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import Cart from './components/cart/Cart';
import ListCommandes from './components/ListOrders';
import Payment from './components/stripe/Payment';
import PaymentConfirm from './components/stripe/PaymentConfirm';
import PagePanier from './components/PagePanier';

import {loadStripe} from '@stripe/stripe-js';

// Configuration de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5,  // Les données restent en cache pendant 5 minutes
      staleTime: 1000 * 60,     // Les données restent "fraîches" pendant 1 minute
    },
  },
});

function App() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  const [sorted, setSorted] = useState({
    categorie: "all",
    name: null
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/listArticles" element={
              <SortingContext.Provider value={{ sorted, setSorted }}>
                <Tribar />
                <ListArticles />
              </SortingContext.Provider>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<PageDashboard />} />
            <Route path="/categorie" element={<ShowCategories />} />
            <Route path="/categorie/:id" element={<ShowOneCategorie />} />
            <Route path="/search/:search/:category_id" element={<ListArticlesReserched />} />
            <Route path='/subcategorie/:id' element={<ShowOneSub />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<ListCommandes />} />
            <Route path='/payment' element={<Payment stripePromise={stripePromise} />} />
            <Route path='/payment_confirm' element={<PaymentConfirm />} />
            <Route path='/panier' element={<PagePanier />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
