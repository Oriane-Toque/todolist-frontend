const newTaskForm = {


  // initialisation du composant
  init: function(){
    newTaskForm.bindNewTaskFormEventListener();
  },

  /**
   * Méthode pour l'ajout d'un  eventlistener liés au formulaire d'ajout d'une tâche
   */
  bindNewTaskFormEventListener: function(){
    // on récupère le formulaire d'ajout d'un" tache (le form qui est dans un element de classe task--add)
    const newTaskFormElement = document.querySelector('.task--add form');

    newTaskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);

  },

  /**
   * Méthode gérant la soumission du formulaire d'ajout de tâche
   * 
   * @param {*} evt 
   */
  handleNewTaskFormSubmit: function(evt){
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
    
    // j'imagine une methode qui va nous permettre de créer une nouvelle tache
    // cette methode va recevoir 2 arguments : le nom de la tache et le nom de la categorie
    const newTaskElement = task.createTaskElement(newTaskTitle, newTaskCategoryName);
    // j'imagine une methode dont le but sera de nous afficher la tache ( l'inserer dans la lsite des taches);
    tasksList.insertTaskIntoTasksList(newTaskElement);

  },

}