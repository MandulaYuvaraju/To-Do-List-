document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('taskinput');
    const taskList = document.querySelector('.task-list');
    const progress = document.getElementById('progress');
    const numbers = document.getElementById('numbers');

    let totalTasks = 0;
    let completedTasks = 0;

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        addTask(taskText);
        taskInput.value = '';
    });

    function addTask(text) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container');

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit';
        editIcon.title = 'Edit';
        editIcon.addEventListener('click', () => {
            const newText = prompt('Edit your task:', span.textContent);
            if (newText !== null && newText.trim() !== '') {
                span.textContent = newText.trim();
            }
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt';
        deleteIcon.title = 'Delete';
        deleteIcon.addEventListener('click', () => {
            if (li.classList.contains('completed')) {
                completedTasks--;
            }
            li.remove();
            totalTasks--;
            updateStats();
        });

        iconContainer.appendChild(editIcon);
        iconContainer.appendChild(deleteIcon);
        li.appendChild(iconContainer);

        span.addEventListener('click', () => {
            li.classList.toggle('completed');
            if (li.classList.contains('completed')) {
                createFullScreenBlast();
            }
            updateStats();
        });

        taskList.appendChild(li);
        totalTasks++;
        updateStats();
    }

    function updateStats() {
        completedTasks = document.querySelectorAll('.task-list li.completed').length;
        const percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progress.style.width = percent + '%';
        numbers.textContent = `Completed: ${completedTasks} / ${totalTasks}`;
    }

    function createFullScreenBlast() {
        const numParticles = 50;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('radial-particle');
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.backgroundColor = getRandomColor();
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / numParticles;
            const distance = 200 + Math.random() * 100;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });

            setTimeout(() => particle.remove(), 1000);
        }
    }

    function getRandomColor() {
        const colors = ['#ff4757', '#1e90ff', '#2ed573', '#ffa502', '#ff6b81', '#70a1ff', '#eccc68'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
