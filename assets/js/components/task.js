const task = {

  /**
   * Méthode qui pose tous les écouteurs d'évènements sur un élément tâche
   * 
   * @param {*} taskElement 
   */
  bindSingleTaskEventListener: function (taskElement) {
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
    //-------------------------------
    // je cible le bouton pour marquer une tâche comme incomplète
    const taskIncompleteButtonElement = taskElement.querySelector('.task__button--incomplete');
    taskIncompleteButtonElement.addEventListener('click', task.handleIncompleteTask);
    //-------------------------------
    // je cible le bouton pour archiver une tâche
    const taskArchiveButtonElement = taskElement.querySelector('.task__button--archive');
    taskArchiveButtonElement.addEventListener('click', task.handleArchiveTask);
  },


  /**
   * Méthode qui modifie l'avancement de la tâche dans la BDD
   * Methode PATCH
   * 
   * @param {*} taskElement 
   */
  sendDataCompletionFromAPIPatch: function (taskElement, taskId, taskData, completionMethod, completion) {

    // on veut spécifier que les données sont en json :
    // pour se faire on prépare les entetes HTTP (headers) de la requête
    let httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,
      body: JSON.stringify(taskData)
    };

    // Exécuter la requête HTTP avec FETCH
    fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
      .then(

        function (response) {
          // console.log(response);
          // Si HTTP status code à 204 => OK
          if (response.status == 204) {
            console.log('maj effectuée');

            completionMethod;

            task.updateCompletionTask(taskElement, completion);

          } else {
            console.log('echec maj');
          }
        }
      )
  },

  /**
   * Méthode qui valide la tâche
   * Completion à 100
   * 
   * @param {*} evt 
   */
  //! Modification de la méthode en e07
  handleCompleteTask: function (evt) {
    //alert('valider');
    // je cible le bouton sur lequel l'utilisateur a click
    const completeButtonElement = evt.currentTarget;
    // ici je cible la div de class task qui contient le bouton
    const taskElement = completeButtonElement.closest('.task');

    // récupération de l'id task
    const taskId = taskElement.dataset.id;
    // on veut mettre à jour la tache taskId et lui mettre sa completion à 100

    // on stocke les données à transférer
    const taskData = {
      completion: 100
    };

    //! ici récupération id + MAJ + stockage données
    task.sendDataCompletionFromAPIPatch(taskElement, taskId, taskData, task.markTaskAsComplete(taskElement), 100);
  },

  /**
   * Méthode qui invalide la tâche
   * Completion à 0
   * 
   * @param {*} evt 
   */
  handleIncompleteTask: function (evt) {

    // récupération du bouton à l'origine de l'évènement
    const taskIncompleteButtonElement = evt.currentTarget;
    // je remonte à l'élément tache
    const taskElement = taskIncompleteButtonElement.closest('.task');
    // récupération de l'id de la tâche
    const taskId = taskElement.dataset.id;

    //! MAJ de la completion de tache en bdd

    // on stocke les données à transférer
    const taskData = {
      completion: 0
    };

    task.sendDataCompletionFromAPIPatch(taskElement, taskId, taskData, task.markTaskAsIncomplete(taskElement), 0);
  },

  /**
   * Méthode qui archive une tâche
   * 
   * @param {*} evt 
   */
  handleArchiveTask: function(evt) {

    // je récupère mon élément lié à l'évènement
    const taskArchiveButtonElement = evt.currentTarget;
    // je remonte et récupère ma tâche
    const taskElement = taskArchiveButtonElement.closest('.task');
    // je récupère l'id de la tache
    const taskId = taskElement.dataset.id;

    // MAJ statut de la tâche dans la bdd
    const taskData = {
      status: 2
    };

    // on prépare les entetes de la requete http
    // on spécifie que les données sont au format json
    httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // on prépare les options de la requete
    fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,
      body: JSON.stringify(taskData)
    };

    // on envoie la requete via fetch
    fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
      .then(
        function(response) {
          if(response.status == 204) {
            console.log('MAJ status task ok');

            // méthode qui affiche la tache comme étant archivée
            task.updateClassStatusTask(taskElement, 2);
          } else {
            console.log('ERROR ECHEC MAJ');
          }
        }
      )
  },

  /**
   * Méthode qui change la classe si validation de la tâche
   * 
   * @param {*} taskElement 
   */
  markTaskAsComplete: function (taskElement) {
    taskElement.classList.remove('task--todo');
    taskElement.classList.add('task--complete');
  },
  // Cette methode a pour objectif de masquer le p de la tache et afficher l'input

  /**
   * Méthode qui change la classe si finalement la tache n'est pas complete
   * 
   * @param {*} taskElement 
   */
  markTaskAsIncomplete: function (taskElement) {
    taskElement.classList.remove('task--complete');
    taskElement.classList.add('task--todo');
  },

  /**
   * Méthode qui masque le paragraphe de la tache et affiche l'input
   * Activation du mode d'édition
   * 
   * @param {*} evt 
   */
  handleClickOnTask: function (evt) {
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

  /**
   * Méthode qui fait la même chose que la méthode
   * handleValidateNewTask mais dans le cas ou
   * l'utilisateur appui sur la touche enter
   * pour confirmer la modification de la tâche
   * 
   * @param {*} evt 
   */
  handleKeyDown: function (evt) {
    if (evt.key === 'Enter') {
      // ATTENTION DELICAT
      // ici je passe l'objet Event "evt" a la methode
      // handleValidateNewTask pour que le mecanisme reste fonctionnel
      task.handleValidateNewTask(evt);
    }
  },

  /**
   * Méthode qui intègre la modification de la tâche
   * et sort du mode d'édition quand on clique
   * à l'extérieur du champs
   * 
   * @param {*} evt 
   */
  handleValidateNewTask: function (evt) {
    // on récupère l'input
    const taskTitleFieldElement = evt.currentTarget;

    // on récupère la valeur de l'input
    const newTaskTitle = taskTitleFieldElement.value;

    // on remonte a la div de classe task
    const taskElement = taskTitleFieldElement.closest('.task');

    // récupération de l'id de la tâche
    const taskId = taskElement.dataset.id;

    // MAJ - requete http à l'api
    const taskData = {
      title: newTaskTitle
    };

    // on prépare les entetes http de la requete
    // pour spécifier que les données sont en json
    httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // je spécifie les options de ma requete
    fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,
      body: JSON.stringify(taskData)
    };

    // j'envoie ma requete à mon api
    fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
      .then(
        function (response) {
          if (response.status == 204) {
            console.log('MAJ titre tache dans la bdd effectuée');
            // je cible le <p> a partir de l'input
            const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;

            // je change son contenu texte par le contenu de l'input
            taskTitleLabelElement.textContent = newTaskTitle;

            // je supprime la classe task--edit
            taskElement.classList.remove('task--edit');
          } else {
            console.log('ERROR ECHEC MAJ');
          }
        }
      )
  },

  /**
   * Méthode qui crée une nouvelle tâche
   * 
   * @param {*} newTaskTitle 
   * @param {*} newTaskCategoryName 
   * @returns 
   */
  createTaskElement: function (newTaskId, newTaskTitle, newTaskCategoryName, newTaskCompletion = 0, newTaskStatus) {

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

    task.updateTaskId(newTaskElement, newTaskId);

    // ici j'imagine une methode qui nous permet de changer le titre d'une tache
    task.updateTaskTitle(newTaskElement, newTaskTitle);
    // ici j'imagine une methode qui nous permet de changer le nom de la categorie pour une tache
    task.updateTaskCategoryName(newTaskElement, newTaskCategoryName);

    // ajoute la classe task--todo ou task--complete à taskElement
    task.updateClassCompletionTask(newTaskElement, newTaskCompletion);

    // ajoute l'état d'avancement de la tâche
    task.updateCompletionTask(newTaskElement, newTaskCompletion);

    // ajoute la classe archive si statut tache = 2
    task.updateClassStatusTask(newTaskElement, newTaskStatus);

    // ici j'utilise une methode qui va nous permettre d'ajouter tous les écouteurs d'events sur UNE TACHE
    task.bindSingleTaskEventListener(newTaskElement);

    // console.log(taskElement);

    return newTaskElement;

  },

  /**
   * Méthode qui ajoute l'id de la task
   */
  updateTaskId: function (taskElement, taskId) {

    taskElement.dataset.id = taskId;
  },

  /**
   * Méthode qui ajoute la catégorie à une tâche
   * 
   * @param {*} taskElement 
   * @param {*} categoryTitle 
   */
  updateTaskCategoryName: function (taskElement, categoryTitle) {
    // Mise a jour du dataset de la div de classe task
    taskElement.dataset.category = categoryTitle;
    // je cible le p enfant direct d'un element de classe task__category
    const taskCategoryNameElement = taskElement.querySelector('.task__category > p');
    taskCategoryNameElement.textContent = categoryTitle;
  },

  /**
   * Méthode qui ajoute le titre à une tâche
   * 
   * @param {*} taskElement 
   * @param {*} taskTitle 
   */
  updateTaskTitle: function (taskElement, taskTitle) {
    // je cible le p contenant le titre de la tâche
    const tasktitleElement = taskElement.querySelector('.task__title-label');
    // mise a jour de sa valeur
    tasktitleElement.textContent = taskTitle;
    // je cible l'input de la tache
    const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
    // mise a jour de sa valeur :
    taskTitleFieldElement.value = taskTitle;



  },

  /**
   * Méthode qui ajoute la classe todo ou complete
   * si la tâche est toujours en cours ou si elle
   * est finie
   * 
   * @param {*} completion 
   * @param {*} taskElement 
   * @returns 
   */
  updateClassCompletionTask: function (taskElement, completion) {

    if (completion < 100 && completion >= 0) {
      taskElement.classList.replace('task--complete', 'task--todo');
    } else {
      taskElement.classList.replace('task--todo', 'task--complete');
    }

    return taskElement;
  },

  /**
   * Méthode qui modifie une tâche si elle est archivée
   * 
   * @param {*} taskElement 
   * @param {*} status 
   */
  updateClassStatusTask: function(taskElement, status) {

    if(status === 2) {
      taskElement.classList.replace('task--todo','task--archive');
      taskElement.classList.replace('task--complete','task--archive');
    } else {
      taskElement.classList.remove('task--archive');
    }
  },

  /**
   * Méthode qui ajoute l'état d'avancement d'une tâche
   * 
   * @param {*} completion 
   * @param {*} taskElement 
   */
  updateCompletionTask: function (taskElement, completion) {

    // console.log(completion);
    // je cible la barre de progression
    const progressTaskElement = taskElement.querySelector('.progress-bar__level');

    // je change le style pour afficher l'avancement dans le DOM
    progressTaskElement.setAttribute('style', 'width:' + completion + '%');
  }

}