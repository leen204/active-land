window.addEventListener('DOMContentLoaded', function() {
    const kids = JSON.parse(localStorage.getItem('kids')) || [];

    const kidSelect = document.getElementById('kid-select');
    const coachSelect = document.getElementById('coach-select');
    const prerequisiteSelect = document.getElementById('prerequisite-select');
    const activitiesContainer = document.querySelector('.activity-box');

    const activitiesArray = [
        { name: "Art", coach: "Maha", prerequisite: "Age 6+", description: "Creative art activity to inspire imagination.", image: "images/Art.jpg" },
        { name: "Ballet", coach: "Emily Brown", prerequisite: "Age 10+", description: "Ballet techniques improving flexibility and rhythm.", image: "images/Ballet.jpg" },
        { name: "Basketball", coach: "Khalid", prerequisite: "Age 12+", description: "Basketball drills to improve motor skills and coordination.", image: "images/Basketball.jpeg" },
        { name: "Cycling", coach: "Emily Brown", prerequisite: "Age 6+", description: "Outdoor cycling to explore environment and build endurance.", image: "images/Cycling.jpeg" },
        { name: "Dancing", coach: "Khalid", prerequisite: "None", description: "Group dancing to enhance coordination and physical fitness.", image: "images/Dancing.jpg" },
        { name: "Football", coach: "Khalid", prerequisite: "None", description: "Team football games for collaboration and strategy.", image: "images/Football.jpeg" },
        { name: "Gymnastics", coach: "Mike Johnson", prerequisite: "None", description: "Gymnastics exercises to develop strength and flexibility.", image: "images/Gymnastics.jpg" },
        { name: "Handball", coach: "Mike Johnson", prerequisite: "None", description: "Handball to improve sports skills and teamwork.", image: "images/Handball.jpeg" },
        { name: "Karate", coach: "Emily Brown", prerequisite: "None", description: "Martial arts to build confidence and discipline.", image: "images/Karate.jpg" },
        { name: "Swimming", coach: "Maha", prerequisite: "None", description: "Swimming to develop physical strength and flexibility.", image: "images/Swimming.jpg" },
        { name: "Tennis", coach: "Khalid", prerequisite: "None", description: "Tennis to improve reaction time and hand-eye coordination.", image: "images/Tennis.jpeg" },
        { name: "Yoga", coach: "Mike Johnson", prerequisite: "None", description: "Yoga to strengthen the mind and body.", image: "images/yoga.jpg" }
    ];

    function populateKidsDropdown() {
        kidSelect.innerHTML = `<option value="">Select Kid</option>`;
        kids.forEach(kid => {
            const option = document.createElement('option');
            option.value = kid.name;
            option.textContent = kid.name;
            kidSelect.appendChild(option);
        });
    }

    function populateFilters() {
        const coaches = [...new Set(activitiesArray.map(activity => activity.coach))];
        const prerequisites = [...new Set(activitiesArray.map(activity => activity.prerequisite))];

        coachSelect.innerHTML = `<option value="">Select Coach</option>`;
        prerequisiteSelect.innerHTML = `<option value="">Select Prerequisite</option>`;

        coaches.forEach(coach => {
            const option = document.createElement('option');
            option.value = coach;
            option.textContent = coach;
            coachSelect.appendChild(option);
        });

        prerequisites.forEach(req => {
            if (req !== "None") {
                const option = document.createElement('option');
                option.value = req;
                option.textContent = req;
                prerequisiteSelect.appendChild(option);
            }
        });
    }

    function renderActivities(filteredActivities = activitiesArray) {
        activitiesContainer.innerHTML = '';

        filteredActivities.forEach(activity => {
            const card = document.createElement('div');
            card.className = 'activity-card';
            card.innerHTML = `
                <img src="${activity.image}" alt="${activity.name}">
                <div class="activity-info">
                    <p><strong>${activity.name}</strong></p>
                    <p>Coach: ${activity.coach}</p>
                    <p>Prerequisite: ${activity.prerequisite}</p>
                    <p>${activity.description}</p>
                    <input type="checkbox" value="${activity.name}">
                </div>
            `;
            activitiesContainer.appendChild(card);
        });
    }

    coachSelect.addEventListener('change', function () {
        const selectedCoach = this.value;
        const filtered = activitiesArray.filter(activity => activity.coach === selectedCoach);
        renderActivities(filtered.length > 0 ? filtered : activitiesArray);
    });

    prerequisiteSelect.addEventListener('change', function () {
        const selectedPre = this.value;
        const filtered = activitiesArray.filter(activity => activity.prerequisite === selectedPre);
        renderActivities(filtered.length > 0 ? filtered : activitiesArray);
    });

    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const selectedKidName = kidSelect.value;
        const selectedActivitiesInputs = document.querySelectorAll('.activity-info input:checked');

        if (!selectedKidName) {
            alert('Please select a kid');
            return;
        }
        if (selectedActivitiesInputs.length === 0) {
            alert('Please select at least one activity');
            return;
        }

        let kids = JSON.parse(localStorage.getItem('kids')) || [];

        const kidIndex = kids.findIndex(kid => kid.name === selectedKidName);

        if (kidIndex !== -1) {
            if (!kids[kidIndex].activities) {
                kids[kidIndex].activities = [];
            }

            selectedActivitiesInputs.forEach(input => {
                const activityName = input.value;
                const activity = activitiesArray.find(act => act.name === activityName);
                
                if (activity) {
                    const entry = `${activity.name}`;
                    if (!kids[kidIndex].activities.includes(entry)) {
                        kids[kidIndex].activities.push(entry);
                        kids[kidIndex].coach = activity.coach;
                    }
                }
            });
        }

        localStorage.setItem('kids', JSON.stringify(kids));
        alert('Activities registered successfully!');
        window.location.href = 'parent-dashboard.html';
    });

    populateKidsDropdown();
    populateFilters();
    renderActivities();
});