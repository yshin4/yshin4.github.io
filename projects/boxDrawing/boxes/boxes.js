(($) => {
    /**
     * Constant for the left mouse button.
     */
    const LEFT_BUTTON = 1;

    /**
     * Utility function for disabling certain behaviors when the drawing
     * area is in certain states.
     */
    let setupDragState = () => $(".drawing-area .box").unbind("mousemove").unbind("mouseleave");

    /**
     * Indicates that an element is highlighted.
     */
    let highlight = (event) => $(event.currentTarget).addClass("box-highlight");

    /**
     * Indicates that an element is unhighlighted.
     */
    let unhighlight = (event) => $(event.currentTarget).removeClass("box-highlight");

    /**
     * Begins a box draw sequence.
     */
    let startDraw = function (event) {
        // We only respond to the left mouse button.
        if (event.which === LEFT_BUTTON) {
            // Add a new box to the drawing area. Note how we use
            // the drawing area as a holder of "local" variables
            // ("this" as bound by jQuery---which is also why we don't
            // use arrow function notation here).
            this.anchorX = event.pageX;
            this.anchorY = event.pageY;
            this.drawingBox = $("<div></div>")
                .appendTo(this)
                .addClass("box")
                .offset({ left: this.anchorX, top: this.anchorY });

            // Take away the highlight behavior while the draw is
            // happening.
            setupDragState();
        }
    };

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    let trackDrag = function (event) {
        // Don't bother if we aren't tracking anything.
        if (this.drawingBox) {
            // Calculate the new box location and dimensions.  Note how
            // this might require a "corner switch."
            let newOffset = {
                left: (this.anchorX < event.pageX) ? this.anchorX : event.pageX,
                top: (this.anchorY < event.pageY) ? this.anchorY : event.pageY
            };

            this.drawingBox
                .offset(newOffset)
                .width(Math.abs(event.pageX - this.anchorX))
                .height(Math.abs(event.pageY - this.anchorY));
        } else if (this.movingBox) {
            // Reposition the object.
            this.movingBox.offset({
                left: event.pageX - this.deltaX,
                top: event.pageY - this.deltaY
            });
        }
    };

    /**
     * Begins a box move sequence.
     */
    let startMove = function (event) {
        // We only move using the left mouse button.
        if (event.which === LEFT_BUTTON) {
            // Take note of the box's current (global) location.
            let jThis = $(this);
            let startOffset = jThis.offset();

            // Grab the drawing area (this element's parent).
            // We want the actual element, and not the jQuery wrapper
            // that usually comes with it.
            let parent = jThis.parent().get(0);

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            parent.movingBox = jThis;
            parent.deltaX = event.pageX - startOffset.left;
            parent.deltaY = event.pageY - startOffset.top;

            // Take away the highlight behavior while the move is
            // happening.
            setupDragState();

            // Eat up the event so that the drawing area does not
            // deal with it.
            event.stopPropagation();
        }
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    let endDrag = function (event) {
        if (this.drawingBox) {
            // Finalize things by setting the box's behavior.
            this.drawingBox
                .mousemove(highlight)
                .mouseleave(unhighlight)
                .mousedown(startMove);

            // All done.
            this.drawingBox = null;
        } else if (this.movingBox) {
            // Change state to "not-moving-anything" by clearing out
            // this.movingBox.
            this.movingBox = null;
        }

        // In either case, restore the highlight behavior that was
        // temporarily removed while the drag was happening.
        $(".drawing-area .box")
            .removeClass("box-highlight")
            .mousemove(highlight)
            .mouseleave(unhighlight);
    };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    let setDrawingArea = (jQueryElements) => {
        jQueryElements
            .addClass("drawing-area")
            .mousedown(startDraw)
            .mousemove(trackDrag)

            // We conclude drawing on either a mouseup or a mouseleave.
            .mouseup(endDrag)
            .mouseleave(endDrag);
    };

    // No arrow function here because we don't want lexical scoping.
    $.fn.boxes = function () {
        setDrawingArea(this);
        return this;
    };
})(jQuery);
