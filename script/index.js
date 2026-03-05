// step-1
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}

// step-5
const removeActive = () => {
    const lessonbtons = document.querySelectorAll(".lesson-btn")
    lessonbtons.forEach((btn) => btn.classList.remove("active"))
}

// step-3
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((card) => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active")
            wordDisplay(card.data)
        });
}

// step-6
const loadWordDetils = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const detils = await res.json();
    detilsDisplay(detils.data);
}

// step-7
const detilsDisplay = (word) => {
    console.log(word);
    const detilsBox = document.getElementById("detils-container")
    detilsBox.innerHTML = `
    <h2 class="font-bangla text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:ইগার)</h2>
                <div>
                    <h2 class="text-1xl font-semibold">${word.meaning}</h2>
                    <p class="font-bangla text-[#79716B]">${word.pronunciation}</p>
                </div>
                <div>
                    <h2 class="text-1xl font-semibold">Example</h2>
                    <p class="text-[#79716B]">${word.sentence}</p>
                </div>
                <div>
                    <h2 class="font-bangla text-1xl font-semibold">সমার্থক শব্দ গুলো</h2>
                    <span class="btn">Enthusiastic</span>
                    <span class="btn">excited</span>
                    <span class="btn">keen</span>
                </div>
    `
    document.getElementById("word_modal").showModal()
}


// step-4
const wordDisplay = (words) => {
    const wordCont = document.getElementById("word-container")
    wordCont.innerHTML = "";
    if (words.length == 0) {
        wordCont.innerHTML = `
         <div class="mx-auto text-center col-span-3 space-y-4">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-3xl text-[#292524] font-semibold">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    }

    words.forEach(word => {
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
        <div class="bg-white px-8 py-10 text-center rounded-xl space-y-3">
            <h3 class="text-2xl text-[#000000] font-bold">${word.word ? word.word : "Word not find"}</h3>
            <p class="text-xl text-[#000000] ">Meaning/Pronounciation</p>
            <h3 class="font-bangla text-[#383838] text-2xl font-semibold mb-15">"${word.meaning ? word.meaning : "Meaning not find"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not find"}"</h3>
            <div class="flex justify-between">
                <button onclick="loadWordDetils(${word.id})" class="btn bg-[#1A91FF30]"><i class="fa-solid text-[#000000] fa-circle-info"></i></button>
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary">Lesson ${lesson.level_no} </button>
        `
        levelCont.appendChild(btnDiv)
    }
}
loadLessons()