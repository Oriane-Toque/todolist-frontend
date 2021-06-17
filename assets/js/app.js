const app = {

  init: function(){
    console.log('app.init executé');
    tasksList.init();
    newTaskForm.init();
  },
  
};

// On ne va pas lancer init "en dur"
//app.init();
// on va attendre que le DOM soit chargé
//! ATTENTION Lorsque je fais un addEventListener, le 2eme argument qui va etre
//! la fonction ou methode a executer lorsque l'event est capté ne dois
//! JAMAIS avoir de parentheses ! 
document.addEventListener('DOMContentLoaded', app.init);


