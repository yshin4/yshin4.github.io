(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let strikeEffect = new Image();
    strikeEffect.addEventListener('load', () => {
        SampleSpriteLibrary.strike.ready = true;
    });
    strikeEffect.src = 'image/strike.png';

    SampleSpriteLibrary.strike = (strike) => {
        let renderingContext = strike.renderingContext;
        let strikeMove = strike.strikeMove || 0;

        let strikeHit = (strikeMove) => {
            renderingContext.save();
            renderingContext.translate(strikeMove, 0);
            renderingContext.drawImage(strikeEffect, 0, 0);
            renderingContext.restore();
        };

        renderingContext.save();
        strikeHit(strikeMove);
        renderingContext.restore();
    };
    SampleSpriteLibrary.strike.ready = false;
})();
