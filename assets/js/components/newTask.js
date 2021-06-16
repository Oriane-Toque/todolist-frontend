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
    const inputNameNewTask = document.querySelector('.task--add input');
    // je récupère la valeur soumise
    const nameValueNewTask = inputNameNewTask.value;

    const templateNewTask = document.getElementById("taskTemplate");
    const contentNewTask = templateNewTask.content.cloneNode(true);

    // console.log(nameValueNewTask);
    // console.log(categoryValueNewTask);
  }
}