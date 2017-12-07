(() => {

    class Matrix {
        constructor (matrixArray){
            let identityMatrix = [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ];

            this.matrixArray = matrixArray || identityMatrix;
        }

        translate (x, y, z){
            let translationMatrix = [
                [1, 0, 0, x],
                [0, 1, 0, y],
                [0, 0, 1, z],
                [0, 0, 0, 1]
            ];
            translationMatrix = new Matrix(translationMatrix);
            this.matrixArray = this.multiply(translationMatrix);
        }

        scale (x, y, z){
            let scaleMatrix = [
                [x, 0, 0, 0],
                [0, y, 0, 0],
                [0, 0, z, 0],
                [0, 0, 0, 1]
            ];
            scaleMatrix = new Matrix(scaleMatrix);
            this.matrixArray = this.multiply(scaleMatrix);
        }

        rotate (angle, x, y, z){
            let rotationMatrix = this.rotationMatrix(angle, x, y, z);
            rotationMatrix = new Matrix(rotationMatrix);
            this.matrixArray = this.multiply(rotationMatrix);
        }

        rotationMatrix (angle, x, y, z) {
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

            if (isNaN(x) === true){
                x = 0;
            }
            if (isNaN(y) === true){
                y = 0;
            }
            if (isNaN(z) === true){
                z = 0;
            }

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
                [x2 * oneMinusC + c,
                    xy * oneMinusC + zs,
                    xz * oneMinusC - ys,
                    0.0],

                [xy * oneMinusC - zs,
                    y2 * oneMinusC + c,
                    yz * oneMinusC + xs,
                    0.0],

                [xz * oneMinusC + ys,
                    yz * oneMinusC - xs,
                    z2 * oneMinusC + c,
                    0.0],

                [0.0,
                    0.0,
                    0.0,
                    1.0]
            ];
        }


        // print(){
        //     let m1 = this.matrixArray;
        //     for (let m of m1){
        //         console.log(m);
        //     }
        // }

        getRawArray(){
            let m1 = this.matrixArray;
            let newArray = [];
            for (let i in m1){
                newArray = newArray.concat(m1[i]);
            }
            return newArray;
        }

        multiply(m2){
            let m1 = this.matrixArray;
            m2 = m2.matrixArray;
            let m3 = [];
            for (let i = 0; i < m1[0].length; i++){
                m3[i] = [];
                for (let j = 0; j < m2[0].length; j++){
                    m3[i][j] = m1[i][0] * m2[0][j] +
                               m1[i][1] * m2[1][j] +
                               m1[i][2] * m2[2][j] +
                               m1[i][3] * m2[3][j];
                }
            }
            return m3;
        }
  }

    window.Matrix = Matrix;

})();
