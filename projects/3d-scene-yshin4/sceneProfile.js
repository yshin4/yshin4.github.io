(() => {

    let Matrix = window.Matrix;
    let Objecto = window.Objecto;

    let leftArm = new Objecto("sphere", "lightPink", true, 3);
    let leftArmMatrix = new Matrix();
    leftArmMatrix.translate(-0.05, 1.2, 0.1);
    leftArmMatrix.scale(0.2, 0.16, 0.1);
    leftArmMatrix.rotate(0, 0, 0, 0);
    leftArm.matrix = leftArmMatrix;
    leftArm.transformVertices(leftArmMatrix);

    let leftArmStroke = new Objecto("sphere", "pink", false, 3);
    let leftArmStrokeMatrix = new Matrix();
    leftArmStrokeMatrix.translate(-0.05, 1.2, 0.1);
    leftArmStrokeMatrix.scale(0.2, 0.16, 0.0);
    leftArmStrokeMatrix.rotate(0, 0, 0, 0);
    leftArmStroke.matrix = leftArmStrokeMatrix;
    leftArmStroke.transformVertices(leftArmStrokeMatrix);

    let rightArm = new Objecto("sphere", "lightPink", true, 3);
    let rightArmMatrix = new Matrix();
    rightArmMatrix.translate(-0.05, 1.2, -0.1);
    rightArmMatrix.scale(0.2, 0.16, 0.1);
    rightArmMatrix.rotate(0, 0, 0, 0);
    rightArm.matrix = rightArmMatrix;
    rightArm.transformVertices(rightArmMatrix);

    let rightArmStroke = new Objecto("sphere", "pink", false, 3);
    let rightArmStrokeMatrix = new Matrix();
    rightArmStrokeMatrix.translate(-0.05, 1.2, -0.1);
    rightArmStrokeMatrix.scale(0.2, 0.16, 0.0);
    rightArmStrokeMatrix.rotate(0, 0, 0, 0);
    rightArmStroke.matrix = rightArmStrokeMatrix;
    rightArmStroke.transformVertices(rightArmStrokeMatrix);

    let leftFoot = new Objecto("sphere", "hotPink", true, 3);
    let leftFootMatrix = new Matrix();
    leftFootMatrix.translate(0.4, 0.8, 0);
    leftFootMatrix.scale(0.4, 0.13, 0.0);
    leftFootMatrix.rotate(0, 0, 0, 0);
    leftFoot.matrix = leftFootMatrix;
    leftFoot.transformVertices(leftFootMatrix);

    let rightFoot = new Objecto("sphere", "hotPink", true, 3);
    let rightFootMatrix = new Matrix();
    rightFootMatrix.translate(0.4, 0.8, 0);
    rightFootMatrix.scale(0.4, 0.13, 0.0);
    rightFootMatrix.rotate(0, 0, 0, 0);
    rightFoot.matrix = rightFootMatrix;
    rightFoot.transformVertices(rightFootMatrix);

    let leftEye = new Objecto("sphere", "blue", true, 3);
    let leftEyeMatrix = new Matrix();
    leftEyeMatrix.translate(0.55, 1.3, 0.1);
    leftEyeMatrix.scale(0.05, 0.1, 0.1);
    leftEyeMatrix.rotate(0, 0, 0, 0);
    leftEye.matrix = leftEyeMatrix;
    leftEye.transformVertices(leftEyeMatrix);

    let leftEyeball = new Objecto("sphere", "white", true, 3);
    let leftEyeballMatrix = new Matrix();
    leftEyeballMatrix.translate(0.555, 1.349, 0.2);
    leftEyeballMatrix.scale(0.025, 0.05, 0.1);
    leftEyeballMatrix.rotate(0, 0, 0, 0);
    leftEyeball.matrix = leftEyeballMatrix;
    leftEyeball.transformVertices(leftEyeballMatrix);

    let rightEye = new Objecto("sphere", "blue", true, 3);
    let rightEyeMatrix = new Matrix();
    rightEyeMatrix.translate(0.55, 1.3, -0.1);
    rightEyeMatrix.scale(0.05, 0.1, 0.1);
    rightEyeMatrix.rotate(0, 0, 0, 0);
    rightEye.matrix = rightEyeMatrix;
    rightEye.transformVertices(rightEyeMatrix);

    let rightEyeball = new Objecto("sphere", "white", true, 3);
    let rightEyeballMatrix = new Matrix();
    rightEyeballMatrix.translate(0.555, 1.349, -0.2);
    rightEyeballMatrix.scale(0.025, 0.05, 0.1);
    rightEyeballMatrix.rotate(0, 0, 0, 0);
    rightEyeball.matrix = rightEyeballMatrix;
    rightEyeball.transformVertices(rightEyeballMatrix);

    let mouth = new Objecto("pyramid", "hotPink", true);
    let mouthMatrix = new Matrix();
    mouthMatrix.translate(0.62, 1.1, 0);
    mouthMatrix.scale(0.1, 0.1, 1);
    mouthMatrix.rotate(180, 1, 0, 0);
    mouth.matrix = mouthMatrix;
    mouth.transformVertices(mouthMatrix);

    let body = new Objecto("sphere", "lightPink", true, 3);
    let bodyMatrix = new Matrix();
    bodyMatrix.translate(0.3, 1.2, 0);
    bodyMatrix.scale(0.5, 0.5, 0);
    bodyMatrix.rotate(0, 0, 0, 0);
    body.matrix = bodyMatrix;
    body.transformVertices(bodyMatrix);

    leftEye.child.push(leftEyeball);
    leftArm.child.push(leftArmStroke);
    rightArm.child.push(rightArmStroke);
    body.child.push(leftArm);
    body.child.push(rightArm);
    body.child.push(leftFoot);
    body.child.push(rightFoot);
    body.child.push(leftEye);
    body.child.push(rightEye);
    body.child.push(mouth);

    let newBodyMatrix = new Matrix();
    newBodyMatrix.scale(1.7, 1.7, 1.7);
    newBodyMatrix.rotate(0, 0, 0, 0);
    newBodyMatrix.translate(-1.8, -1.5, 0);
    body.transformVertices(newBodyMatrix);

    let objectArray = [];
    objectArray.push(body);
    objectArray.push(leftArm);
    objectArray.push(leftArmStroke);
    objectArray.push(rightArm);
    objectArray.push(rightArmStroke);
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
