describe("Matrix implementation", () => {
    let Matrix = window.Matrix;
    let matrix = new Matrix();

    let ma1 = [
        [5, 2, 6, 1],
        [0, 6, 2, 0],
        [3, 8, 1, 4],
        [1, 8, 5, 6]
    ];

    let ma2 = [
        [7, 5, 8, 0],
        [1, 8, 2, 6],
        [9, 4, 3, 8],
        [5, 3, 7, 9]
    ];

    let ma3 = [
        [7],
        [5],
        [8],
        [0]
    ];

    let m1 = new Matrix(ma1);
    let m2 = new Matrix(ma2);
    let m3 = new Matrix(ma3);

    describe("initialization", () => {
        it("should initialize with identity matrix", () => {
            let identityMatrix = new Matrix([
              [ 1, 0, 0, 0 ],
              [ 0, 1, 0, 0 ],
              [ 0, 0, 1, 0 ],
              [ 0, 0, 0, 1 ]
            ]);

            for (let i = 0; i < matrix.length; i++){
                for (let j = 0; j < matrix[0].length; j++){
                    expect(matrix[i][j]).toBe(identityMatrix[i][j]);
                }
            }
        });

        it("should initialize with given matrix", () => {
            let m1 = new Matrix([
                [5, 2, 6, 1],
                [0, 6, 2, 0],
                [3, 8, 1, 4],
                [1, 8, 5, 6]
            ]);

            let answer = [
                [5, 2, 6, 1],
                [0, 6, 2, 0],
                [3, 8, 1, 4],
                [1, 8, 5, 6]
            ];

            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < answer[0].length; j++){
                    expect(answer[i][j]).toBe(m1.matrixArray[i][j]);
                }
            }
        });
    });

    describe("multiplication", () => {
        it("should perform translate multiplication", () => {
            let translateMatrix = new Matrix();
            translateMatrix.translate(1, 0.4, 0.5);
            let answer = [
                [1, 0, 0, 1],
                [0, 1, 0, 0.4],
                [0, 0, 1, 0.5],
                [0, 0, 0, 1]
            ];
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < answer[0].length; j++){
                    expect(answer[i][j]).toBe(translateMatrix.matrixArray[i][j]);
                }
            }
        });

        it("should perform scale multiplication", () => {
            let scaleMatrix = new Matrix();
            scaleMatrix.scale(0.5, 0.5, 0.5);
            let answer = [
                [0.5, 0, 0, 0],
                [0, 0.5, 0, 0],
                [0, 0, 0.5, 0],
                [0, 0, 0, 1]
            ];
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < answer[0].length; j++){
                    expect(answer[i][j]).toBe(scaleMatrix.matrixArray[i][j]);
                }
            }
        });

        it("should perform rotate multiplication", () => {
            let rotateMatrix = new Matrix();
            rotateMatrix.rotate(30, 1, 1, 0);
            let answer = [
                [0.933, 0.067, -0.354, 0],
                [0.067, 0.933, 0.354, 0],
                [0.354, -0.354, 0.866, 0],
                [0, 0, 0, 1]
            ];
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < answer[0].length; j++){
                    expect(parseFloat(answer[i][j]).toFixed(3)).toBe(parseFloat(rotateMatrix.matrixArray[i][j]).toFixed(3));
                }
            }
        });

        it("should perform T x S x R matrix multiplication", () => {
            let translateMatrix = new Matrix();
            translateMatrix.translate(0.3, 1.2, -0.1);
            let answer1 = [
                [1, 0, 0, 0.3],
                [0, 1, 0, 1.2],
                [0, 0, 1, -0.1],
                [0, 0, 0, 1]
            ];
            for (let i = 0; i < answer1.length; i++){
                for (let j = 0; j < answer1[0].length; j++){
                    expect(answer1[i][j]).toBe(translateMatrix.matrixArray[i][j]);
                }
            }

            translateMatrix.scale(0.5, 0.3, 1.2);
            let answer2 = [
                [0.5, 0, 0, 0.3],
                [0, 0.3, 0, 1.2],
                [0, 0, 1.2, -0.1],
                [0, 0, 0, 1]
            ];
            for (let i = 0; i < answer2.length; i++){
                for (let j = 0; j < answer2[0].length; j++){
                    expect(answer2[i][j]).toBe(translateMatrix.matrixArray[i][j]);
                }
            }

            translateMatrix.rotate(30, 1, 1, 0);
            let answer3 = [
                [0.467, 0.033, -0.177, 0.3],
                [0.02, 0.280, 0.106, 1.2],
                [0.424, -0.424, 1.039, -0.1],
                [0, 0, 0, 1]
            ];
            for (let i = 0; i < answer3.length; i++){
                for (let j = 0; j < answer3[0].length; j++){
                    expect(parseFloat(answer3[i][j]).toFixed(3)).toBe(parseFloat(translateMatrix.matrixArray[i][j]).toFixed(3));
                }
            }
        });

        it("should perform 4x4 times 4x4 multiplication", () => {
            let answer = [
                [5, 2, 6, 1],
                [0, 6, 2, 0],
                [3, 8, 1, 4],
                [1, 8, 5, 6]
            ];
            let product = matrix.multiply(m1);
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < answer[0].length; j++){
                    expect(answer[i][j]).toBe(product[i][j]);
                }
            }

            let answer2 = [
                [96, 68, 69, 69],
                [24, 56, 18, 52],
                [58, 95, 71, 92],
                [90, 107, 81, 142]
            ];
            let product2 = m1.multiply(m2);
            for (let i = 0; i < answer2.length; i++){
                for (let j = 0; j < answer2[0].length; j++){
                    expect(answer2[i][j]).toBe(product2[i][j]);
                }
            }
        });

        it("should perform 4x4 times 1x4 multiplication", () => {
            let answer = [
                [93],
                [46],
                [69],
                [87]
            ];
            let product = m1.multiply(m3);
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < answer[0].length; j++){
                    expect(answer[i][j]).toBe(product[i][j]);
                }
            }
        });
    });

    describe("reconstructor matrix to be in single array", () => {
        it("should turn double array in to single array in column major order", () => {
            let answer1 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            let array1 = matrix.getRawArray();
            for (let i = 0; i < answer1.length; i++){
                expect(array1[i]).toBe(answer1[i]);
            }

            let answer2 = [5, 2, 6, 1, 0, 6, 2, 0, 3, 8, 1, 4, 1, 8, 5, 6];
            let array2 = m1.getRawArray();
            for (let i = 0; i < answer2.length; i++){
                expect(array2[i]).toBe(answer2[i]);
            }

            let answer3 = [7, 5, 8, 0, 1, 8, 2, 6, 9, 4, 3, 8, 5, 3, 7, 9];
            let array3 = m2.getRawArray();
            for (let i = 0; i < answer3.length; i++){
                expect(array3[i]).toBe(answer3[i]);
            }

            let answer4 = [7, 5, 8, 0];
            let array4 = m3.getRawArray();
            for (let i = 0; i < answer4.length; i++){
                expect(array4[i]).toBe(answer4[i]);
            }

        });
    });

});
