/**
 * main container for all game-related data.
 * everything starts empty or null and gets filled
 * after csvs and images load during setup.
 */
const GameData = {
  /**
   * raw csv tables loaded during preload().
   * they all start as null because loading is async
   * and we only fill them once p5 finishes reading the files.
   *
   * keeping them grouped here avoids a mess of globals.
   *
   * @property {?Object} people
   * @property {?Object} activities
   * @property {?Object} jobs
   * @property {?Object} education
   * @property {?Object} homes
   * @property {?Object} healthcare
   * @property {?Object} events
   */
  tables: {
    people: null,
    activities: null,
    jobs: null,
    education: null,
    homes: null,
    healthcare: null,
    events: null
  },

  /**
   * cleaned-up lists made from the tables above.
   * these are simpler arrays the game actually uses
   * instead of referencing the full csv objects all the time.
   *
   * they all start empty and get filled once csv data is ready.
   *
   * @property {string[]} actList
   * @property {string[]} jobList
   * @property {string[]} eduList
   * @property {string[]} homeList
   * @property {string[]} healthcareList
   * @property {string[]} lastNames
   * @property {string[]} mNames
   * @property {string[]} fNames
   * @property {string[]} relationShips
   * @property {string[]} eventList
   */
  lists: {
    actList: [],
    jobList: [],
    eduList: [],
    homeList: [],
    healthcareList: [],

    lastNames: [],
    mNames: [],    // male names
    fNames: [],    // female names
    relationShips: [],
    eventList: []
  },

  /**
   * icons used throughout the ui.
   * stored here so they're easy to cache and reuse.
   * starts empty until preload() loads the actual images.
   *
   * @type {p5.Image[]}
   */
  iconImgs: []
};
