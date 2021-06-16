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

    console.log('ajout tache');
  }
}