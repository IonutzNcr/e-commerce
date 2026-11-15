import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleTemplate from "./ArticleTemplate";

function ShowOneSub() {
  const [articles, setArticles] = useState([]);
  let name = useParams();
  console.log(name);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/articles/subcategory/${name.id}`)
      .then((response) => response.json())
      .then((data) => (console.log(data), setArticles(data)));
  }, [])

  return (
    <div className="bg-base-200 w-full h-full flex-col flex items-center overflow-x-hidden">
      <div className="items-center h-full w-full justify-around bg-gradient-to-r from-green-900 to-blue-900">
        <div className="flex">
          {articles.map((article) => (
            <ArticleTemplate key={article.id} article={article}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowOneSub;