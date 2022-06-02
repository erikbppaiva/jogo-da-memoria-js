const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
//Bloqueia a mesa para que não seja clicado mais de duas vezes antes da verificação
let lockBoard = false;

//function para virar as cartaas
function filpCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this
        return;
    }
    secondCard = this;
    hasFlippedCard = false
    checkForMatch()
}

//Function para verificação se as cartas são iguais
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disebleCards()
        return;
    }
    unflipCards()
}
//Retira o click para resetar o tabuleiro
function disebleCards() {
    firstCard.removeEventListener('click', filpCard);
    secondCard.removeEventListener('click', filpCard);

    resetBord();
}

//Function para revirar as cartas na posição original
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBord();
    }, 1500)
}
//Function para resetar o tabuleiro
function resetBord() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

//Função auto invocada
//função que embaralha as cartas
(function shuffle() {
    cards.forEach((cards) => {
        let radonPosition = Math.floor(Math.random() * 12);
        cards.style.order = radonPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', filpCard);
});