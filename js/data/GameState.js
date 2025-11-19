/**
 * holds all the dynamic values that change while the game runs.
 * basically the "live memory" of the game.
 */
const GameState = {
  /**
   * how many actions the player can take before needing to age up.
   * starts at 3 but changes constantly.
   * @type {number}
   */
  moves: 3,

  /**
   * which menu is currently open.
   * -1 means no menu.
   * @type {number}
   */
  menuOn: -1,

  /**
   * which prompt/event is currently active.
   * -1 means nothing is being shown.
   * @type {number}
   */
  currentPrompt: -1,

  /**
   * text describing the outcome of the last event/action.
   * shown in the ui after choices.
   * @type {string}
   */
  result: "",

  /**
   * "peace" meter for the player's life state.
   * starts high, goes down with negative events.
   * @type {number}
   */
  peace: 100,

  /**
   * "chaos" meter, opposite of peace.
   * used to track instability or negative outcomes.
   * @type {number}
   */
  chaos: 40,

  /**
   * used to avoid detecting a mouse press multiple times
   * in a single frame. super helpful for buttons.
   * @type {boolean}
   */
  mouseWasPressedLastFrame: false,

  /**
   * how far the player has scrolled in the menu.
   * affects menu rendering and scrollbar position.
   * @type {number}
   */
  scrollOffset: 0,

  /**
   * true when the player is dragging the scrollbar handle.
   * false when not dragging.
   * @type {boolean}
   */
  draggingScrollbar: false
};
