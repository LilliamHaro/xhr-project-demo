window.addEventListener('load', function() {
  // obteniendo elementos del dom
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;

  form.addEventListener('submit', function(event) {
    // preventDefault para el evento submit
    event.preventDefault();
    // vaciando el contenedor de articulos por cada nueva busqueda
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
  });

  function getNews() {
    // instanciando el objeto XMLHttpRequest para el funcionamiento de ajax
    const articleRequest = new XMLHttpRequest();
    //haciendo el pedido de información -no olvidar las comilla para el concatendado de em6-
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=117c28a425a1454c87487ddf839178f7`);
    // funciones
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
  }
  //funcion para manejar los errores
  function handleError() {
    console.log('se ha presentado un error');
  }

  function addNews() {
    // parseando a json para acceder a su propiedades
    const data = JSON.parse(this.responseText);
    const response = data.response.docs;
    // recooriendo todos los articulo
    response.forEach(function(article) {
      // obteniendo propiedades
      const snippet = article.snippet;
      const urlArt = article.web_url;
      // manipulando el dom para mostrar la informacion ordenadamente
      let div = document.createElement('div');
      let li = document.createElement('li');
      let a = document.createElement('a');
      li.innerText = snippet;
      a.innerText = '(Ir al artículo)'
      a.setAttribute('href',urlArt);
      a.setAttribute('target','_blank');
      li.appendChild(a);
      div.appendChild(li);
      responseContainer.appendChild(div);
      console.log(article);
    });
  }
});
