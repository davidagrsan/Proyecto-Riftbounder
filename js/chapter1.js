const elementText = document.getElementById('texts');
const nextButton = document.getElementById('next');
const yesButton = document.getElementById('yes-choice');
const noButton = document.getElementById('no-choice');

const storyText = [
    { text: "..."},
    { text: "Era un sentimiento extraño..."},
    { text: "Lo notaba en el pecho, le apretaba por dentro como un agarre firme"},
    { text: "'¿Debería ignorar el dolor?'", decisions: { yesIndex: 6, noIndex: 4 } },
    { text: "Es cierto, aquello no debía ignorarlo", decisionType: 1},
    { text: "Algo extraño estaba ocurriendo y aquello era un aviso", decisionType: 1},
    { text: "Trató de ignorarlo, pero fue imposible, al cabo de unos minutos volvía", decisionType: 0},
    { text: "Podía tratarse de un aviso", decisionType: 0},
    { text: "Pero, un aviso... ¿De qué? ¿De quién?" },
    { text: "Septo creía estar en un lugar que le pertenecía, cumpliendo un castigo merecido" },
    { text: "Pero quizás..." },
    { text: "¿Por qué se sentía así? ¿Cuál fue su error o pecado?" },
    { text: "¿Había hecho algo mal realmente?" },
    { text: "¿Por qué no podría salir JAMÁS de ahí?" },
    { text: "Aquella maldita habitación rodeada de ladrillo blanco" },
    { text: "Daba la sensación de que las paredes cada vez se hacían más pequeñas, o que él se hacía más grande" },
    { text: "Pero nada de eso estaba ocurriendo realmente" },
    { text: "'No quiero estar más aquí'" },
    { text: "'Necesito salir'" }
]

let actualIndex = 0;
let i = 0;
let speed = 50;

function typeWriter() {
    const event = storyText[actualIndex];
    if (i < event.text.length) {
        elementText.innerHTML += event.text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// Funciones de botones
function showEvent(actualIndex) {
    const event = storyText[actualIndex];
    elementText.innerHTML = '';
    i= 0;
    typeWriter();
    if (event.decisions) {
        nextButton.style.display = "none";
        yesButton.style.display = "inline";
        noButton.style.display = "inline"; 
    } else {
        nextButton.style.display = "inline";
        yesButton.style.display = "none";
        noButton.style.display = "none";
    } 
}

// Funciones de decisiones
function handleDecision(decisionIndex) {
    const event = storyText[actualIndex];
    const decision = event.decisions;
    const indexToDelete = [];
    let nextEventIndex;

    if (decisionIndex === 0) { // Si se seleccionó "Sí"
        nextEventIndex = decision.yesIndex;
        for (let i = 0; i < storyText.length; i++) {
            if (storyText[i].decisionType === 1) {
                storyText[i].delete = true;
            }
        }
    } else if (decisionIndex === 1) { // Si se seleccionó "No"
        nextEventIndex = decision.noIndex;
        for (let i = 0; i < storyText.length; i++) {
            if (storyText[i].decisionType === 0) {
                storyText[i].delete = true;
            }
        }
    }

    actualIndex = nextEventIndex;
    showEvent(actualIndex);
}

nextButton.addEventListener('click', () => {
    actualIndex++;
    showEvent(actualIndex);
});

yesButton.addEventListener('click', () => handleDecision(0));
noButton.addEventListener('click', () => handleDecision(1));

storyText = storyText.filter(event => !event.delete);

showEvent(actualIndex);