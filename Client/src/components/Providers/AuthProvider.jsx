import { AuthContext } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { useQuery } from 'react-query';

function fetchCategories() {
    return fetch("http://127.0.0.1:8000/api/categories")
        .then(response => response.json());
}

function fetchPopularArticles() {
    return fetch('http://127.0.0.1:8000/api/articles/popular_3')
        .then(response => response.json());
}

function fetchArticles() {
    return fetch('http://127.0.0.1:8000/api/articles')
    .then(response => response.json());
}

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
    const [cart2, setCart2] = useState(JSON.parse(localStorage.getItem('cart2') || '[]'));
    const [totalArticles, setTotalArticles] = useState(cart ? cart.map(item => item.quantity).reduce((acc, curr) => acc + curr, 0) : 0);
    const [totalArticles2, setTotalArticles2] = useState(cart2 ? cart2.map(item => item.quantity).reduce((acc, curr) => acc + curr, 0) : 0);

    const {
        data: categories,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError
    } = useQuery('categories', fetchCategories);

    const {
        data: articles,
        isLoading: articlesLoading,
        isError: articlesError
    } = useQuery('articles', fetchArticles);

    const {
        data: popularArticles,
        isLoading: isPopularArticlesLoading,
        isError: isPopularArticlesError
    } = useQuery('popularArticles', fetchPopularArticles);

    // Fetch categories et popularArticles au chargement de la page
    useEffect(() => {
        if (categories) {
            localStorage.setItem('categories', JSON.stringify(categories));
        }
        if (popularArticles) {
            localStorage.setItem('popularArticles', JSON.stringify(popularArticles));
        }
        if (articles) {
            localStorage.setItem('articles',JSON.stringify(articles));
        }
    }, [categories, popularArticles]);

    // Vérifie si l'user est admin
    useEffect(() => {
        if (user && user.admin === 1) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    // Fetch le panier de l'user au chargement de la page
    useEffect(() => {
        const fetchUserCart = async (userID) => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/getUserCart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userID: userID
                    })
                });

                const data = await response.json();
                setCart(data.cart);
                localStorage.setItem('cart', JSON.stringify(data.cart));
            } catch (error) {
                console.error(error);
            }
        }

        if (user) {
            fetchUserCart(user.id);
        }
        
        localStorage.setItem('cart2', JSON.stringify(cart2));
    }, [user, cart2]);

    const login = (token, user) => {
        setIsLoggedIn(true);
        setToken(token);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        setUser(null);
        setIsAdmin(false);
        setCart(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
    }

    const isLoading = isCategoriesLoading || isPopularArticlesLoading;
    const isError = isCategoriesError || isPopularArticlesError;

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout, isAdmin, isLoading, isError, cart, setCart, cart2, setCart2, totalArticles, setTotalArticles, totalArticles2, setTotalArticles2}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
