const newTaskForm = {


  // initialisation du composant
  init: function () {
    newTaskForm.bindNewTaskFormEventListener();
  },

  /**
   * Méthode pour l'ajout d'un  eventlistener liés au formulaire d'ajout d'une tâche
   */
  bindNewTaskFormEventListener: function () {
    // on récupère le formulaire d'ajout d'un" tache (le form qui est dans un element de classe task--add)
    const newTaskFormElement = document.querySelector('.task--add form');

    newTaskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);

  },

  /**
   * Méthode gérant la soumission du formulaire d'ajout de tâche
   * 
   * @param {*} evt 
   */
  handleNewTaskFormSubmit: function (evt) {
    // on empeche la page de se recharger :
    evt.preventDefault();
    // recupération du form
    const newTaskFormElement = evt.currentTarget;
    // récupération de l'input
    const taskTitleFieldElement = newTaskFormElement.querySelector('.task__title-field');
    // récupération de la valeur de l'input
    const newTaskTitle = taskTitleFieldElement.value;

    // récupération de l'élément select
    const categoryElement = newTaskFormElement.querySelector('.task__category select');
    const newTaskCategoryName = categoryElement.value;

    // clear formulaire
    newTaskFormElement.reset();

    // ci dessous je remet le focus après soumission du formulaire
    taskTitleFieldElement.focus();

    // si le formulaire a été dumement remplis
    if (newTaskForm.checkAddNewTask(newTaskTitle) === true) {

      // si présence d'un message d'erreur : suppression du message
      const errorAddTask = document.querySelector('form > p');
      app.deleteErrorMessage(newTaskFormElement, errorAddTask);

      // j'imagine une methode qui va nous permettre de créer une nouvelle tache
      // cette methode va recevoir 2 arguments : le nom de la tache et le nom de la categorie
      const newTaskElement = task.createTaskElement(newTaskTitle, newTaskCategoryName);
      // j'imagine une methode dont le but sera de nous afficher la tache ( l'inserer dans la lsite des taches);
      tasksList.insertTaskIntoTasksList(newTaskElement);
    }
    // sinon message d'erreur
    else {

      const errorMessage = "Veuillez indiquer le titre de la tâche";
      // génère et affiche un message d'erreur
      app.addErrorMessage(newTaskFormElement, errorMessage);

    }

  },

  /**
   * Méthode qui vérifie si le titre de la tâche a été indiqué
   * 
   * @param {*} newTaskTitle 
   * @return {bool} 
   */
  checkAddNewTask: function (newTaskTitle) {

    if (newTaskTitle === "") {
      console.log(false);
      return false;
    } else {
      console.log(true);
      return true;
    }
  },

}