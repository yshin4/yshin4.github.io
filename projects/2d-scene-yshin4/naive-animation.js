(() => {
    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");

    // This is effectively a visual tester, so we just lay out our variables without much structure.
    let tfx = canvas.width / 8;
    let tfy = canvas.height / 2;
    let armLift = 0;
    let armDegrees = 1;
    let armx = tfx / 1.95;
    let army = tfy / 6;
    let armPosition = 0;

    let cardsx = canvas.width / 6.5;
    let cardsy = canvas.height / 2.7;
    let cardNumber = 1;

    let porox = canvas.width / 1.4;
    let poroy = canvas.height / 1.66;
    let isConfused = false;
    let tongueOut = 1;
    let tongueSize = -0.1;
    let eyeSize = 0.1;

    let strikex = canvas.width / 6;
    let strikey = canvas.height / 1.7;
    let strikeMove = 0;

    let shockx = canvas.width / 1.46;
    let shocky = canvas.height / 1.85;
    let shockColor = 0;

    const FRAME_DURATION = 30; // In milliseconds.

    let lastTimestamp = 0;
    let drawFrame = (timestamp) => {
        lastTimestamp = lastTimestamp || timestamp;
        let cardLoad = SampleSpriteLibrary.cards.ready;
        let tfLoad = SampleSpriteLibrary.cards.ready;
        let poroLoad = SampleSpriteLibrary.poro.ready;
        let strikeLoad = SampleSpriteLibrary.strike.ready;
        let shockLoad = SampleSpriteLibrary.shock.ready;
        if (!cardLoad || !tfLoad || !poroLoad || !strikeLoad || !shockLoad || timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(drawFrame);
            return;
        }

        lastTimestamp = timestamp;

        renderingContext.clearRect(0, 0, canvas.width, canvas.height);

        renderingContext.save();
        renderingContext.translate(strikex, strikey);
        SampleSpriteLibrary.strike({
            renderingContext,
            strikeMove
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(tfx, tfy);
        SampleSpriteLibrary.tf({
            renderingContext,
            armLift,
            tfx,
            tfy,
            armx,
            army,
            armPosition
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(cardsx, cardsy);
        SampleSpriteLibrary.cards({
            renderingContext,
            cardNumber
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(porox, poroy);
        SampleSpriteLibrary.poro({
            renderingContext,
            isConfused,
            porox,
            poroy,
            tongueOut,
            eyeSize
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(shockx, shocky);
        SampleSpriteLibrary.shock({
            renderingContext,
            shockColor
        });
        renderingContext.restore();

        // Totally repetitive, arbitrary, magic-numbered, just-show-it-works variable update code.

        strikeMove += 25;
        if (strikeMove >= canvas.width / 2.2){
            strikeMove = 0;
        }

        cardNumber = cardNumber === 30 ? 0 : cardNumber + 0.5;

        shockColor = shockColor === 30 ? 0 : shockColor + 0.5;

        armLift += armDegrees * 9;
        if (armLift === 90 || armLift === 0){
            armDegrees *= -1;
        }

        if (armPosition !== 15){
            armPosition += 5;
        }

        tongueOut += tongueSize;
        if (tongueOut === 1 || tongueOut < 0){
            tongueSize *= -1;
        }

        eyeSize += 0.1;
        if (eyeSize >= 1){
            eyeSize *= -1;
        }



        window.requestAnimationFrame(drawFrame);
    };

    window.requestAnimationFrame(drawFrame);
})();
