const tasksList = {

  init: function(){
    // ici on voudrait pouvoir ajouter des ecouteurs d'évenements sur toute les taches
    tasksList.bindAllTasksEvents();

    // charge les données tasks depuis l'API TodoList
    tasksList.loadTasksFromAPI();
  },

  /**
   * Charge les données de l'API
   * Récupère la liste des tâches à afficher
   * au chargement du DOM
   * 
   */
  loadTasksFromAPI: function() {

    fetchOptions = {

      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };

    fetch(app.apiRootUrl + '/tasks', fetchOptions)
      .then(
        function(tasksListJson) {

          const objectTasksList = tasksListJson.json();
          return objectTasksList;
        } 
      )
      .then(
        function(objectTasksList) {
          // console.log(objectTasksList);

          for(const singleTask of objectTasksList){

            const newTaskElement = task.createTaskElement(singleTask.id, singleTask.title, singleTask.category.name, singleTask.completion, singleTask.status);
            tasksList.insertTaskIntoTasksList(newTaskElement);

          }
        }
      )
  },

  /**
   * Méthode qui ajoute des écouteurs d'évènements à toutes les tâches
   * 
   */
  bindAllTasksEvents: function(){
     // On récupère dans un tableau tous les éléments du DOM correspondant aux tâches
     // les éléments de classe task qui sont dans les éléments de classe tasks
     const taskElementsList = document.querySelectorAll('.tasks .task');
     
     
     for(const taskElement of taskElementsList){
       // ici j'imagine un composant "task" qui contiendrait une methode 
       // qui va nous servir a ajouter tous les écouteurs d'évents sur UNE TACHE
       task.bindSingleTaskEventListener(taskElement);
     }
     

  },
  // ajouter une tache a la liste des tache
  /**
   * Insère une nouvelle tâche dans le DOM
   * 
   * @param {*} taskElement 
   */
  insertTaskIntoTasksList: function(taskElement){
    // je cible la div contient toute les taches
    const tasksListElement = document.querySelector('.tasks');
    // et j'ajoute la nouvelle tache
    tasksListElement.prepend(taskElement);

  }


}