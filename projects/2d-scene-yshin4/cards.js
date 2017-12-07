(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let blueCard = new Image();
    blueCard.addEventListener('load', () => {
        SampleSpriteLibrary.cards.ready = true;
    });
    blueCard.src = 'image/bluecard.png';

    let redCard = new Image();
    redCard.addEventListener('load', () => {
        SampleSpriteLibrary.cards.ready = true;
    });
    redCard.src = 'image/redcard.png';

    let yellowCard = new Image();
    yellowCard.addEventListener('load', () => {
        SampleSpriteLibrary.cards.ready = true;
    });
    yellowCard.src = 'image/yellowcard.png';

    SampleSpriteLibrary.cards = (cards) => {
        let renderingContext = cards.renderingContext;
        let cardNumber = cards.cardNumber || 0;

        let chooseCard = (cardNumber) => {
            if (cardNumber > 0 && cardNumber < 10) {
                renderingContext.save();
                renderingContext.drawImage(blueCard, -70, -30);
                renderingContext.globalAlpha = 0.5;
                renderingContext.drawImage(redCard, 0, 0);
                renderingContext.drawImage(yellowCard, 70, 0);
                renderingContext.restore();
            } else if (cardNumber > 10 && cardNumber < 20) {
                renderingContext.save();
                renderingContext.drawImage(redCard, 0, -30);
                renderingContext.globalAlpha = 0.5;
                renderingContext.drawImage(blueCard, -70, 0);
                renderingContext.drawImage(yellowCard, 70, 0);
                renderingContext.restore();
            } else if (cardNumber > 20 && cardNumber < 30) {
                renderingContext.save();
                renderingContext.drawImage(yellowCard, 70, -30);
                renderingContext.globalAlpha = 0.5;
                renderingContext.drawImage(blueCard, -70, 0);
                renderingContext.drawImage(redCard, 0, 0);
                renderingContext.restore();
            } else {
                renderingContext.save();
                renderingContext.globalAlpha = 0.5;
                renderingContext.drawImage(blueCard, -70, 0);
                renderingContext.drawImage(redCard, 0, 0);
                renderingContext.drawImage(yellowCard, 70, 0);
                renderingContext.restore();
            }
        };

        renderingContext.save();
        chooseCard(cardNumber);
        renderingContext.restore();

    };
    SampleSpriteLibrary.cards.ready = false;
})();
