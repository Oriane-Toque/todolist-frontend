const categoriesList = {

  apiBaseUrl: 'https://benoclock.github.io/S07-todolist',

  init: function() {

    categoriesList.loadCategoriesList();
  },

  /**
   * Methode qui récupère les données relatives aux catégories de l'API TodoList
   * 
   */
  loadCategoriesList: function() {

    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };

    fetch(categoriesList.apiBaseUrl + '/categories.json', fetchOptions)
      .then(

        function(categoriesListJson) {
          // conversion de la reponse categoriesListJson
          objectCategoriesList = categoriesListJson.json();
          return objectCategoriesList;
        }
      )
      .then(

        function(objectCategoriesList) {
          console.log(objectCategoriesList);
        }
      )
  }

}