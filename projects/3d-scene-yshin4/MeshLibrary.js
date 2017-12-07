(() => {
    let Mesh = window.Mesh;

    let pyramid = () => {
        let vertices = [
            [ 0, 0.5, 0 ],
            [ -0.5, -0.5, 0.5 ],
            [ 0.5, -0.5, 0.5 ],
            [ 0.5, -0.5, -0.5 ],
            [ -0.5, -0.5, -0.5 ]
        ];

        let indices = [
            [ 0, 1, 2 ],
            [ 0, 2, 3 ],
            [ 0, 3, 4 ],
            [ 0, 4, 1 ],
            [ 2, 1, 4 ],
            [ 2, 4, 3 ]
        ];

        return new Mesh(vertices, indices);
    };

    let cube = () => {

        const x = 0.5;
        const y = 0.5;
        const z = 0.5;

        let vertices = [
            [ -x, y, -z ],
            [ -x, -y, -z ],
            [ x, -y, -z ],
            [ x, y, -z ],
            [ -x, y, z ],
            [ -x, -y, z ],
            [ x, -y, z ],
            [ x, y, z ]
        ];

        let indices = [
            [ 0, 1, 2 ],
            [ 0, 3, 2 ],
            [ 3, 2, 6 ],
            [ 6, 7, 3 ],
            [ 7, 6, 5 ],
            [ 5, 4, 7 ],
            [ 5, 4, 1 ],
            [ 1, 0, 4 ],
            [ 4, 0, 3 ],
            [ 3, 7, 4 ],
            [ 1, 5, 6 ],
            [ 6, 2, 1 ]
        ];
        
        return new Mesh(vertices, indices);
    };

    let sphere = (roundness) => {
        roundness = roundness > 1 ? roundness : 1;
        const X = 1;
        const t = (1.0 + Math.sqrt(5.0)) / 2;

        let vertices = [
            [ -X, t, 0 ],
            [ X, t, 0 ],
            [ -X, -t, 0 ],
            [ X, -t, 0 ],

            [ 0, -X, t ],
            [ 0, X, t ],
            [ 0, -X, -t ],
            [ 0, X, -t ],

            [ t, 0, -X ],
            [ t, 0, X ],
            [ -t, 0, -X ],
            [ -t, 0, X ]
        ];

        vertices = vertices.map((v) => {
            let length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            return [v[0] / length, v[1] / length, v[2] / length];
        });

        let indices = [
            [ 0, 11, 5 ],
            [ 0, 5, 1 ],
            [ 0, 1, 7 ],
            [ 0, 7, 10 ],
            [ 0, 10, 11 ],

            [ 1, 5, 9 ],
            [ 5, 11, 4 ],
            [ 11, 10, 2 ],
            [ 10, 7, 6 ],
            [ 7, 1, 8 ],

            [ 3, 9, 4 ],
            [ 3, 4, 2 ],
            [ 3, 2, 6 ],
            [ 3, 6, 8 ],
            [ 3, 8, 9 ],

            [ 4, 9, 5 ],
            [ 2, 4, 11 ],
            [ 6, 2, 10 ],
            [ 8, 6, 7 ],
            [ 9, 8, 1 ]
        ];

        indices = roundSphere(vertices, indices, roundness);
        return new Mesh(vertices, indices);
    };


    let roundSphere = (vertices, indices, roundness) => {
        let newIndices = [];
        let i1 = vertices.length, i2 = i1 + 1, i3 = i2 + 1;
        for (let i = 0; i < roundness; i++) {
            newIndices = [];
            for (let face = 0; face < indices.length; face++){
                let v1 = vertices[indices[face][0]];
                let v2 = vertices[indices[face][1]];
                let v3 = vertices[indices[face][2]];

                let newV1 = getMiddlePoint(v1, v2);
                let newV2 = getMiddlePoint(v2, v3);
                let newV3 = getMiddlePoint(v3, v1);

                vertices.push(newV1);
                vertices.push(newV2);
                vertices.push(newV3);

                newIndices.push([indices[face][0], i1, i3]);
                newIndices.push([indices[face][1], i2, i1]);
                newIndices.push([indices[face][2], i3, i2]);
                newIndices.push([i1, i2, i3]);

                i1 += 3;
                i2 += 3;
                i3 += 3;
            }
            indices = newIndices;
        }
        return newIndices;
    };

    let getMiddlePoint = (v1, v2) => {

        let middle = [
            (v1[0] + v2[0]) / 2.0,
            (v1[1] + v2[1]) / 2.0,
            (v1[2] + v2[2]) / 2.0
        ];

        let length = Math.sqrt(middle[0] * middle[0] + middle[1] * middle[1] + middle[2] * middle[2]);
        middle = [ middle[0] / length, middle[1] / length, middle[2] / length ];

        return middle;
    };

    let crystal = (dull) => {
        dull = dull || 1;
        const scale = 1 / 2;
        const X = 1 * scale;
        const t = (1.0 + Math.sqrt(5.0)) / 2 * scale;

        let vertices = [
            [ -X, t, 0 ],
            [ X, t, 0 ],
            [ -X, -t, 0 ],
            [ X, -t, 0 ],

            [ 0, -X, t ],
            [ 0, X, t ],
            [ 0, -X, -t ],
            [ 0, X, -t ],

            [ t, 0, -X ],
            [ t, 0, X ],
            [ -t, 0, -X ],
            [ -t, 0, X ]
        ];

        let indices = [
            [ 0, 11, 5 ],
            [ 0, 5, 1 ],
            [ 0, 1, 7 ],
            [ 0, 7, 10 ],
            [ 0, 10, 11 ],

            [ 1, 5, 9 ],
            [ 5, 11, 4 ],
            [ 11, 10, 2 ],
            [ 10, 7, 6 ],
            [ 7, 1, 8 ],

            [ 3, 9, 4 ],
            [ 3, 4, 2 ],
            [ 3, 2, 6 ],
            [ 3, 6, 8 ],
            [ 3, 8, 9 ],

            [ 4, 9, 5 ],
            [ 2, 4, 11 ],
            [ 6, 2, 10 ],
            [ 8, 6, 7 ],
            [ 9, 8, 1 ]
        ];

        indices = crystalize(vertices, indices, dull);

        return new Mesh(vertices, indices);
    };

    let crystalize = (vertices, indices, dull) => {
        let newIndices = [];
        let i1 = 12, i2 = 13, i3 = 14;
        for (let i = 0; i < dull; i++) {
            for (let face = 0; face < indices.length; face++){
                let v1 = vertices[indices[face][0]];
                let v2 = vertices[indices[face][1]];
                let v3 = vertices[indices[face][2]];

                let newV1 = getMiddlePoint(v1, v2);
                let newV2 = getMiddlePoint(v2, v3);
                let newV3 = getMiddlePoint(v3, v1);

                vertices.push(newV1);
                vertices.push(newV2);
                vertices.push(newV3);

                newIndices.push([indices[face][0], i1, i3]);
                newIndices.push([indices[face][1], i2, i1]);
                newIndices.push([indices[face][2], i3, i2]);
                newIndices.push([i1, i2, i3]);
            }
            i1 += 3;
            i2 += 3;
            i3 += 3;
        }
        return newIndices;
    };


    let icosahedron = () => {
        // The core icosahedron coordinates.
        const X = 0.525731112119133606;
        const Z = 0.850650808352039932;

        let vertices = [
            [ -X, 0.0, Z ],
            [ X, 0.0, Z ],
            [ -X, 0.0, -Z ],
            [ X, 0.0, -Z ],
            [ 0.0, Z, X ],
            [ 0.0, Z, -X ],
            [ 0.0, -Z, X ],
            [ 0.0, -Z, -X ],
            [ Z, X, 0.0 ],
            [ -Z, X, 0.0 ],
            [ Z, -X, 0.0 ],
            [ -Z, -X, 0.0 ]
        ];

        let indices = [
            [ 1, 4, 0 ],
            [ 4, 9, 0 ],
            [ 4, 5, 9 ],
            [ 8, 5, 4 ],
            [ 1, 8, 4 ],
            [ 1, 10, 8 ],
            [ 10, 3, 8 ],
            [ 8, 3, 5 ],
            [ 3, 2, 5 ],
            [ 3, 7, 2 ],
            [ 3, 10, 7 ],
            [ 10, 6, 7 ],
            [ 6, 11, 7 ],
            [ 6, 0, 11 ],
            [ 6, 1, 0 ],
            [ 10, 1, 6 ],
            [ 11, 0, 9 ],
            [ 2, 11, 9 ],
            [ 5, 2, 9 ],
            [ 11, 2, 7 ]
        ];

        return new Mesh(vertices, indices);
    };

    window.MeshLibrary = {
        crystal,
        pyramid,
        sphere,
        cube,
        icosahedron,
        getMiddlePoint
    };
})();
