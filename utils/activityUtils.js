const fs = require('fs');

function getRandomActivitiesFromJSON(filePath, count = 4) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(data);

    const allCourses = Object.keys(parsedData);
    const randomCourse = allCourses[Math.floor(Math.random() * allCourses.length)];

    const subjects = Object.keys(parsedData[randomCourse]);
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

    const allCores = Object.keys(parsedData[randomCourse][randomSubject]);

    const selectedCores = [];
    while (selectedCores.length < count) {
        const randomCore = allCores[Math.floor(Math.random() * allCores.length)];
        if (!selectedCores.includes(randomCore)) {
            const activitiesArray = parsedData[randomCourse][randomSubject][randomCore];
            if (Array.isArray(activitiesArray) && activitiesArray.length > 0) {
                selectedCores.push(randomCore);
            }
        }
    }

    const selectedActivities = selectedCores.map(core => {
        const activities = parsedData[randomCourse][randomSubject][core];
        return activities[Math.floor(Math.random() * activities.length)];
    });

    console.log(`🎯 Actividades seleccionadas (${randomCourse} > ${randomSubject}): ${selectedActivities.join(', ')}`);
    return selectedActivities;
}

module.exports = { getRandomActivitiesFromJSON };
