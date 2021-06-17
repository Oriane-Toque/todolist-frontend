const task = {

  /**
   * Méthode a pour objectif de poser tous les écouteurs d'évènements sur un élément tâche
   * 
   * @param {*} taskElement 
   */
  bindSingleTaskEvent: function(taskElement) {
    
    // je récupère le titre de la tache
    const taskTitleLabelElement = taskElement.querySelector('.task__title-label');
    taskTitleLabelElement.addEventListener('click', task.handleEnableTaskTitleEditMode);

    // on cible l'input
    const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
    // on ajoute l'écoute de la saisie d'une touche
    taskTitleFieldElement.addEventListener('keydown', task.handleKeyDown);
    // on ajoute l'écoute si perte de focus
    taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTask);

    // je récupère le bouton completed de la tâche
    const taskEndButton = taskElement.querySelector('.task__button--validate');
    // on ajoute l'écoute du click sur le bouton
    taskEndButton.addEventListener('click', task.handleCompleteTask);
  },

  /**
   * Méthode pour activer l'édition quand on clique sur la tâche
   * Masquage du p de la tâche et affichage de l'input
   * 
   * @param {*} evt 
   */
  handleEnableTaskTitleEditMode: function(evt) {

    // je remonte à l'élément qui a capté l'event
    const taskTitleLabelElement = evt.currentTarget;

    // je remonte à la div de classe task
    const taskElement = taskTitleLabelElement.closest('.task');

    // j'ajoute la classe pour masquer l'élément
    taskElement.classList.add('task--edit');

    //ci-dessous je met le focus sur l'input de la tâche
    taskElement.querySelector('.task__title-field').focus();
  },
 
  /**
   * Méthode pour masquer input si appui sur la touche enter
   * 
   * @param {*} evt 
   */
  handleKeyDown: function(evt) {

    if(evt.key === "Enter") {

      task.handleValidateNewTask(evt);
    }
  },

  /**
   * 
   * @param {*} evt 
   */
  handleValidateNewTask: function(evt) {

    // je remonte à l'élément qui a capté l'évènement (input)
    const taskTitleFieldElement = evt.currentTarget;

    // récupération de la value de l'input
    const newTaskTitle = taskTitleFieldElement.value;

    // je remonte à la div de classe task
    const taskElement = taskTitleFieldElement.closest('.task');

    // je cible le <p> à partir de l'input
    const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;

    // je change la valeur de notre <p> après notre modification
    taskTitleLabelElement.textContent = newTaskTitle;

    // je supprime la classe task--edit
    taskElement.classList.remove('task--edit');
  },

  /**
   * Méthode qui affiche la tâche complète
   * 
   * @param {*} evt 
   */
  handleCompleteTask: function(evt) {

    // je remonte à l'élément qui a capté l'évènement
    const taskEndButton = evt.currentTarget;

    // je remonte à l'élément parent de class task
    const taskElement = taskEndButton.closest('.task');
    task.markTaskAsComplete(taskElement);
  },

  /**
   * Méthode qui valide une tâche
   * 
   * @param {*} taskElement 
   */
  markTaskAsComplete: function(taskElement) {
    // je supprime la classe correspondant au modificateur "todo"
    taskElement.classList.remove('task--todo');

    // et j'ajoute la classe correspondant au modificateur "complete"
    taskElement.classList.add('task--complete');
  }
}