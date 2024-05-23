// scripts.js

const fetchArticles = () => {
  fetch("http://localhost:3000/api/article")
    .then((response) => response.json())
    .then((articles) => {
      const articlesDiv = document.getElementById("articles");
      articlesDiv.innerHTML = "";
      articles.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.className = "article";
        articleElement.innerHTML = `
                  <h3>${article.title}</h3>
                  <p>${article.content}</p>
                  <small>${new Date(article.date).toLocaleString()}</small>
              `;
        articlesDiv.appendChild(articleElement);
      });
    })
    .catch((error) => console.error("Error fetching articles:", error));
};

const submitArticle = () => {
  const form = document.getElementById("article-form");
  const formData = new FormData(form);
  const articleData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  fetch("http://localhost:3000/api/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  })
    .then((response) => response.json())
    .then((article) => {
      form.reset();
      alert("Article submitted successfully!");
    })
    .catch((error) => console.error("Error submitting article:", error));
};
