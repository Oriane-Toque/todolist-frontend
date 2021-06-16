const app = {

  init: function() {
    // ici on voudrait ajouter des écouteurs d'évènements sur toutes les tâches
    tasksList.init();

    // ici on voudrait ajouter un écouteur d'évènement sur le formulaire pour l'ajout d'une tâche
    newTask.init();
  }
};


document.addEventListener('DOMContentLoaded', app.init);