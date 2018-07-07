$(document).ready(function () {
	$('#form-new-task').on('submit', function(e){
		e.preventDefault();
		var taskText = $('#addNewTask').val();
		var $taskHolder = $('<li class="list-group-item d-flex justify-content-between task-item">');
		var $taskTitle = $('<span class="task-title">').text(taskText);
		var $taskButtons = $('<div class="task-item__buttons"><button type="button" data-action="task-done" class="btn btn-light align-self-end gray"><i class="fas fa-check"></i></button><button type="button" data-action="task-delete" class="btn btn-light align-self-end gray"><i class="fas fa-times"></i></button></div>');
		$taskHolder.append($taskTitle).append($taskButtons);
		$('#listOfTasks').append($taskHolder);
		showNotify('new');
		toggleEmptyList();
		$('#addNewTask').val('');
	});

	$('#listOfTasks').on('click', '[data-action="task-delete"]', function(e){
		console.log('Клик по кнопке Удалить');
		e.preventDefault();
		$(this).parents('.task-item').remove();
		showNotify('delete');
		toggleEmptyList();
	});
	$('#listOfTasks').on('click', '[data-action="task-done"]', function(e){
		console.log('Клик по кнопке Готово!');
		e.preventDefault();
		$(this).parents('.task-item').find('.task-title').toggleClass('task-title--done');
		showNotify('done');
	});
	function showNotify(type) {
		var $notifyNew = $('<div class="alert alert-warning" role="alert">Задача добавлена!</div>'),
			$notifyDone = $('<div class="alert alert-success" role="alert">Задача выполнена!</div>'),
			$notifyDelete = $('<div class="alert alert-danger" role="alert">Задача удалена!</div>');
			$notifyError = $('<div class="alert alert-danger" role="alert">Ошибка! Нет такого действия!</div>');

		switch (type){
			case 'new':
				$notifyBlock = $notifyNew;
				break;
			case 'done':
				$notifyBlock = $notifyDone;
				break;
			case 'delete':
				$notifyBlock = $notifyDelete;
				break;
			default:
				$notifyBlock = $notifyError;
				break;
		}

		console.log('Задача добавлена!');

		// if ( $('#notifyHolder .alert') ) {}

		$('#notifyHolder .alert').fadeOut();
		$notifyBlock.hide();
		$('#notifyHolder').append($notifyBlock);
		$notifyBlock.fadeIn();
		setTimeout(function(){
			$notifyBlock.fadeOut();
			setTimeout(function(){
				$notifyBlock.remove();
			}, 2000);
		}, 2000);
	}
	function toggleEmptyList() {
		if ( $('#listOfTasks').children().length > 1 ) {
			console.log('HAVE TASKS');
			$('#emptyList').hide();
		} else {
			console.log('NO TASKS');
			$('#emptyList').show();
		}
	}


});
