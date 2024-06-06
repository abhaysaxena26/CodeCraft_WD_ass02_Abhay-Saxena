const holes = document.querySelectorAll(".holes");
const startbutton = document.getElementById("startbutton");
const endbutton = document.getElementById("endbutton");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let timer;
let score = 0;
let countdown;
let moleInterval;
let gameOver = true;

function comeout(){
    holes.forEach(hole => {
        hole.classList.remove('mole');
        hole.removeEventListener(
            'click',handleMoleClick);    
    });

    let random  = holes[Math.floor(Math.random()*9)];

    random.classList.add('mole');
    random.addEventListener('click',handleMoleClick);
}

function handleMoleClick(){
    if(!gameOver){
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
    this.classList.remove('mole');
}

function startGame(){
    if(!gameOver){
        return;
    }
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timer = 30;
    timerDisplay.textContent = `Time: ${timer}s`;

    startbutton.disabled = true;
    endbutton.disabled = false;

    countdown = setInterval(()=>{
        timer--;
        timerDisplay.textContent = `Time: ${timer}s`;
        if(timer<=0){
            clearInterval(countdown);
            gameOver = true;
            alert(`Your final score: ${score}!`)
            startbutton.disabled = false;
            endbutton.disabled = true;
        }
    },1*1000);

    moleInterval = setInterval(()=>{
        if(!gameOver)comeout();
    },0.60*1000);

    console.log("Game Started");
}

function endGame(){
    clearInterval(countdown);
    clearInterval(moleInterval);
    gameOver = true;
    alert(`Your final score: ${score}!`);
    score = 0;
    timer = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timer}s`;
    startbutton.disabled = false;
    endbutton.disabled = true;
}

startbutton.addEventListener("click",startGame);
endbutton.addEventListener("click",endGame);