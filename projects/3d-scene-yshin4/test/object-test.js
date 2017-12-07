describe("Object implementation", () => {
    let MeshLibrary = window.MeshLibrary;
    let Objecto = window.Objecto;
    let Matrix = window.Matrix;

    beforeEach(() => {
        let fixture =
          '<div id="fixture">' +
              '<canvas id="scene" width="512" height="512"></canvas>' +
          '></div>';

        document.body.insertAdjacentHTML(
        'afterbegin',
         fixture);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe("creation and data access", () => {
        it("should create a Object with given properties", () => {
            let sphere = new Objecto("sphere", "red", true, 3);
            expect(sphere.refine).toBe(3);
            expect(sphere.fill).toBe(true);
            let answer = MeshLibrary.sphere(3);
            for (let i = 0; i < answer.vertices.length; i++){
                for (let j = 0; j < answer.vertices[0].length; j++){
                    expect(sphere.shape.vertices[i][j]).toBe(answer.vertices[i][j]);
                }
            }
            for (let i = 0; i < answer.indices.length; i++){
                for (let j = 0; j < answer.indices[0].length; j++){
                    expect(sphere.shape.indices[i][j]).toBe(answer.indices[i][j]);
                }
            }
            expect(sphere.color.r).toBe(10);
            expect(sphere.color.g).toBe(0);
            expect(sphere.color.b).toBe(0);
            let icosahedron = new Objecto("icosahedron", "orange", false);
            expect(icosahedron.refine).toBe(1);
            expect(icosahedron.fill).toBe(false);
            let answer2 = MeshLibrary.icosahedron();
            for (let i = 0; i < answer2.vertices.length; i++){
                for (let j = 0; j < answer2.vertices[0].length; j++){
                    expect(icosahedron.shape.vertices[i][j]).toBe(answer2.vertices[i][j]);
                }
            }
            for (let i = 0; i < answer2.indices.length; i++){
                for (let j = 0; j < answer2.indices[0].length; j++){
                    expect(icosahedron.shape.indices[i][j]).toBe(answer2.indices[i][j]);
                }
            }
            expect(icosahedron.color.r).toBe(1);
            expect(icosahedron.color.g).toBe(1);
            expect(icosahedron.color.b).toBe(1);
        });

        it("should have matrix", () => {
            let cube = new Objecto("cube", "green", false);
            let cubeMatrix = new Matrix();
            cubeMatrix.translate(1, 0.1, 0);
            cubeMatrix.scale(0.5, 0.5, 0.5);
            cubeMatrix.rotate(30, 1, 1, 0);
            cube.matrix = cubeMatrix;
            for (let i = 0; i < cubeMatrix.length; i++){
                for (let j = 0; j < cubeMatrix[0].length; j++){
                    expect(cube.matrix[i][j]).toBe(cubeMatrix[i][j]);
                }
            }
        });

        it("should be able to group with other Objects", () => {
            let pyramid1 = new Objecto("pyramid", "blue", true);
            let pyramid2 = new Objecto("pyramid", "yellow", false);
            expect(pyramid1.child.length).toBe(0);
            pyramid1.child.push(pyramid2);
            expect(pyramid1.child.length).toBe(1);
            expect(pyramid1.child[0]).toBe(pyramid2);
        });
    });

    describe("transformVertices", () => {
        it("should update old vertices with new matrix", () => {
            let cube = new Objecto("cube", "green", false);
            let cubeMatrix = new Matrix();
            cubeMatrix.translate(1, 0.1, 0);
            cubeMatrix.scale(0.5, 0.5, 0.5);
            cubeMatrix.rotate(30, 1, 1, 0);
            cube.matrix = cubeMatrix;
            let answer = [
                [ 0.46650635094610965, 0.033493649053890316, -0.17677669529663684, 1 ],
                [ 0.033493649053890316, 0.46650635094610965, 0.17677669529663684, 0.1 ],
                [ 0.17677669529663684, -0.17677669529663684, 0.43301270189221935, 0 ],
                [ 0, 0, 0, 1 ]
            ];

            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < answer[0].length; j++){
                    expect(cube.matrix.matrixArray[i][j]).toBe(answer[i][j]);
                }
            }

            let answer2 = [ 0.8718819967022087, 0.22811800329779128, -0.3932830462427465,
                0.8383883476483185, -0.23838834764831837, -0.21650635094610968,
                0.8383883476483185, -0.23838834764831837, -0.21650635094610968,
                1.304894698594428, -0.20489469859442808, -0.03972965564947284,
                1.304894698594428, -0.20489469859442808, -0.03972965564947284,
                0.8718819967022087, 0.22811800329779128, -0.3932830462427465,
                0.8718819967022087, 0.22811800329779128, -0.3932830462427465,
                1.3383883476483183, 0.2616116523516816, -0.21650635094610968,
                1.3383883476483183, 0.2616116523516816, -0.21650635094610968,
                1.304894698594428, -0.20489469859442808, -0.03972965564947284,
                1.304894698594428, -0.20489469859442808, -0.03972965564947284,
                0.8718819967022087, 0.22811800329779128, -0.3932830462427465,
                1.3383883476483183, 0.2616116523516816, -0.21650635094610968,
                1.304894698594428, -0.20489469859442808, -0.03972965564947284,
                1.304894698594428, -0.20489469859442808, -0.03972965564947284,
                1.1281180032977913, -0.028118003297791266, 0.3932830462427465,
                1.1281180032977913, -0.028118003297791266, 0.3932830462427465,
                1.3383883476483183, 0.2616116523516816, -0.21650635094610968,
                1.1281180032977913, -0.028118003297791266, 0.3932830462427465,
                1.1616116523516815, 0.43838834764831835, 0.21650635094610968,
            ];
            cube.transformVertices(cubeMatrix);
            for (let i = 0; i < answer2.length; i++){
                expect(cube.vertices[i]).toBe(answer2[i]);
            }
        });
    });
});
