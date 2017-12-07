(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let poroBody = new Image();
    poroBody.addEventListener('load', () => {
        SampleSpriteLibrary.poro.ready = true;
    });
    poroBody.src = 'image/poro_body2.png';

    let poroConfused = new Image();
    poroConfused.addEventListener('load', () => {
        SampleSpriteLibrary.poro.ready = true;
    });
    poroConfused.src = 'image/poro_confused.png';

    let poroTongue = new Image();
    poroTongue.addEventListener('load', () => {
        SampleSpriteLibrary.poro.ready = true;
    });
    poroTongue.src = 'image/poro_tongue.png';

    let poroEye = new Image();
    poroEye.addEventListener('load', () => {
        SampleSpriteLibrary.poro.ready = true;
    });
    poroEye.src = 'image/poro_eye.png';

    SampleSpriteLibrary.poro = (poro) => {
        let renderingContext = poro.renderingContext;
        let tongueSize = poro.tongueOut;
        let isConfused = poro.isConfused;
        // let eyeSize = poro.eyeSize;



        let tongueOut = (tongueSize) => {
            renderingContext.save();
            renderingContext.scale(1, tongueSize);
            renderingContext.translate(4, 65 / tongueSize);
            renderingContext.drawImage(poroTongue, 0, 0);
            // renderingContext.drawImage(poroTongue, 2, 64 );
            renderingContext.restore();
        };

        // let eyeClose = (eyeSize) => {
        //   renderingContext.save();
        //   renderingContext.scale(1.05,1.05-eyeSize);
        //   renderingContext.translate(35, 41);
        //   renderingContext.drawImage(poroEye, 0, 0);
        //   renderingContext.restore();
        // }

        renderingContext.save();
        if (isConfused){
            renderingContext.drawImage(poroConfused, 0, 0);
        } else {
            renderingContext.drawImage(poroBody, 0, 0);
        }

        // eyeClose(eyeSize);
        tongueOut(tongueSize);
        // renderingContext.drawImage(poroTongue, 2, 61);
        renderingContext.restore();
    };
    SampleSpriteLibrary.poro.ready = false;
})();
