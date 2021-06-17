const tasksList = {

  init: function(){
    // ici on voudrait pouvoir ajouter des ecouteurs d'évenements sur toute les taches
    tasksList.bindAllTasksEvents();
  },

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
  insertTaskIntoTasksList: function(taskElement){
    // je cible la div contient toute les taches
    const tasksListElement = document.querySelector('.tasks');
    // et j'ajoute la nouvelle tache
    tasksListElement.prepend(taskElement);

  }


}