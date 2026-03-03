// step-1
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}

// step-3
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((card) => wordDisplay(card.data));
}


// step-4
const wordDisplay = (words) => {
    const wordCont = document.getElementById("word-container")
    wordCont.innerHTML = "";
    words.forEach(word => {
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
        <div class="bg-white px-8 py-10 text-center rounded-xl space-y-3">
            <h3 class="text-2xl text-[#000000] font-bold">${word.word}</h3>
            <p class="text-xl text-[#000000] ">Meaning/Pronounciatio</p>
            <h3 class="font-bangla text-[#383838] text-2xl font-semibold mb-15">"${word.meaning} / ${word.pronunciation}"</h3>
            <div class="flex justify-between">
                <button class="btn bg-[#1A91FF30]"><i class="fa-solid text-[#000000] fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF30]"><i class="fa-solid text-[#000000] fa-volume-high"></i></button>
            </div>
        </div>
        `
        console.log(word);
        wordCont.appendChild(wordDiv)
    });
}

// step-2
const displayLesson = (lessons) => {
    // console.log(lessons);
    const levelCont = document.getElementById("level-container")
    levelCont.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">Lesson ${lesson.level_no} </button>
        `
        levelCont.appendChild(btnDiv)
    }
}
loadLessons()