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
    // je récupère mon input
    const inputTitleNewTask = document.querySelector('.task--add input');
    // je récupère la valeur soumise
    const titleValueNewTask = inputTitleNewTask.value;

    // bis category
    const selectCategoryNewTask = document.querySelector('.task--add select');
    const categoryValueNewTask = selectCategoryNewTask.value;

    // crée un nouvelle tâche
    const newTaskElement = task.createTaskElement(titleValueNewTask, categoryValueNewTask);

    // affichage de la tâche
    tasksList.insertTaskIntoTaskList(newTaskElement);
    
  }
}