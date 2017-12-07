describe("Mesh implementation", () => {
    let Mesh = window.Mesh;

    describe("initialization", () => {
        it("should initialize Mesh with vertices and indices", () => {
            let pyramid = {
                vertices: [
                    [ 0, 0.5, 0 ],
                    [ -0.5, -0.5, 0.5 ],
                    [ 0.5, -0.5, 0.5 ],
                    [ 0.5, -0.5, -0.5 ],
                    [ -0.5, -0.5, -0.5 ]
                ],

                indices: [
                    [ 0, 1, 2 ],
                    [ 0, 2, 3 ],
                    [ 0, 3, 4 ],
                    [ 0, 4, 1 ],
                    [ 2, 1, 4 ],
                    [ 2, 4, 3 ]
                ]
            };

            let pyramidMesh = new Mesh(pyramid.vertices, pyramid.indices);
            for (let i = 0; i < pyramid.vertices.length; i++){
                for (let j = 0; j < pyramid.vertices[0].length; j++){
                    expect(pyramidMesh.vertices[i][j]).toBe(pyramid.vertices[i][j]);
                }
            }
            for (let i = 0; i < pyramid.indices.length; i++){
                for (let j = 0; j < pyramid.indices[0].length; j++){
                    expect(pyramidMesh.indices[i][j]).toBe(pyramid.indices[i][j]);
                }
            }
        });
    });

    describe("converting to raw array", () => {
        it("should convert vertices and indices in to raw line array", () => {
            let testShape = {
                vertices: [
                    [ 0, 0.5, 0 ],
                    [ -0.5, -0.5, 0.5 ]
                ],

                indices: [
                    [ 0, 1, 0 ]
                ]
            };

            let testMesh = new Mesh(testShape.vertices, testShape.indices);
            let testTriangleArray = testMesh.toRawTriangleArray(testMesh);
            let answer = [0, 0.5, 0, -0.5, -0.5, 0.5, 0, 0.5, 0];
            expect(testTriangleArray.length).toBe(9);
            for (let i = 0; i < answer.length; i++){
                expect(testTriangleArray[i]).toBe(answer[i]);
            }

            let testLineArray = testMesh.toRawLineArray(testMesh);
            let answer2 = [0, 0.5, 0, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0, 0.5, 0, 0, 0.5, 0, 0, 0.5, 0];
            expect(testLineArray.length).toBe(18);
            for (let i = 0; i < answer2.length; i++){
                expect(testLineArray[i]).toBe(answer2[i]);
            }
        });
    });
});
