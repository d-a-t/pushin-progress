/**
 * kinda just a bunch of small helper functions
 * to make different game entities without repeating code.
 * nothing fancy, just bundles a bunch of props together
 * into an object so everything stays consistent.
 */
const EntityFactory = {
  /**
   * makes a person object. this is like the base npc/relationship thing.
   * @param {number} age - how old they are
   * @param {number} money - how much cash they got
   * @param {number} health - general physical health
   * @param {number} intelligence - brain power stat
   * @param {number} looks - attractiveness stat
   * @param {number} mentalHealth - sanity/happiness stat
   * @param {string} relation - what they are to the player
   * @param {string} name - their name
   * @param {string} status - extra tag like "alive", "friend", whatever
   * @returns {object} the person object
   */
  createPerson(age, money, health, intelligence, looks, mentalHealth, relation, name, status) {
    return { age, money, health, intelligence, looks, mentalHealth, relation, name, status };
  },

  /**
   * makes a home object. used when picking houses/apartments/etc.
   * @param {string} type - like apartment, condo, house, etc
   * @param {string} properties - quick description of features
   * @param {number} cost - how much it costs per turn or upfront
   * @param {number} quality - how nice it is
   * @param {boolean} owned - if the player owns it or not
   * @returns {object} the home object
   */
  createHome(type, properties, cost, quality, owned) {
    return { type, properties, cost, quality, owned };
  },

  /**
   * makes an activity thing. basically something the player can join/do.
   * @param {string} name - title of the activity
   * @param {string} type - category of activity
   * @returns {object}
   */
  createActivity(name, type) {
    return { name, type };
  },

  /**
   * makes an education entry. these are the study options.
   * @param {string} name - class or program name
   * @param {number} difficulty - how hard it is
   * @param {string} type - subject category
   * @returns {object}
   */
  createEducation(name, difficulty, type) {
    return { name, difficulty, type };
  },

  /**
   * job maker. used when listing job options.
   * @param {string} name - job title
   * @param {number} difficulty - skill needed
   * @param {string} type - job field/category
   * @param {number} pay - how much the job pays
   * @returns {object}
   */
  createJob(name, difficulty, type, pay) {
    return { name, difficulty, type, pay };
  },

  /**
   * makes a healthcare option. basically a buyable health boost.
   * @param {string} name - treatment name
   * @param {number} cost - how expensive it is
   * @param {number} healthBoost - how much health it restores
   * @returns {object}
   */
  createHealthcare(name, cost, healthBoost) {
    return { name, cost, healthBoost };
  },

  /**
   * makes an event. these are the random or story-trigger events.
   * there's a lot of params cuz events can do a bunch of stuff.
   * @param {string} event - name of the event
   * @param {string} good - good outcome text
   * @param {string} evil - bad outcome text
   * @param {string} neutral - neutral outcome text
   * @param {number} impact - how strong the event is
   * @param {number} self_impact - how much it hits player stats directly
   * @param {string} stat - stat the event affects
   * @param {string} good1 - extra good outcome detail
   * @param {string} good2 - second extra good outcome detail
   * @param {string} evil1 - extra bad outcome detail
   * @param {string} skill - skill needed or rewarded
   * @returns {object}
   */
  createEvent(event, good, evil, neutral, impact, self_impact, stat, good1, good2, evil1, skill) {
    return { event, good, evil, neutral, impact, self_impact, stat, good1, good2, evil1, skill };
  }
};
