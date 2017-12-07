(() => {

    let Matrix = window.Matrix;
    let Objecto = window.Objecto;

    let roundness = 1;

    let leftArm = new Objecto("sphere", "lightPink", true, roundness);
    let leftArmMatrix = new Matrix();
    leftArmMatrix.translate(-0.15, 1.2, 0);
    leftArmMatrix.scale(0.2, 0.16, 0.1);
    leftArmMatrix.rotate(0, 0, 0, 0);
    leftArm.matrix = leftArmMatrix;
    leftArm.transformVertices(leftArmMatrix);

    let rightArm = new Objecto("sphere", "lightPink", true, roundness);
    let rightArmMatrix = new Matrix();
    rightArmMatrix.translate(0.75, 1.2, 0);
    rightArmMatrix.scale(0.2, 0.16, 0.1);
    rightArmMatrix.rotate(0, 0, 0, 0);
    rightArm.matrix = rightArmMatrix;
    rightArm.transformVertices(rightArmMatrix);

    let leftFoot = new Objecto("sphere", "hotPink", true, roundness);
    let leftFootMatrix = new Matrix();
    leftFootMatrix.translate(0.1, 0.8, 0.1);
    leftFootMatrix.scale(0.15, 0.12, 0.4);
    leftFootMatrix.rotate(0, 0, 0, 0);
    leftFoot.matrix = leftFootMatrix;
    leftFoot.transformVertices(leftFootMatrix);

    let rightFoot = new Objecto("sphere", "hotPink", true, roundness);
    let rightFootMatrix = new Matrix();
    rightFootMatrix.translate(0.5, 0.8, 0.1);
    rightFootMatrix.scale(0.15, 0.12, 0.4);
    rightFootMatrix.rotate(0, 0, 0, 0);
    rightFoot.matrix = rightFootMatrix;
    rightFoot.transformVertices(rightFootMatrix);

    let leftEye = new Objecto("sphere", "blue", true, roundness);
    let leftEyeMatrix = new Matrix();
    leftEyeMatrix.translate(0.2, 1.3, 0.45);
    leftEyeMatrix.scale(0.05, 0.1, 0.1);
    leftEyeMatrix.rotate(0, 0, 0, 0);
    leftEye.matrix = leftEyeMatrix;
    leftEye.transformVertices(leftEyeMatrix);

    let leftEyeball = new Objecto("sphere", "white", true, roundness);
    let leftEyeballMatrix = new Matrix();
    leftEyeballMatrix.translate(0.2, 1.349, 0.5);
    leftEyeballMatrix.scale(0.025, 0.05, 0.05);
    leftEyeballMatrix.rotate(0, 0, 0, 0);
    leftEyeball.matrix = leftEyeballMatrix;
    leftEyeball.transformVertices(leftEyeballMatrix);

    let rightEye = new Objecto("sphere", "blue", true, roundness);
    let rightEyeMatrix = new Matrix();
    rightEyeMatrix.translate(0.4, 1.3, 0.45);
    rightEyeMatrix.scale(0.05, 0.1, 0.1);
    rightEyeMatrix.rotate(0, 0, 0, 0);
    rightEye.matrix = rightEyeMatrix;
    rightEye.transformVertices(rightEyeMatrix);

    let rightEyeball = new Objecto("sphere", "white", true, roundness);
    let rightEyeballMatrix = new Matrix();
    rightEyeballMatrix.translate(0.4, 1.349, 0.5);
    rightEyeballMatrix.scale(0.025, 0.05, 0.05);
    rightEyeballMatrix.rotate(0, 0, 0, 0);
    rightEyeball.matrix = rightEyeballMatrix;
    rightEyeball.transformVertices(rightEyeballMatrix);

    let mouth = new Objecto("pyramid", "hotPink", true);
    let mouthMatrix = new Matrix();
    mouthMatrix.translate(0.3, 1.12, 0.47);
    mouthMatrix.scale(0.15, 0.1, 0.1);
    mouthMatrix.rotate(180, 1, 0, 0);
    mouth.matrix = mouthMatrix;
    mouth.transformVertices(mouthMatrix);

    let body = new Objecto("sphere", "lightPink", true, roundness);
    let bodyMatrix = new Matrix();
    bodyMatrix.translate(0.3, 1.2, 0);
    bodyMatrix.scale(0.5, 0.5, 0.5);
    bodyMatrix.rotate(0, 0, 0, 0);
    body.matrix = bodyMatrix;
    body.transformVertices(bodyMatrix);

    leftEye.child.push(leftEyeball);
    rightEye.child.push(rightEyeball);
    body.child.push(leftArm);
    body.child.push(rightArm);
    body.child.push(leftFoot);
    body.child.push(rightFoot);
    body.child.push(leftEye);
    body.child.push(rightEye);
    body.child.push(mouth);

    let newBodyMatrix = new Matrix();
    newBodyMatrix.scale(1, 1, 1);
    newBodyMatrix.rotate(0, 0, 1, 0);
    newBodyMatrix.translate(-1.5, -1.5, 0);
    body.transformVertices(newBodyMatrix);

    let objectArray = [];
    objectArray.push(body);
    objectArray.push(leftArm);
    objectArray.push(rightArm);
    objectArray.push(leftFoot);
    objectArray.push(rightFoot);
    objectArray.push(leftEye);
    objectArray.push(leftEyeball);
    objectArray.push(rightEye);
    objectArray.push(rightEyeball);
    objectArray.push(mouth);

    let drawShape = new window.DrawShape();
    drawShape.setup(objectArray);

})();
