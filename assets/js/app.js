const app = {

  apiRootUrl: 'http://0.0.0.0:8000',

  init: function () {
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

document.addEventListener('DOMContentLoaded', app.init);