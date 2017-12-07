(() => {
    class Objecto {

        constructor (s, c, f, r, l, shine){
            let MeshLibrary = window.MeshLibrary;
            let GLSLUtilities = window.GLSLUtilities;
            this.shapeName = s;
            this.canvas = document.getElementById("scene");
            this.gl = GLSLUtilities.getGL(this.canvas);
            this.refine = r || 1;
            let getShape = {
                sphere: MeshLibrary.sphere(this.refine),
                cube: MeshLibrary.cube(),
                pyramid: MeshLibrary.pyramid(),
                icosahedron: MeshLibrary.icosahedron(),
                crystal: MeshLibrary.crystal(this.refine)
            };

            let getColor = {
                red: { r: 10.0, g: 0.0, b: 0.0 },
                blue: { r: 0.0, g: 0.0, b: 1.0 },
                green: { r: 0.0, g: 1.0, b: 0.0 },
                yellow: { r: 3.0, g: 3.0, b: 0.3 },
                cyan: { r: 0.0, g: 1.7, b: 1.8 },
                purple: { r: 0.7, g: 0.0, b: 0.7 },
                white: { r: 10, g: 10, b: 10 },
                black: { r: 0, g: 0, b: 0 },
                grey: { r: 0.8, g: 0.9, b: 0.9 },
                lightPink: { r: 10.0, g: 1.41, b: 1.7},
                pink: { r: 13.0, g: 1, b: 1.7},
                hotPink: { r: 10.0, g: 0.5, b: 0.7}
            };
            this.fill = f;
            this.shape = getShape[s] || new window.Mesh(s.vertices, s.indices);
            this.color = getColor[c] || { r: 1.0, g: 1.0, b: 1.0 };
            this.mode = f ? this.gl.TRIANGLES : this.gl.LINES;
            let shape = this.shape;
            this.vertices = f ? shape.toRawTriangleArray(shape) : shape.toRawLineArray(shape);
            this.normals = s === "sphere" ? shape.toVertexNormalArray(shape) : shape.toNormalArray(shape);
            this.specularColor = l || { r: 1.0, g: 1.0, b: 1.0 };
            this.shininess = shine || 15;
            this.matrix;
            this.child = [];
        }

        transformVertices(matrix){
            let Matrix = window.Matrix;
            let vertexArray = this.shape.vertices;
            for (let i = 0; i < this.shape.vertices.length; i++){
                let v = vertexArray[i];
                let vertexMatrix = new Matrix([
                    [v[0]],
                    [v[1]],
                    [v[2]],
                    [1]
                ]);
                let newMatrix = matrix.multiply(vertexMatrix);
                v[0] = newMatrix[0][0];
                v[1] = newMatrix[1][0];
                v[2] = newMatrix[2][0];
            }
            this.vertices = this.fill ? this.shape.toRawTriangleArray(this.shape) : this.shape.toRawLineArray(this.shape);
            for (let c of this.child){
                let identityMatrix = new Matrix();
                let childMatrix = new Matrix(identityMatrix.multiply(matrix));
                c.transformVertices(childMatrix);
            }
        }
    }

    window.Objecto = Objecto;

})();
