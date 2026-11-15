import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const ArticleDetails = () => {

  const [isLoading, setLoading] = useState(true);
  const [variations, setVariations] = useState(null)
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const { cart, setCart, cart2, user, totalArticles, setTotalArticles, totalArticles2, setTotalArticles2 } = useContext(AuthContext);
  const [articleParallel, setArticleParallel] = useState(null);

  function ArticleSpec(spec) {
    return (
      <p>{spec.caracteristique.key} : {spec.caracteristique.value}</p>
    );
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/articles/${id}`)
      .then(response => response.json())
      .then(data => {
        setArticleParallel(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);


  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/variation/${id}`)
      .then(response => response.json())
      .then(data => {
        setArticle(data);
        setVariations(data.variation);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id])


  //  =========== FONTION POUR AJOUTER AU PANIER AU CLICK ==========
  const addToStorage = (article) => {

    const existingItem = cart ? cart.find(item => item.article.id === article.id) : null
    const existingItem2 = cart2.find(item => item.article.id === article.id) || null
    const item = { article: article, quantity: 1 };

    // SI ARTICLE ABSENT DANS LE CART2
    if ((existingItem2 == null)) {
      cart2.push(item);
      setTotalArticles2(totalArticles2 + 1);
    }
    // SI ARTICLE EXISTANT DANS LE CART2
    else if ((existingItem2 !== null)) {
      existingItem2.quantity++;
      setTotalArticles2(totalArticles2 + 1);
    }
    // SI ARTICLE ABSENT LE CART2
    else if ((existingItem == null)) {
      cart2.push(item);
    }

    if (user) {
      setCart([...cart]);
    }

    localStorage.setItem('cart2', JSON.stringify(cart2));
  }
  // =========== FONTION POUR AJOUTER AU PANIER AU CLICK ==========


  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className='w-full bg-gradient-to-r from-green-900 to-blue-900'>

      {/* BLOC PRINCIPAL */}
      {article && (
        <div className='flex flex-col justify-center items-center p-2'>

          {/* BREADCRUMB */}
          <div className="text-sm text-warning breadcrumbs p-2 px-3 rounded-3xl border hover:bg-primary-content transition-all duration-200 border-black shadow-lg bg-register w-fit">
            <ul>
              <li><Link to={`/categorie/${articleParallel.subcategory.categories_id}`}>{articleParallel.subcategory.category.name}</Link></li>
              <li><Link to={`/subcategorie/${articleParallel.subcategory.name}`}>{articleParallel.subcategory.name}</Link></li>
              <li>{article.title}</li>
            </ul>
          </div>


          <div className='w-full flex h-full items-center justify-evenly gap-5 mds:flex-col mds:p-10 p-10'>

            {/* BLOC DE GAUCHE */}
            <div className='w-4/12 mds:w-6/12 mds:min-w-[320px] mds:p-0 h-full flex flex-col items-center justify-center gap-5 border-2 rounded-3xl border-transparent'>

              {/* CARD IMAGE */}
              <div className='rounded-3xl'>
                <div className='bg-register rounded-3xl mb-5'>
                  <h1 className='text-2xl text-center font-bold uppercase text-white title-break flex-wrap overflow-wrap break-word word-break break-all ss-min:p-0'>{article.title}</h1>
                  <img className='h-fit max-h-[300px] w-full object-cover rounded-b-3xl' src={variations[0]?.image} alt={variations[0]?.title} />
                </div>

                {variations[0]?.stock > 0 ? (
                  <div className="bg-success flex rounded-xl p-2 items-center justify-center w-full">
                    <p className='text-center text-black text-xl'>Produit en stock : {variations[0]?.stock} articles</p>
                  </div>
                ) : (
                  <div className="bg-error flex rounded-xl p-2 items-center justify-center w-full">
                    <p className='text-center text-black text-xl'>Produit en rupture de stock</p>
                  </div>
                )}
              </div>

              {/* DIVIDER - PRIX */}
              <div className='w-full h-fit flex items-center justify-center'>
                <div className="divider w-full text-2xl italic py-5">Prix</div>
              </div>

              {/* PRIX */}
              <div className='flex justify-center items-center flex-col gap-5 w-full border-2 rounded-3xl border-transparent bg-register p-5 transition-all duration-300 hover:bg-primary-content'>
                <p className='text-2xl font-bold'><span className='text-4xl text-primary hover:text-amber-500 transition-all duration-200'>{variations[0]?.price}€</span></p>

                <button className='btn btn-outline btn-primary' onClick={() => addToStorage(article)}>
                  Ajouter au panier
                </button>

                <a href="/cart">
                  <button className='btn btn-outline btn-primary w-[180px]'>
                    Voir le panier
                  </button>
                </a>
              </div>
            </div>

            {/* ========================================================================== */}

            {/* BLOC DE DROITE */}
            <div className='w-4/12 mds:w-6/12 mds:min-w-[320px] mds:p-0 flex flex-col items-center justify-center gap-5 border-2 rounded-3xl border-transparent p-10'>
              <div className='w-full h-full rounded-3xl flex flex-col items-center gap-5'>

                {/* DIVIDER - Description */}
                <div className='w-full h-fit flex items-center justify-center'>
                  <div className="divider max-w-[450px] w-full text-2xl italic py-5">Description</div>
                </div>

                {/* DESCRIPTION */}
                <div className='w-full border-2 rounded-3xl border-transparent bg-register p-5 transition-all duration-300 hover:bg-primary-content'>
                  <p className='text-center text-xl max-h-[250px] overflow-y-scroll'>{article.description}</p>
                </div>

                {/* DIVIDER - Specifications */}
                <div className='w-full h-fit flex items-center justify-center'>
                  <div className="divider max-w-[450px] w-full text-2xl italic py-5">Specifications</div>
                </div>

                {/* Specifications */}
                <div className='w-full border-2 rounded-3xl border-transparent bg-register p-5 transition-all duration-300 hover:bg-primary-content flex items-center justify-center'>
                  <div className='italic list-disc'>
                    {/* {console.log((JSON.parse(article.spec)))} */}
                    {JSON.parse(variations[0]?.spec).map((caracteristique) => <ArticleSpec caracteristique={caracteristique} key={caracteristique.id} />)}
                  </div>
                </div>

                {/* DIVIDER - Variations */}
                <div className='w-full h-fit flex items-center justify-center'>
                  <div className="divider max-w-[450px] w-full text-2xl italic py-5">Variations et Options</div>
                </div>

                {/* +++++ PIERRE +++++ */}
                {/* Variations */}
                {/* <div className='w-full border-2 rounded-3xl border-transparent bg-register p-5 transition-all duration-300 hover:bg-primary-content flex items-center justify-center'>
              <select>
                <option>Produit de base</option>
                {variation.map((option) => <GetOptions option={option} />)}
              </select>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;

function GetOptions(option) {
  console.log(option.title)
  return (
    <option>{option.title}</option>
  );
}