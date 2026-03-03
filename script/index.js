// step-1
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}

// step-3
const loadLevelWorld = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((card) => console.log(card.data));
}

// step-4

// step-2
const displayLesson = (lessons) => {
    // console.log(lessons);
    const levelCont = document.getElementById("level-container")
    levelCont.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button onclick="loadLevelWorld(${lesson.level_no})" class="btn btn-outline btn-primary">Lesson ${lesson.level_no} </button>
        `
        levelCont.appendChild(btnDiv)
    }
}
loadLessons()