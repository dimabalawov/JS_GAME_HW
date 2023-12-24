$(document).ready(function () {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    let cards = [];

    const memoryBoard = $('.memory-board');
    const startButton = $('#start-btn');

    function shuffleArray(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createCard(letter) {
        const card = $('<div>').addClass('card');

        const cardInner = $('<div>').addClass('card-inner');

        const cardBack = $('<div>').addClass('card-face card-back').text(letter);

        cardInner.append(cardBack);
        card.append(cardInner);

        card.click(function () {
            flipCard($(this));
        });

        return card;
    }

    function createBoard() {
        cards.forEach(card => card.remove());
        cards = [];

        const doubledLetters = [...letters, ...letters];
        shuffleArray(doubledLetters);

        doubledLetters.forEach(letter => {
            const card = createCard(letter);
            memoryBoard.append(card);
            cards.push(card);
        });
    }

    function flipCard(card) {
        if (!card.hasClass('flipped')) {
            card.addClass('flipped');

            setTimeout(() => {
                if (cards.every(card => card.hasClass('flipped'))) {
                    setTimeout(() => {
                        cards.forEach(card => card.removeClass('flipped'));
                    }, 1000);
                }
            }, 1000);
        }
    }

    // Добавлены новые блоки кода
    setTimeout(() => {
        cards.forEach(card => card.addClass('flipped'));
        setTimeout(() => {
            cards.forEach(card => card.removeClass('flipped'));
            startButton.prop('disabled', false);
        }, 2000);
    }, 1000);

    startButton.click(function () {
        startButton.prop('disabled', true);
        createBoard();
        setTimeout(() => {
            cards.forEach(card => card.addClass('flipped'));
            setTimeout(() => {
                cards.forEach(card => card.removeClass('flipped'));
            }, 3000);
        }, 1000);
    });
});
