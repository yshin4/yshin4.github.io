(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let tfBody = new Image();
    tfBody.addEventListener('load', () => {
        SampleSpriteLibrary.tf.ready = true;
    });
    tfBody.src = 'image/tf_body.png';

    let tfArm = new Image();
    tfArm.addEventListener('load', () =>{
        SampleSpriteLibrary.tf.ready = true;
    });
    tfArm.src = 'image/tf_arm.png';



    SampleSpriteLibrary.tf = (twistedFate) => {
        let renderingContext = twistedFate.renderingContext;
        let armLift = twistedFate.armLift || 0;
        let armx = twistedFate.armx || (1024 / 8) / 1.94;
        let army = twistedFate.army || (768 / 2) / 6;
        let armPosition = twistedFate.armPosition || 0;

        let liftArm = (armLift) => {
            renderingContext.save();
            renderingContext.rotate((Math.PI / 180) * -armLift);
            renderingContext.translate(-armPosition * 1.5, armPosition - 7);
            renderingContext.drawImage(tfArm, 0, 0);
            renderingContext.restore();
        };

        renderingContext.save();
        renderingContext.translate(armx, army);
        liftArm(armLift);
        renderingContext.restore();

        renderingContext.save();
        renderingContext.drawImage(tfBody, 0, 0);
        renderingContext.restore();
    };
    SampleSpriteLibrary.tf.ready = false;
})();
