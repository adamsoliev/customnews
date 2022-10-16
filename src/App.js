import React, { useState, useEffect } from "react";
import "./App.css";

const APIKEY = "b39939aa4f6b4739b5722aa7d2dc732c";

function _extractBaseUrl(fullUrl) {
  let urlParts = fullUrl.split("/");
  let protocol = urlParts[0];
  let host = urlParts[2];
  return protocol + "//" + host;
}

function _extractHost(fullUrl) {
  let urlParts = fullUrl.split("/");
  return urlParts[2];
}

function HN_Title_Row({ article, index }) {
  const baseUrl = _extractBaseUrl(article.url);
  const host = _extractHost(article.url);

  return (
    <>
      <tr>
        <td>
          <span>{index + 1}.</span>
        </td>
        <td>
          <span>
            <a className="titleurl" href={article.url} target="_blank">
              {article.title}
            </a>
            <span>
              &nbsp;(
              <a className="baseurl" href={baseUrl} target="_blank">
                {host}
              </a>
              )
            </span>
          </span>
        </td>
      </tr>
      <tr style={{ height: "5px" }}></tr>
    </>
  );
}

function App() {
  const [articles, setArticles] = useState([]);

  function fetchData() {
    fetch(`https://newsapi.org/v2/everything?q=&apiKey=${APIKEY}`)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <table>
        <tbody>
          {articles ? articles.map((article, index) => (
            <HN_Title_Row article={article} index={index} />
          )) : <p>Empty</p>}
        </tbody>
      </table>
    </div>
  );
}

export default App;
