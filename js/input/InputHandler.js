/**
 * literally just handles all the input stuff (keys, mouse clicks, wheel, etc.)
 * keeping it separate so the main code isn't a mess.
 */
const InputHandler = {

  /**
   * handles keyboard presses.
   * right now it's super basic - spacebar or 'A' ages you up.
   * @returns {void}
   */
  handleKeyPress() {
    // spacebar (key === ' ') or keyCode === 65 (the letter "A")
    // kinda arbitrary but it works for quick testing
    if (key === ' ' || keyCode === 65) {
      GameLogic.ageUp();
    }
  },
  

  /**
   * deals with clicking on main menu buttons.
   * @returns {void}
   */
  handleMouseClick() {
    // if a prompt is up, don't allow clicking buttons
    if (GameState.currentPrompt !== -1) return;

    // no moves = no clicking menus
    if (GameState.moves <= 0) return;
    
    // loop through menu buttons and pick whichever you clicked
    for (let i = 0; i < UIConfig.buttons.length; i++) {
      const b = UIConfig.buttons[i];

      if (UIHelper.inside(mouseX, mouseY, b.x, b.y, b.w, b.h)) {
        GameState.menuOn = i;
        GameState.scrollOffset = 0; // reset scrolling on new menu
        break;
      }
    }
  },


  /**
   * scroll wheel logic for menu scrolling.
   * @param {WheelEvent} event - the wheel event from p5
   * @returns {void}
   */
  handleMouseWheel(event) {
    // can't scroll if no menu open
    if (GameState.menuOn === -1) return;

    // constant spacing between rows (same as renderer)
    // keeping this consistent is important or scrolling feels weird
    const rowGap = 18;

    const listLength = MenuRenderer.getListLength();
    const contentHeight = listLength * rowGap;

    // visibleHeight comes from menu renderer (clipH)
    // basically the max area you can see at once
    const visibleHeight = UIConfig.scrollbarH;

    // only scroll if there's actually overflow
    if (contentHeight > visibleHeight) {
      GameState.scrollOffset += event.delta;

      // clamp so you can't scroll past ends
      GameState.scrollOffset = constrain(
        GameState.scrollOffset,
        0,
        contentHeight - visibleHeight
      );
    }
  },


  /**
   * handles when mouse is pressed down - specifically for grabbing the scrollbar thumb.
   * @returns {void}
   */
  handleMousePressed() {
    // check if mouse is inside the scrollbar's rectangle
    // kinda simple, doesn't check thumb position but good enough for now
    if (UIHelper.inside(
          mouseX, mouseY,
          UIConfig.scrollbarX, UIConfig.scrollbarY,
          UIConfig.scrollbarW, UIConfig.scrollbarH
        )) {
      GameState.draggingScrollbar = true;
    }
  },


  /**
   * mouse released = stop dragging scrollbar
   * @returns {void}
   */
  handleMouseReleased() {
    GameState.draggingScrollbar = false;
  }
};
