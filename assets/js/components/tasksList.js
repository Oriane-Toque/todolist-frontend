const tasksList = {

  init: function() {

  // lancement fonction qui ajoute des écouteurs d'évènements sur toutes les tâches
  tasksList.bindAllTasksEvents();
  },

  /**
   * méthode qui récupère tous les éléments tâches et ajoute des écouteurs d'évènements
   */
  bindAllTasksEvents: function() {
    // cible tous les éléments contenant les tâches
    const taskElementsList = document.querySelectorAll('.tasks .task');

    // je veux à chaque tour de boucle récupérer un seul élément task
    // utilisation for ... of
    for(const taskElement of taskElementsList) {

      // appelle d'une fonction qui mettrait en place les écouteurs d'évènements sur chaque élément task
      task.bindSingleTaskEvent(taskElement);
    }
  },

  /**
   * Affiche une tâche dans la liste
   * 
   * @param {*} newTaskElement 
   */
  insertTaskIntoTaskList: function(newTaskElement) {

    // insertion dans le DOM
    // avant le 1er enfant du parents
    document.querySelector('.tasks').prepend(newTaskElement);
  }
}