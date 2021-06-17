const task = {

  // Cette methode a pour objectif de poser tous les écouteurs d'evenements
  // sur un element tache, elle va donc recevoir un élement html tache
  bindSingleTaskEventListener: function (taskElement){
    // je cible le titre de la tache :
    const taskTitleLabelElement = taskElement.querySelector('.task__title-label');
    taskTitleLabelElement.addEventListener('click', task.handleClickOnTask);

    // on cible l'input
    const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
    // On ajoute l'écoute de la saisie d'une touche clavier
    taskTitleFieldElement.addEventListener('keydown', task.handleKeyDown);
    taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTask);

    //-------------------------------
    // je cible le bouton de validation de la tache 
    const completeButtonElement = taskElement.querySelector('.task__button--validate');
    completeButtonElement.addEventListener('click', task.handleCompleteTask);

  },
  // handler validation d'une tache
  handleCompleteTask: function(evt){
    //alert('valider');
    // je cible le bouton sur lequel l'utilisateur a click
    const completeButtonElement = evt.currentTarget;
    // ici je cible la div de class task qui contient le bouton
    const taskElement = completeButtonElement.closest('.task');
    task.markTaskAsComplete(taskElement);
  },
  // validation d'une tache
  markTaskAsComplete: function(taskElement){
    taskElement.classList.remove('task--todo');
    taskElement.classList.add('task--complete');
  },
  // Cette methode a pour objectif de masquer le p de la tache et afficher l'input
  handleClickOnTask: function(evt){
    // ici je remonte a l'élément qui a capté l'event, c'est a dire le <p> (l'intitulé de la tache)
    const taskTitleLabelElement = evt.currentTarget;
    // ici je remonte a la div de classe task
    const taskElement = taskTitleLabelElement.closest('.task');
    // j'ajoute la classe task--edit qui me permet de masquer le <p> qui contient l'intitulé de la tache
    // et afficher l'input 
    taskElement.classList.add('task--edit');

    // ci dessous je met le focus sur l'input de la tache
    taskElement.querySelector('.task__title-field').focus();

  },

  handleKeyDown: function(evt){
    if(evt.key === 'Enter'){
      // ATTENTION DELICAT
      // ici je passe l'objet Event "evt" a la methode
      // handleValidateNewTask pour que le mecanisme reste fonctionnel
      task.handleValidateNewTask(evt);
    }
  },

  handleValidateNewTask: function(evt){
    // on récupère l'input
    const taskTitleFieldElement = evt.currentTarget;

    // on récupère la valeur de l'input
    const newTaskTitle = taskTitleFieldElement.value;

    // on remonte a la div de classe task
    const taskElement = taskTitleFieldElement.closest('.task');

    // je cible le <p> a partir de l'input
    const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;

    // je change son contenu texte par le contenu de l'input
    taskTitleLabelElement.textContent = newTaskTitle;

    // je supprime la classe task--edit
    taskElement.classList.remove('task--edit');


  },

  createTaskElement: function(newTaskTitle, newTaskCategoryName){

    // je cible le template
    const templateElement = document.querySelector('#task-template');
    // puis je le clone et je réceptione le clone dans taskCloneElement
    const taskCloneElement = templateElement.content.cloneNode(true);
    // L'élement "task" est le premier element du fragment de document
    // je vais donc le cibler.
    // j'aurais pu également faire :
    const newTaskElement = taskCloneElement.querySelector('.task');
    //const newTaskElement = taskCloneElement.firstElementChild;
    console.log(newTaskElement);
    /*
    le templateTaskElement.content donne accès à un fragment de document qui est une sorte de container "emballant" le contenu (le fragment de document est un morceau de document qui ne fait pas partie du DOM), donc on n'obtient pas directement l'élément task (le <div> avec la classe .task sur l'exemple)
    et si on écrit : let newTaskElement = templateTaskElement.content.cloneNode(true); on retourne également un fragment de document
    cette subtilité est importante car si l'on veut réellement accéder à l'élément tâche contenu dans le fragment (et modifier un de ses attribut, pour mettre à jour le nom de la catégorie en dataset par exemple), alors il faut faire une sélection supplémentaire sur le fragment que l'on vient de récupérer : newTaskElement.querySelector('.task').
    */
    
    // ici j'imagine une methode qui nous permet de changer le titre d'une tache
    task.updateTaskTitle(newTaskElement, newTaskTitle);
    // ici j'imagine une methode qui nous permet de changer le nom de la categorie pour une tache
    task.updateTaskCategoryName(newTaskElement, newTaskCategoryName);

    // ici j'utilise une methode qui va nous permettre d'ajouter tous les écouteurs d'events sur UNE TACHE
    task.bindSingleTaskEventListener(newTaskElement);

    return newTaskElement;

  },

  updateTaskCategoryName: function(taskElement, categoryTitle){
    // Mise a jour du dataset de la div de classe task
    taskElement.dataset.category = categoryTitle;
    // je cible le p enfant direct d'un element de classe task__category
    const taskCategoryNameElement = taskElement.querySelector('.task__category > p');
    taskCategoryNameElement.textContent = categoryTitle;
  },

  updateTaskTitle: function(taskElement, taskTitle){
    // je cible le p contenant le titre de la tâche
    const tasktitleElement = taskElement.querySelector('.task__title-label');
    // mise a jour de sa valeur
    tasktitleElement.textContent = taskTitle;
    // je cible l'input de la tache
    const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
    // mise a jour de sa valeur :
    taskTitleFieldElement.value = taskTitle;



  }  


}