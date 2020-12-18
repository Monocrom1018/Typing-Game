/*          :: To-do :: 
    1. 게임시작 전에는 단어갱신 안되게 막기
    2. time과 score 보기좋게 레이아웃 재설정
    3. 단어 가져오는 api 배워서 넣기
    4. 아래 코드들 보기좋게 배열하고 주석달기

*/
/* Dom */
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

/* using variables */
const gameTime = 10;
let score = 0;
let time = gameTime;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
let randomIndex;

/* 초기설정 : 단어 불러오기, start! 버튼 불러오기, InputHandle 준비시키기 */
init();
function init() {
    getWords();
    buttonChange('Start!');
    wordInput.addEventListener('input', inputHandle);
}

function getWords() {
    words = ['Hello', 'Banana', 'Cherry', 'apple', 'Watermelon', 'Pineapple', 'Orange',
            'Lizard', 'Lotion', 'Psychology', 'Modern', 'Clone', 'Constructure', 'Classic',
            'Computer', 'Pencil', 'Impact', 'Business', 'Printer', 'Keyboard', 'Electric',
            'Function', 'Monitor', 'Dinosour', 'Anxious', 'Experience', 'Experiment',
            'Concert', 'Silence', 'Object', 'Philosophy', 'Software', 'Hardware', 'Animation',
            'Family', 'Console', 'Earphone', 'Principle', 'Memorize', 'Matrix', 'Generation'];
}

function buttonChange(text) { 
    button.innerText = text;
    if(text === 'Start!') {
        button.classList.remove('loading')
    } else {
        button.classList.add('loading');
    };
}

function inputHandle() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerHTML = words[randomIndex];
        wordInput.value = '';
        if(!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerHTML = score;
    }
};


/* 게임 종료됐는지 여부 체크하는 함수 */
function checkStatus() {
    if(!isPlaying && time === 0) {
        buttonChange('Start!');
        clearInterval(checkInterval);
    }
}

/* 타이머 : 1초씩 빼다가 0초되면 isPlaying 끄고 이 함수 계속 실행시키는 timeInterval 끄기 */
function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerHTML = time;
}

/* start! 클릭 시 게임 시작 */
function run() {
    isPlaying = true;
    time = gameTime;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('Playing...');
}



