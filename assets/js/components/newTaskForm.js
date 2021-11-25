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
   * Méthode qui insère la nouvelle tâche dans la BDD via notre API
   * 
   * @param {*} newTaskTitle 
   * @param {*} newTaskCategoryId 
   * @param {*} newTaskCategoryName 
   */
  sendNewTaskFromAPI: function(newTaskTitle, newTaskCategoryId, newTaskCategoryName) {
    // TODO on va faire un fetch vers /tasks en POST pour AJOUTER
    // la nouvelle tâche à la BDD

    // on prépare les données de la nouvelle tâche
    const newTaskData = {
      title: newTaskTitle,
      categoryId: newTaskCategoryId
    };
    // on spécifie que les données sont en JSON
    let httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // on prépare la configuration de la requête http
    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,
      body: JSON.stringify(newTaskData)
    };

    fetch(app.apiRootUrl + '/tasks', fetchOptions)
      .then(
        function(response) {

          // Si HTTP status code à 201 => OK
          if (response.status !== 201) {
            console.log('error');

            // todo

          } 

          return response.json();
        }
      )
      .then(
        function(newTaskObject) {
          
          // j'imagine une methode qui va nous permettre de créer une nouvelle tache
          const newTaskElement = task.createTaskElement(newTaskObject.id, newTaskObject.title, newTaskCategoryName, newTaskObject.completion);

          // j'imagine une methode dont le but sera de nous afficher la tache ( l'inserer dans la liste des taches);
          tasksList.insertTaskIntoTasksList(newTaskElement);
        }
      )
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

    // récupération du nom de la catégorie
    const newTaskCategoryName = categoryElement.querySelector('option:checked').textContent;
    // récupération de l'id de la catégorie
    const newTaskCategoryId = categoryElement.value;
    // console.log(newTaskCategoryId);

    // clear formulaire
    newTaskFormElement.reset();

    // ci dessous je remet le focus après soumission du formulaire
    taskTitleFieldElement.focus();

    // si le formulaire a été dumement remplis
    if (newTaskForm.checkAddNewTask(newTaskTitle) === true) {

      // si présence d'un message d'erreur : suppression du message
      const errorAddTask = document.querySelector('form > p');
      app.deleteErrorMessage(newTaskFormElement, errorAddTask);

      newTaskForm.sendNewTaskFromAPI(newTaskTitle, newTaskCategoryId, newTaskCategoryName);
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
  }

}