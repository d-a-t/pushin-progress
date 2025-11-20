const GameLogic = {
  /**
   * age up the player by 1 year
   * resets moves, applies job/home money effects, triggers events sometimes
   */
  ageUp() {
    // dont age if an event is open or player is dead
    if (GameState.currentPrompt !== -1 || PlayerState.health <= 0) return;
    
    GameState.moves = 3; // reset moves each year
    
    // subtract home rent if player has a home
    if (PlayerState.home != null) {
      PlayerState.money -= PlayerState.home.cost;
    }
    // add job pay if player has a job
    if (PlayerState.job != null) {
      PlayerState.money += PlayerState.job.pay;
    }
    
    PlayerState.age += 1; // get older
    
    // keep skills list shortish, only last 10 skills matter
    if (PlayerState.skills.length > 10) {
      PlayerState.skills.shift();
    }
    
    this.applyAgingEffects(PlayerState); // aging takes toll on stats
    
    // age all living relations
    GameData.lists.relationShips.forEach(person => {
      if (person.status === "alive") {
        if (person.health <= 0) person.status = "dead";
        person.age += 1;
        this.applyAgingEffects(person);
      }
    });
    
    // after age 5, sometimes trigger a random event
    if (PlayerState.age > 5) {
      if (floor(random(0, 2)) == 1) {
        GameState.result = "";
        GameState.currentPrompt = floor(random(0, GameData.lists.eventList.length));
      } else {
        GameState.currentPrompt = -1;
      }
    }
    
    print(PlayerState.skills); // debug: show current skills
  },

  /**
   * apply aging effects to entity (player or relative)
   * older age and low mental health reduces health
   * @param {object} entity 
   */
  applyAgingEffects(entity) {
    if (entity.age > 30) {
      entity.health -= 1; // small hit after 30
      entity.mentalHealth -= 1;
    }
    if (entity.age > 60) {
      entity.health -= 1; // bigger hit after 60
      entity.mentalHealth -= 1;
    }
    if (entity.mentalHealth < 50) {
      entity.health -= 1; // stress kills health
    }
  },

  /**
   * count how many times player has a given skill
   * @param {string} skill
   * @returns {number}
   */
  checkSkills(skill) {
    let count = 0;
    for (let i = 0; i < PlayerState.skills.length; i++) {
      if (PlayerState.skills[i] === skill) count++;
    }
    return count;
  },

  /**
   * adjust global peace and chaos numbers
   * keeps total exactly 140, trims excess recursively
   * @param {number} c - chaos change
   * @param {number} p - peace change
   */
  impactSociety(c, p) {
    // total exactly 140
    if ((GameState.peace + p) + (GameState.chaos + c) == 140) {
      GameState.peace += p;
      GameState.chaos += c;
      GameState.peace = constrain(GameState.peace, 0, 140);
      GameState.chaos = constrain(GameState.chaos, 0, 140);
      print(GameState.peace + GameState.chaos); // debug
    } else if ((GameState.peace + p) + (GameState.chaos + c) > 140) {
      // trim excess
      if (p > 0) this.impactSociety(c, p - 1);
      else if (c > 0) this.impactSociety(c - 1, p);
    } else if ((GameState.peace + p) + (GameState.chaos + c) < 140) {
      // fix negative total
      if (p < 0) this.impactSociety(c, p + 1);
      else if (c < 0) this.impactSociety(c + 1, p);
    }
  }
};
