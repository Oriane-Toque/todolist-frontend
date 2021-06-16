const app = {

  init: function() {
    // ici on voudrait ajouter des écouteurs d'évènements sur toutes les tâches
    tasksList.init();
  }
};


document.addEventListener('DOMContentLoaded', app.init);