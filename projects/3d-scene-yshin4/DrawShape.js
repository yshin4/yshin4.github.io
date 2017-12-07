(() => {

    class DrawShape {

        constructor(){
            this.canvas = document.getElementById("scene");
        }

        getRotationMatrix (angle, x, y, z) {
            // In production code, this function should be associated
            // with a matrix object with associated functions.
            let axisLength = Math.sqrt(x * x + y * y + z * z);
            let s = Math.sin(angle * Math.PI / 180.0);
            let c = Math.cos(angle * Math.PI / 180.0);
            let oneMinusC = 1.0 - c;

            // Normalize the axis vector of rotation.
            x /= axisLength;
            y /= axisLength;
            z /= axisLength;

            // Now we can calculate the other terms.
            // "2" for "squared."
            let x2 = x * x;
            let y2 = y * y;
            let z2 = z * z;
            let xy = x * y;
            let yz = y * z;
            let xz = x * z;
            let xs = x * s;
            let ys = y * s;
            let zs = z * s;

            // GL expects its matrices in column major order.
            return [
                x2 * oneMinusC + c,
                xy * oneMinusC + zs,
                xz * oneMinusC - ys,
                0.0,

                xy * oneMinusC - zs,
                y2 * oneMinusC + c,
                yz * oneMinusC + xs,
                0.0,

                xz * oneMinusC + ys,
                yz * oneMinusC - xs,
                z2 * oneMinusC + c,
                0.0,

                0.0,
                0.0,
                0.0,
                1.0
            ];
        }

        getTransformMatrix (px, py, pz) {
            return [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                px, py, pz, 1
            ];
        }

        getOrthoMatrix (left, right, bottom, top, zNear, zFar){
            let width = right - left;
            let height = top - bottom;
            let depth = zFar - zNear;

            return [
                2.0 / width,
                0.0,
                0.0,
                0.0,

                0.0,
                2.0 / height,
                0.0,
                0.0,

                0.0,
                0.0,
                -2.0 / depth,
                0.0,

                -(right + left) / width,
                -(top + bottom) / height,
                -(zFar + zNear) / depth,
                1.0
            ];
        }

        getPerspectiveMatrix(left, right, bottom, top, zNear, zFar){
            let width = right - left;
            let height = top - bottom;
            let depth = zFar - zNear;

            return [
                2 * zNear / width,
                0,
                0,
                0,

                0,
                2 * zNear / height,
                0,
                0,

                (right + left) / width,
                (top + bottom) / height,
                -(zFar + zNear) / depth,
                -1,

                0,
                0,
                -2 * zNear * zFar / depth,
                0
            ];
        }

        getCameraMatrix(px, py, pz, qx, qy, qz, ux, uy, uz){
            let Vector = window.Vector;
            let u = new Vector([ux], [uy], [uz]);
            let p = new Vector([px], [py], [pz]);
            let q = new Vector([qx], [qy], [qz]);
            let z = (p.subtract(q)).unit;
            let y = (u.subtract(u.projection(z))).unit;
            let x = (y.cross(z)).unit;

            return [
                x.x,
                x.y,
                x.z,
                -1 * p.dot(x),

                y.x,
                y.y,
                y.z,
                -1 * p.dot(y),

                z.x,
                z.y,
                z.z,
                -1 * p.dot(z),

                0,
                0,
                0,
                1
            ];
        }

        setup(objectArray) {

            let GLSLUtilities = window.GLSLUtilities;
            let $ = window.$;
            let gl = GLSLUtilities.getGL(this.canvas);
            if (!gl) {
                alert("No WebGL context found...sorry.");

                // No WebGL, no use going on...
                return;
            }

            gl.enable(gl.DEPTH_TEST);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.viewport(0, 0, this.canvas.width, this.canvas.height);

            objectArray.forEach((objectToDraw) => {
                objectToDraw.vertexBuffer = GLSLUtilities.initVertexBuffer(gl, objectToDraw.vertices);

                if (!objectToDraw.colors) {
                    // If we have a single color, we expand that into an array
                    // of the same color over and over.
                    objectToDraw.colors = [];
                    for (let i = 0, maxi = objectToDraw.vertices.length / 3; i < maxi; i += 1) {
                        objectToDraw.colors = objectToDraw.colors.concat(
                            objectToDraw.color.r,
                            objectToDraw.color.g,
                            objectToDraw.color.b
                        );
                    }
                }

                objectToDraw.colorBuffer = GLSLUtilities.initVertexBuffer(gl, objectToDraw.colors);

                if (!objectToDraw.specularColors) {
                    // Future refactor: helper function to convert a single value or
                    // array into an array of copies of itself.
                    objectToDraw.specularColors = [];
                    for (let j = 0, maxj = objectToDraw.vertices.length / 3; j < maxj; j += 1) {
                        objectToDraw.specularColors = objectToDraw.specularColors.concat(
                            objectToDraw.specularColor.r,
                            objectToDraw.specularColor.g,
                            objectToDraw.specularColor.b
                        );
                    }
                }
                objectToDraw.specularBuffer = GLSLUtilities.initVertexBuffer(gl, objectToDraw.specularColors);

                // One more buffer: normals.
                objectToDraw.normalBuffer = GLSLUtilities.initVertexBuffer(gl, objectToDraw.normals);
            });

            let abort = false;
            let shaderProgram = GLSLUtilities.initSimpleShaderProgram(
                gl,
                $("#vertex-shader").text(),
                $("#fragment-shader").text(),

                // Very cursory error-checking here...
                (shader) => {
                    abort = true;
                    alert("Shader problem: " + gl.getShaderInfoLog(shader));
                }

                // Another simplistic error check: we don't even access the faulty
                // shader program.
                // (shaderProgram) => {
                //     abort = true;
                //     alert("Could not link shaders...sorry.");
                // }
            );

            // If the abort variable is true here, we can't continue.
            if (abort) {
                alert("Fatal errors encountered; we cannot continue.");
                return;
            }

            // All done --- tell WebGL to use the shader program from now on.
            gl.useProgram(shaderProgram);

            // Hold on to the important variables within the shaders.
            let vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
            gl.enableVertexAttribArray(vertexPosition);
            // let vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
            // gl.enableVertexAttribArray(vertexColor);
            let vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
            gl.enableVertexAttribArray(vertexDiffuseColor);
            let vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
            gl.enableVertexAttribArray(vertexSpecularColor);
            let normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
            gl.enableVertexAttribArray(normalVector);

            let rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
            let modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
            let projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
            let perspectiveMatrix = gl.getUniformLocation(shaderProgram, "perspectiveMatrix");
            let cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");
            let transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");

            let lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
            let lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
            let lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
            let shininess = gl.getUniformLocation(shaderProgram, "shininess");


            let drawObject = (object) => {
                // Set the varying colors.
                gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
                gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
                gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

                // Set the shininess.
                gl.uniform1f(shininess, object.shininess);

                gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(object.axis ?
                    this.getRotationMatrix(currentRotation, object.axis.x, object.axis.y, object.axis.z) :
                    new window.Matrix().getRawArray()));

                // Set the varying vertex coordinates.
                gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
                gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);
                gl.bindBuffer(gl.ARRAY_BUFFER, object.vertexBuffer);
                gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
                gl.drawArrays(object.mode, 0, object.vertices.length / 3);

            };

            let drawScene = () => {
                // Clear the display.
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                // Set up the rotation matrix.
                gl.uniformMatrix4fv(rotationMatrix, gl.FALSE,
                  new Float32Array(this.getRotationMatrix(currentRotation, 0, 1, 0)));

                gl.uniformMatrix4fv(transformMatrix, gl.FALSE,
                  new Float32Array(this.getTransformMatrix(position.x, position.y, position.z)));

                // Display the objects.
                objectArray.forEach(drawObject);

                // All done.
                gl.flush();
            };

            gl.uniformMatrix4fv(perspectiveMatrix, gl.FALSE, new Float32Array(this.getPerspectiveMatrix(
                -2 * (this.canvas.width / this.canvas.height),
                2 * (this.canvas.width / this.canvas.height),
                -2,
                2,
                -10,
                10
            )));

            gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(this.getOrthoMatrix(
                -2 * (this.canvas.width / this.canvas.height),
                2 * (this.canvas.width / this.canvas.height),
                -2,
                2,
                -10,
                10
            )));

            gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, new Float32Array(this.getCameraMatrix(
                0 * (this.canvas.width / this.canvas.height),
                0 * (this.canvas.width / this.canvas.height),
                0,
                -0.5,
                0.1,
                -1,
                0,
                1,
                0
            )));

            let lightColor = [0.3, 1.0, 1.0];

            gl.uniform4fv(lightPosition, [-300.0, 1000.0, 700.0, .0]);
            gl.uniform3fv(lightDiffuse, lightColor);
            gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);

            let ChangeLightColor = () => {
                let r = document.getElementById("redValue").value;
                let g = document.getElementById("greenValue").value;
                let b = document.getElementById("blueValue").value;
                lightColor = [r, g, b];
                gl.uniform3fv(lightDiffuse, lightColor);
            };

            $(document).ready(function() {
                $("#ChangeColor").click(function(){
                    ChangeLightColor();
                });
            });

            let animationActive = false;
            let currentRotation = 0.0;
            let previousTimestamp = null;

            const FRAMES_PER_SECOND = 60;
            const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND;

            const DEGREES_PER_MILLISECOND = 0.033;
            const FULL_CIRCLE = 360.0;

            const ACCELERATION_COEFFICIENT = -0.098;
            let position = {x: 0, y: 0, z: 0};
            let velocity = 0;
            let acceleration = 1;

            let ground = -0.2;

            let advanceScene = (timestamp) => {
                // Check if the user has turned things off.
                if (!animationActive) {
                    return;
                }

                // Initialize the timestamp.
                if (!previousTimestamp) {
                    previousTimestamp = timestamp;
                    window.requestAnimationFrame(advanceScene);
                    return;
                }

                // Check if it's time to advance.
                var progress = timestamp - previousTimestamp;
                if (progress < MILLISECONDS_PER_FRAME) {
                    // Do nothing if it's too soon.
                    window.requestAnimationFrame(advanceScene);
                    return;
                }

                // All clear.
                currentRotation += DEGREES_PER_MILLISECOND * progress;

                position.y += velocity;

                velocity += acceleration * ACCELERATION_COEFFICIENT;

                if (position.y < ground){
                    velocity *= -1;
                }

                if (position.y > 1.7){
                    velocity -= 0.3 * velocity;
                }

                drawScene();

                if (currentRotation >= FULL_CIRCLE) {
                    currentRotation -= FULL_CIRCLE;
                }

                // Request the next frame.
                previousTimestamp = timestamp;
                window.requestAnimationFrame(advanceScene);
            };

            // Draw the initial scene.
            drawScene();

            // Set up the rotation toggle: clicking on the canvas does it.
            $(this.canvas).click(() => {
                animationActive = !animationActive;
                if (animationActive) {
                    previousTimestamp = null;
                    window.requestAnimationFrame(advanceScene);
                }
            });
        }

    }
    window.DrawShape = DrawShape;
})();
