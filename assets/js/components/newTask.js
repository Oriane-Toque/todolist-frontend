const newTask = {

  init: function() {

    // je récupère l'élément formulaire permettant l'ajout d'une tâche
    const formAddNewTask = document.querySelector('.task--add form');
    // j'ajoute l'écoute à la soumission du formulaire
    formAddNewTask.addEventListener('submit', newTask.handleNewTaskFormSubmit);
  },

  /**
   * Méthode permettant d'ajouter une tâche
   * 
   * @param {*} evt 
   */
  handleNewTaskFormSubmit: function(evt) {

    // je stoppe le comportement par défaut du navigateur
    evt.preventDefault();

    // je récupère mon select
    const selectCategoryNewTask = document.querySelector('.task--add select');
    // je récupère l'index du <option> choisi
    const choiceCategoryNewTask= selectCategoryNewTask.selectedIndex;
    // je récupère la valeur soumise
    const categoryValueNewTask = selectCategoryNewTask.options[choiceCategoryNewTask].value;


    // je récupère mon input
    const inputTitleNewTask = document.querySelector('.task--add input');
    // je récupère la valeur soumise
    const titleValueNewTask = inputTitleNewTask.value;

    // je récupère mon template
    const templateNewTask = document.getElementById("taskTemplate");
    // je le clone
    const modelNewTask = templateNewTask.content.cloneNode(true);

    // je cible le title
    const modelNewTitle = modelNewTask.querySelector('.task__title-label');
    // j'affecte le nom
    modelNewTitle.textContent = titleValueNewTask;

    // je cible la catégorie
    const modelNewCategory = modelNewTask.querySelector('.task__category p');
    // j'affecte le nom
    modelNewCategory.textContent = categoryValueNewTask;
    // je veux aussi affecter aussi au data sur task donc je le cible
    modelDataCategory = modelNewTask.querySelector('.task');
    modelDataCategory.dataset.category = categoryValueNewTask;


    console.log(modelNewTask);
    // insertion dans le DOM
    // avant le 1er enfant du parents
    document.querySelector('.tasks').prepend(modelNewTask);
  }
}