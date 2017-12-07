/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing using a pixel's "neighborhood."
 */
window.NanoshopNeighborhood = {

    /*
     * A basic "darkener"---this one does not even use the entire pixel neighborhood;
     * just the exact current pixel like the original Nanoshop.
     */
    darkener: (x, y, rgbaNeighborhood) =>
        [
            rgbaNeighborhood[4].r / 2,
            rgbaNeighborhood[4].g / 2,
            rgbaNeighborhood[4].b / 2,
            rgbaNeighborhood[4].a
        ],

    rgbShifter: (x, y, rgbaNeighborhood) => {
        return [rgbaNeighborhood[0].r, rgbaNeighborhood[3].g, rgbaNeighborhood[6].b, rgbaNeighborhood[4].a];
    },

    purpleBlur: (x, y, rgbaNeighborhood) => {
        let pTotal = 0;

        for (let i = 0; i < 9; i += 1) {
            pTotal += rgbaNeighborhood[i].r + rgbaNeighborhood[i].b;
        }

        return [pTotal / 18, 0, pTotal / 18, rgbaNeighborhood[4].a];
    },

    divideBlur: (x, y, rgbaNeighborhood) => {
        let width = 800, height = 750;
        let rTotal = 0;
        let gTotal = 0;
        let bTotal = 0;
        let yTotal = 0;

        if (x < width / 2 && y < height / 2) {
            for (let i = 0; i < 9; i += 1) {
                rTotal += rgbaNeighborhood[i].r;
            }
        } else if (x < width / 2 && y > height / 2) {
            for (let i = 0; i < 9; i += 1) {
                gTotal += rgbaNeighborhood[i].g;
            }
        } else if (x > width / 2 && y < height / 2) {
            for (let i = 0; i < 9; i += 1) {
                bTotal += rgbaNeighborhood[i].b;
            }
        } else if (x > width / 2 && y > height / 2) {
            for (let i = 0; i < 9; i += 1) {
                yTotal += (rgbaNeighborhood[i].r + rgbaNeighborhood[i].g);
            }
            return [yTotal / 18, yTotal / 18, 0, rgbaNeighborhood[4].a];
        }
        return [rTotal / 9, gTotal / 9, bTotal / 9, rgbaNeighborhood[4].a];
    },

    /*
     * A basic "averager"---this one returns the average of all the pixels in the
     * given neighborhood.
     */
    averager: (x, y, rgbaNeighborhood) => {
        let rTotal = 0;
        let gTotal = 0;
        let bTotal = 0;
        let aTotal = 0;

        for (let i = 0; i < 9; i += 1) {
            rTotal += rgbaNeighborhood[i].r;
            gTotal += rgbaNeighborhood[i].g;
            bTotal += rgbaNeighborhood[i].b;
            aTotal += rgbaNeighborhood[i].a;
        }

        return [ rTotal / 9, gTotal / 9, bTotal / 9, aTotal / 9 ];
    },

    /*
     * This is a rudimentary edge dector---another filter that would not be possible
     * without knowing about the other pixels in our neighborhood.
     */
    basicEdgeDetector: (x, y, rgbaNeighborhood) => {
        let neighborTotal = 0;
        for (let i = 0; i < 9; i += 1) {
            if (i !== 4) {
                neighborTotal += (rgbaNeighborhood[i].r + rgbaNeighborhood[i].g + rgbaNeighborhood[i].b);
            }
        }

        let myAverage = (rgbaNeighborhood[4].r + rgbaNeighborhood[4].g + rgbaNeighborhood[4].b) / 3;
        let neighborAverage = neighborTotal / 3 / 8; // Three components, eight neighbors.

        return myAverage < neighborAverage ? [ 0, 0, 0, rgbaNeighborhood[4].a ] :
                [ 255, 255, 255, rgbaNeighborhood[4].a ];
    },

    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function ({r, g, b, a}[9]) that returns another
     * color as a 4-element array representing the new RGBA value
     * that should go in the center pixel.
     */
    applyFilter: (renderingContext, imageData, filter) => {
        // For every pixel, replace with something determined by the filter.
        let result = renderingContext.createImageData(imageData.width, imageData.height);
        let rowWidth = imageData.width * 4;
        let sourceArray = imageData.data;
        let destinationArray = result.data;

        // A convenience function for creating an rgba object.
        let rgba = startIndex => ({
            r: sourceArray[startIndex],
            g: sourceArray[startIndex + 1],
            b: sourceArray[startIndex + 2],
            a: sourceArray[startIndex + 3]
        });

        for (let i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            // The 9-color array that we build must factor in image boundaries.
            // If a particular location is out of range, the color supplied is that
            // of the extant pixel that is adjacent to it.
            let iAbove = i - rowWidth;
            let iBelow = i + rowWidth;
            let pixelColumn = i % rowWidth;
            let firstRow = sourceArray[iAbove] === undefined;
            let lastRow = sourceArray[iBelow] === undefined;

            let pixelIndex = i / 4;
            let pixel = filter(pixelIndex % imageData.width, Math.floor(pixelIndex / imageData.height),
                [
                    // The row of pixels above the current one.
                    firstRow ?
                        (pixelColumn ? rgba(i - 4) : rgba(i)) :
                        (pixelColumn ? rgba(iAbove - 4) : rgba(iAbove)),

                    firstRow ? rgba(i) : rgba(iAbove),

                    firstRow ?
                        ((pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i)) :
                        ((pixelColumn < rowWidth - 4) ? rgba(iAbove + 4) : rgba(iAbove)),

                    // The current row of pixels.
                    pixelColumn ? rgba(i - 4) : rgba(i),

                    // The center pixel: the filter's returned color goes here
                    // (based on the loop, we are at least sure to have this).
                    rgba(i),

                    (pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i),

                    // The row of pixels below the current one.
                    lastRow ?
                        (pixelColumn ? rgba(i - 4) : rgba(i)) :
                        (pixelColumn ? rgba(iBelow - 4) : rgba(iBelow)),

                    lastRow ? rgba(i) : rgba(iBelow),

                    lastRow ?
                        ((pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i)) :
                        ((pixelColumn < rowWidth - 4) ? rgba(iBelow + 4) : rgba(iBelow))
                ]
            );

            // Apply the color that is returned by the filter.
            for (let j = 0; j < 4; j += 1) {
                destinationArray[i + j] = pixel[j];
            }
        }

        return result;
    }
};
