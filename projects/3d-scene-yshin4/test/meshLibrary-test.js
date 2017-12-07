describe("MeshLibrary and Mesh implementation", () => {
    let MeshLibrary = window.MeshLibrary;

    describe("shape making function", () => {
        it("should have vertices and indices of a pyramid", () => {
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

            let pyramidMesh = MeshLibrary.pyramid();

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

    describe("helper functions for sphere and crystal", () => {
        it("should get normalized middle point of given vertices", () => {
            let v1 = [ 0, 0.5, 0 ];
            let v2 = [ -0.5, -0.5, 0.5 ];
            let middle = MeshLibrary.getMiddlePoint(v1, v2);
            expect(middle[0]).toBe(-0.7071067811865475);
            expect(middle[1]).toBe(0);
            expect(middle[2]).toBe(0.7071067811865475);
        });
    });
});
