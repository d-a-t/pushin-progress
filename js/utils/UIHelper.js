const UIHelper = {
  /**
   * checks if the mouse is inside a rectangle
   * @param {number} mx - mouse x pos
   * @param {number} my - mouse y pos
   * @param {number} x - rect x
   * @param {number} y - rect y
   * @param {number} w - rect width
   * @param {number} h - rect height
   * @returns {boolean} true if inside, false if not
   */
  inside(mx, my, x, y, w, h) {
    return mx > x && mx < x + w && my > y && my < y + h;
  },

  /**
   * checks if the mouse was clicked this frame (not held down)
   * @returns {boolean} true if the mouse was just clicked
   */
  mouseJustClicked() {
    return mouseIsPressed && !GameState.mouseWasPressedLastFrame;
  }
};
