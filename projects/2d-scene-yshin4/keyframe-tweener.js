/*
 * A simple keyframe-tweening animation module for 2D
 * canvas elements.
 */

(() => {
    // The big one: animation initialization.  The settings parameter
    // is expected to be a JavaScript object with the following
    // properties:
    //
    // - renderingContext: the 2D canvas rendering context to use
    // - width: the width of the canvas element
    // - height: the height of the canvas element
    // - scene: the array of sprites to animate
    // - frameRate: number of frames per second (default 24)
    //
    // In turn, each sprite is a JavaScript object with the following
    // properties:
    //
    // - draw: the function that draws the sprite
    // - keyframes: the array of keyframes that the sprite should follow
    //
    // Finally, each keyframe is a JavaScript object with the following
    // properties.  Unlike the other objects, defaults are provided in
    // case a property is not present:
    //
    // - frame: the global animation frame number in which this keyframe
    //          is to appear
    // - ease: the easing function to use (default is KeyframeTweener.linear)
    // - tx, ty: the location of the sprite (default is 0, 0)
    // - sx, sy: the scale factor of the sprite (default is 1, 1)
    // - rotate: the rotation angle of the sprite (default is 0)
    let initializeAnimation = (settings) => {
        // We need to keep track of the current frame.
        let currentFrame = 0;

        // Avoid having to go through settings to get to the
        // rendering context and sprites.
        let renderingContext = settings.renderingContext;
        let width = settings.width;
        let height = settings.height;
        let scene = settings.scene;

        let processScene = (() => {
            for (let i = 0; i < scene.length; i++){
                let sprite = {
                    name: scene[i].sprite,
                    propertyNameArray: [],
                    propertyFrames: {},
                    transformProperties: {tx: 0, ty: 0, sx: 1, sy: 1, rotate: 0, ease: "linear"},
                    parameterProperties: {renderingContext}
                };
                for (let j = 0; j < scene[i].keyframes.length; j++){
                    var properties = Object.keys(scene[i].keyframes[j]);
                    for (var s of properties){
                        if (s !== "frame" && sprite.propertyNameArray.indexOf(s) === -1){
                            sprite.propertyNameArray.push(s);
                        }
                    }
                }
                for (let j = 0; j < sprite.propertyNameArray.length; j++){
                    let propertyName = sprite.propertyNameArray[j];
                    sprite.propertyFrames[propertyName] = [];
                    for (let k = 0; k < scene[i].keyframes.length; k++){
                        if (scene[i].keyframes[k][propertyName] !== undefined){
                            let propertyData = {frame: scene[i].keyframes[k].frame, value: scene[i].keyframes[k][propertyName]};
                            sprite.propertyFrames[propertyName].push(propertyData);
                        }
                    }
                }
                sceneData.push(sprite);
            }
        });

        let sceneData = [];
        processScene();

        let getNextKeyframe = (sprite, frameNumber, propertyName, isValue) => {
            if (!sprite.propertyFrames[propertyName]){ return undefined; }
            for (let i = 0; i < sprite.propertyFrames[propertyName].length; i++){
                if (sprite.propertyFrames[propertyName][i].frame > frameNumber){
                    return isValue ? sprite.propertyFrames[propertyName][i].value :
                    sprite.propertyFrames[propertyName][i].frame;
                }
            }
            let lastKeyframeValue = sprite.propertyFrames[propertyName][sprite.propertyFrames[propertyName].length - 1];
            if (lastKeyframeValue === undefined){ return undefined; }
            return isValue ? lastKeyframeValue.value : lastKeyframeValue.frame;
        };

        let getPreviousKeyframe = (sprite, frameNumber, propertyName, isValue) => {
            if (!sprite.propertyFrames[propertyName]) { return undefined; }
            for (let i = sprite.propertyFrames[propertyName].length - 1; i >= 0; i--){
                if (sprite.propertyFrames[propertyName][i].frame <= frameNumber){
                    return isValue ? sprite.propertyFrames[propertyName][i].value :
                    sprite.propertyFrames[propertyName][i].frame;
                }
            }
            return undefined;
        };

        let previousTimestamp = null;
        let nextFrame = (timestamp) => {
            // Bail-out #1: We just started.
            if (!previousTimestamp) {
                previousTimestamp = timestamp;
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Bail-out #2: Too soon.
            if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 24))) {
                window.requestAnimationFrame(nextFrame);
                return;
            }

            let cardLoad = SampleSpriteLibrary.cards.ready;
            let tfLoad = SampleSpriteLibrary.tf.ready;
            let poroLoad = SampleSpriteLibrary.poro.ready;
            let strikeLoad = SampleSpriteLibrary.strike.ready;
            let shockLoad = SampleSpriteLibrary.shock.ready;
            if (!cardLoad || !tfLoad || !poroLoad || !strikeLoad || !shockLoad) {
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Clear the canvas.
            renderingContext.clearRect(0, 0, width, height);
            for (let i = 0; i < sceneData.length; i++) {
                if (scene[i].keyframes[scene[i].keyframes.length - 1].frame < currentFrame){ continue; }
                if (scene[i].keyframes[0].frame > currentFrame){ continue; }
                for (let j = 0; j < sceneData[i].propertyNameArray.length; j++) {
                    if (sceneData[i].propertyNameArray[j] === "ease"){ continue; }
                    let propertyName = sceneData[i].propertyNameArray[j];
                    let prevframe = getPreviousKeyframe(sceneData[i], currentFrame, propertyName, false);
                    let nextframe = getNextKeyframe(sceneData[i], currentFrame, propertyName, false);
                    if (currentFrame >= prevframe && currentFrame <= nextframe) {
                        let startKeyframe = prevframe;
                        let endKeyframe = nextframe;
                        let tweenFrame = currentFrame - startKeyframe;
                        let duration = endKeyframe - startKeyframe + 1;
                        let start = getPreviousKeyframe(sceneData[i], currentFrame, propertyName, true);
                        let distance = getNextKeyframe(sceneData[i], currentFrame, propertyName, true) - start;
                        if (propertyName === "rotate"){ distance *= Math.PI / 180; }
                        let ease = KeyframeTweener[getPreviousKeyframe(sceneData[i], prevframe, "ease", true) || "linear"];
                        if (propertyName === "sx" || propertyName === "sy" || propertyName === "tx" ||
                        propertyName === "ty" || propertyName === "rotate") {
                            sceneData[i].transformProperties[propertyName] = ease(tweenFrame, start, distance, duration);
                        } else {
                            sceneData[i].parameterProperties[propertyName] = ease(tweenFrame, start, distance, duration);
                        }
                    }
                }
                renderingContext.save();
                renderingContext.translate(
                    sceneData[i].transformProperties.tx,
                    sceneData[i].transformProperties.ty
                );
                renderingContext.rotate(
                    sceneData[i].transformProperties.rotate
                );
                renderingContext.scale(
                    sceneData[i].transformProperties.sx,
                    sceneData[i].transformProperties.sy
                );
                SampleSpriteLibrary[sceneData[i].name](
                    sceneData[i].parameterProperties
                );
                renderingContext.restore();
            }
            currentFrame += 1;
            previousTimestamp = timestamp;
            window.requestAnimationFrame(nextFrame);
        };
        window.requestAnimationFrame(nextFrame);
    };

    window.KeyframeTweener = {
        // The module comes with a library of common easing functions.
        linear: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return distance * percentComplete + start;
        },

        quadEaseIn: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return distance * percentComplete * percentComplete + start;
        },

        quadEaseOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return -distance * percentComplete * (percentComplete - 2) + start;
        },

        quadEaseInAndOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / (duration / 2);
            return (percentComplete < 1) ?
                    (distance / 2) * percentComplete * percentComplete + start :
                    (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
        },

        sineEaseInAndOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return -distance / 2 * (Math.cos(Math.PI * percentComplete) - 1) + start;
        },

        ExpoEaseIn: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return (currentTime === 0) ? start : distance * Math.pow(2, 10 * (percentComplete - 1)) + start;
        },

        CircEaseIn: (currentTime, start, distance, duration) => {
            // non-monotonic
            let percentComplete = currentTime / duration;
            return -distance * (Math.sqrt(1 - (percentComplete) * percentComplete) - 1) + start;
        },

        BounceEaseOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            if (percentComplete < 1 / 2.75){
                return distance * (7.5625 * currentTime * currentTime) + start;
            } else if (currentTime < (2 / 2.75)) {
                return distance * (7.5625 * (currentTime -= (1.5 / 2.75)) * currentTime + .75) + start;
            } else if (currentTime < (2.5 / 2.75)) {
                return distance * (7.5625 * (currentTime -= (2.25 / 2.75)) * currentTime + .9375) + start;
            } else {
                return distance * (7.5625 * (currentTime -= (2.625 / 2.75)) * currentTime + .984375) + start;
            }
        },

        CubicEaseIn: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return distance * percentComplete * percentComplete * percentComplete + start;
        },

        initialize: initializeAnimation
    };
})();
