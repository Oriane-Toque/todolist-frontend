const app = {

  apiRootUrl: 'http://0.0.0.0:8000',

  init: function () {
    console.log('app.init executé');
    tasksList.init();
    newTaskForm.init();
    categoriesList.init();
  },

  /**
   * Méthode qui génère et affiche un message d'erreur
   * 
   * @param {*} parentDOM 
   * @param {*} message 
   */
  addErrorMessage: function (parentDOM, message) {
    // si aucun message d'erreur existe alors création d'un message
    // sinon rien
    if (!document.querySelector('form > p')) {
      const errorContent = document.createElement('p');
      const errorMessage = message;

      errorContent.textContent = errorMessage;

      parentDOM.prepend(errorContent);
    }
  },

  /**
   * Méthode qui supprime un message d'erreur
   * 
   * @param {*} form 
   * @param {*} locationMessage 
   */
  deleteErrorMessage: function (form, locationMessage) {
    if (locationMessage) {

      form.removeChild(locationMessage);
    }
  }

};

// On ne va pas lancer init "en dur"
//app.init();
// on va attendre que le DOM soit chargé
//! ATTENTION Lorsque je fais un addEventListener, le 2eme argument qui va etre
//! la fonction ou methode a executer lorsque l'event est capté ne dois
//! JAMAIS avoir de parentheses ! 
document.addEventListener('DOMContentLoaded', app.init);