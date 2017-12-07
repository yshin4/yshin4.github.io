(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let redShock = new Image();
    redShock.addEventListener('load', () => {
        SampleSpriteLibrary.shock.ready = true;
    });
    redShock.src = 'image/shock_red.png';

    let orangeShock = new Image();
    orangeShock.addEventListener('load', () => {
        SampleSpriteLibrary.shock.ready = true;
    });
    orangeShock.src = 'image/shock_orange.png';

    let yellowShock = new Image();
    yellowShock.addEventListener('load', () => {
        SampleSpriteLibrary.shock.ready = true;
    });
    yellowShock.src = "image/shock_yellow.png";


    SampleSpriteLibrary.shock = (shock) => {
        let renderingContext = shock.renderingContext;
        let shockColor = shock.shockColor || 0;

        let shockEffect = (shockColor) => {
            if (shockColor <= 10) {
                renderingContext.save();
                renderingContext.drawImage(redShock, 0, 0);
                renderingContext.restore();
            } else if (shockColor <= 20) {
                renderingContext.save();
                renderingContext.drawImage(orangeShock, 0, 0);
                renderingContext.restore();
            } else {
                renderingContext.save();
                renderingContext.drawImage(yellowShock, 0, 0);
                renderingContext.restore();
            }
        };

        renderingContext.save();
        renderingContext.scale(1.8, 1.8);
        shockEffect(shockColor);
        renderingContext.restore();
    };
    SampleSpriteLibrary.shock.ready = false;
})();
