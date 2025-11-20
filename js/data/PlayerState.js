/**
 * stores all the player's personal stats and life situation.
 * this is basically the "character sheet" for the whole game.
 */
const PlayerState = {
  /**
   * player's full name. set during character creation.
   * @type {string}
   */
  name: "",

  /**
   * player's current age. goes up every "age up" step.
   * @type {number}
   */
  age: 0,

  /**
   * "male", "female", or whatever labels you're using.
   * influences name generation and some event outcomes.
   * @type {string}
   */
  gender: "",

  /**
   * how much money the player currently has.
   * jobs and events update this constantly.
   * @type {number}
   */
  money: 0,

  /**
   * overall physical health. can go up/down based on events.
   * @type {number}
   */
  health: 0,

  /**
   * measure of intelligence. can affect job unlocks or outcomes.
   * @type {number}
   */
  intelligence: 0,

  /**
   * appearance rating. used by certain social or event checks.
   * @type {number}
   */
  looks: 0,

  /**
   * mental wellbeing. affected by stress, relationships, etc.
   * @type {number}
   */
  mentalHealth: 0,

  /**
   * list of skills the player has learned.
   * could be strings like "cooking" or "coding".
   * @type {string[]}
   */
  skills: [],

  /**
   * current home the player is living in.
   * null means they haven't picked a home yet.
   * usually an object from GameData.tables.homes.
   * @type {?Object}
   */
  home: null,

  /**
   * current job the player has.
   * null means unemployed.
   * @type {?Object}
   */
  job: null,

  /**
   * spouse or partner object.
   * null if they're not married.
   * @type {?Object}
   */
  spouse: null,

  /**
   * list of child objects.
   * starts empty and fills as life events happen.
   * @type {Object[]}
   */
  children: []
};
