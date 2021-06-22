const categoriesList = {

  init: function () {

    categoriesList.loadCategoriesFromAPI();
  },

  /**
   * Methode qui récupère les données relatives aux catégories de l'API TodoList
   * 
   */
  loadCategoriesFromAPI: function () {

    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };

    fetch(app.apiRootUrl + '/categories', fetchOptions)
      .then(

        function (categoriesListJson) {
          // conversion de la reponse categoriesListJson
          objectCategoriesList = categoriesListJson.json();
          return objectCategoriesList;
        }
      )
      .then(

        function (objectCategoriesList) {
          // console.log(objectCategoriesList);

          // génère un select contenant la liste des catégories
          categoriesList.displayCategoriesList(objectCategoriesList);

        }
      )
  },

  /**
   * Méthode qui affiche la liste de catégories
   * 
   * @param {*} objectCategoriesList 
   * @returns 
   */
  displayCategoriesList: function (objectCategoriesList) {

    // je récupère mes balises qui doivent contenir mes listes déroulantes
    const contentCategoriesList = document.querySelectorAll('.select');

    // je boucle sur mes deux divs
    for (const contentCategoryList of contentCategoriesList) {

      // je crée un élément select pour mes 2 divs
      const elementSelectList = document.createElement('select'); // je parcours mon tableau d'object

      // génère la liste des catégories
      categoriesList.createOptionsList(objectCategoriesList, elementSelectList);

      // j'ajoute au DOM mes selects
      contentCategoryList.append(elementSelectList);
    }
  },

  /**
   * Méthode qui génère la liste déroulante
   * Liste des catégories
   * 
   * @param {*} objectCategoriesList 
   * @param {*} elementSelectList 
   * @returns 
   */
  createOptionsList: function (objectCategoriesList, elementSelectList) {
    // je boucle sur mon tableau d'objets contenant les catégories
    for (const category of objectCategoriesList) {

      // crée une balise option à chaque tour de boucle
      const elementOptionList = document.createElement('option');
      // je lui affecte le nom de la catégorie
      elementOptionList.textContent = category.name;

      // puis j'ajoute à chaque tour de boucle option à son parent select
      elementSelectList.appendChild(elementOptionList);
    }
    // console.log(elementSelectList);
    return elementSelectList;
  }
}