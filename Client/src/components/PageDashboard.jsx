import React, { useContext, useState } from 'react'
import ArticlesTab from './dashboard/ArticlesTab';
import CategoriesTab from './dashboard/CategoriesTab';
import UsersTab from './dashboard/UsersTab';
import { AuthContext } from './Context/AuthContext';

export const PageDashboard = () => {

    // Déclaration de mes constantes
    const [active, setActive] = useState(null);
    const [activeTab, setActiveTab] = useState('articles');
    const [id, setId] = useState(null);

    // Ici on vérifie si l'utilisateur est admin ou non
    const {isAdmin} = useContext(AuthContext);
    let adminMessage;
    if (!isAdmin) {
        adminMessage = "You're not allowed on this page!";
        return (<div>{adminMessage}</div>)
    }

    // Ici on gère les modals
    const activeModal = (key) => {
        if (key === "add") {
            setActive("add");
        } else if (key === "update") {
            setActive("update")
        } else {
            setActive("delete")
        }
    }

    // Ici on gère les tabs
    const renderTabContent = () => {
        switch (activeTab) {
            case 'articles':
                return renderArticles();
            case 'categories':
                return renderCategories();
            case 'users':
                return renderUsers();
            default:
                return null;
        }
    }

    // C'est le return JSX de la tab articles
    const renderArticles = () => {
        return (
            <ArticlesTab
                active={active}
                activeModal={activeModal}
                setActive={setActive}
                setId={setId}
                id={id}
            />
        );
    }

    // C'est le return JSX de la tab categories
    const renderCategories = () => {
        return (
            <CategoriesTab
                active={active}
                activeModal={activeModal}
                setActive={setActive}
                setId={setId}
                id={id}
            />
        );
    };

    // C'est le return JSX de la tab users
    const renderUsers = () => {
        return (
            <UsersTab 
                active={active}
                activeModal={activeModal}
                setActive={setActive}
                setId={setId}
                id={id}
            />
        );
    };

    // C'est la fonction qui au clic sur une tab change la tab active en celle cliquée
    const handleClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='bg-gradient-to-r from-green-900 to-blue-900 w-full flex flex-col items-center p-5'>
                {/* Conditionnal rendering des acties tabs */}
                <div className="tabs tab-boxed rounded-xl border-base-100 flex gap-2">
                    <a onClick={() => handleClick('articles')}
                        className={`tab  tab-lg text-xl hover:bg-success hover:text-neutral rounded-xl transition-all duration-200 ${activeTab === 'articles' ? 'tab-active bg-success text-black' : ''}`}>Articles</a>
                    <a onClick={() => handleClick('categories')}
                        className={`tab  tab-lg text-xl hover:bg-success hover:text-neutral rounded-xl transition-all duration-200 ${activeTab === 'categories' ? 'tab-active bg-success text-black' : ''}`}>Catégories</a>
                    <a onClick={() => handleClick('users')}
                        className={`tab  tab-lg text-xl hover:bg-success hover:text-neutral rounded-xl transition-all duration-200 ${activeTab === 'users' ? 'tab-active bg-success text-black' : ''}`}>Users</a>
                </div>

                {renderTabContent()}
        </div>
    );
};

export default PageDashboard;