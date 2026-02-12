const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function playBGM() {
    const bgm = document.getElementById('bgm');
    if (bgm) {
        bgm.volume = 0.5; 
        bgm.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                playBGM();
                startConfetti();
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook(false);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;
            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;
            default:
                throw new Error("unkown state");
        }

        currentLocation--;
    }
}

function startConfetti() {
    setInterval(createConfetti, 300);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    const symbols = ['❤️', '💕', '💖', '💗', '💓', '💘', '🌹', '💐'];
    confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 3 + 4) + 's';
    confetti.style.opacity = Math.random() * 0.5 + 0.5;
    
    document.body.appendChild(confetti);
    
    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

let chosen = null;
let noCount = 0;

const noAlerts = [
    "Error 404: Your answer was not registered.",
    "Error 403: Misinput Detected. Answer was not registered.",
    "Error 500: Internet Unstable. Answer not detected.",
    "Error 401: ...",
    "For you're convenience, the 'No' button will be removed!"
];

function choose(event, val) {
    event.stopPropagation();
    
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const msg = document.getElementById('respMsg');
    
    if (val === 'yes') {
        alert("Indi ko actually makita sabat mo, so pa message nlg hehe 💕");
        btnYes.classList.add('circled');
        btnNo.classList.remove('circled');
        chosen = 'yes';
    } else {
        if (noCount < noAlerts.length) {
            alert(noAlerts[noCount]);
            noCount++;

            if (noCount === 5) {
                btnNo.style.display = 'none';
                alert("The 'No' button has been permanently removed for your safety! 😊");
            }
        }
    }
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}