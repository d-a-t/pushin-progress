const Renderer = {
  /**
   * draws the whole background behind everything
   */
  drawBackground() {
    background("#121212");

    // pick emoji based on age
    let emoji;
    let emojiSize = 345; // default size
    if (PlayerState.age < 5) {
      emoji = "👶"; // baby
      emojiSize = 200;
    } else if (PlayerState.age < 13) {
      emoji = "🧒"; // child
      emojiSize = 200;
    } else if (PlayerState.age < 20) {
      emoji = PlayerState.gender == "Male" ? "🧑" : "👩"; // teen
      emojiSize = 200;
    } else if (PlayerState.age < 40) {
      emoji = PlayerState.gender == "Male" ? "🧍" : "🧍‍♀️"; // adult
      emojiSize = 300;
    } else if (PlayerState.age < 60) {
      emoji = PlayerState.gender == "Male" ? "🧔" : "👩"; // middle age
      emojiSize = 200;
    } else {
      emoji = PlayerState.gender == "Male" ? "🧓" : "👵"; // OLD YEE YEE
      emojiSize = 200;
    }

    textSize(emojiSize);
    textAlign(CENTER, CENTER); // center emoji
    text(emoji, width / 2, 240); // 300 is roughly vertical cen
  },

  
  /**
   * draws the top info bar (name, age, job, money, etc)
   */
  drawTopBar() {
    noStroke();
    fill("#1B253A");
    rect(0, 0, width, 84);
    
    fill(255);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(20);
    text(PlayerState.name, 24, 20);
    
    fill("#A2A2A2");
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    textSize(16);
    const occupation = PlayerState.job ? PlayerState.job.name : "Unemployed";
    text(`Age: ${PlayerState.age}, ${occupation}`, 24, 44);
    
    fill(255);
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    textSize(20);
    text("$" + PlayerState.money, width - 24, 20);
    
    fill("#A2A2A2");
    textAlign(RIGHT, TOP);
    textStyle(NORMAL);
    textSize(16);
    text("Bank Balance", width - 24, 44);
  },
  
  /**
   * draws the whole bottom button area
   */
  drawButtons() {
    fill("#104672");
    rect(0, 465 - 113, width, 113);
    this.drawIconButtons();
  },
  
  /**
   * draws the clickable icon buttons (education, jobs, etc)
   */
  drawIconButtons() {
    const btnW = 60;
    const btnH = 60;
    const spacing = 20;
    const labels = [
      "Education(5+)", "Jobs(16+)", "Activities",
      "Relationships", "Homes(18+)", "Healthcare"
    ];

    const agesRequired = [5, 16, 0, 0, 18, 0]; // min age for each button
    const totalWidth = 6 * btnW + 5 * spacing;
    const startX = (width - totalWidth) / 2;
    const y = (465 - 113) + 20;

    textAlign(CENTER, TOP);
    textSize(12);
    fill(255);

    for (let i = 0; i < 6; i++) {
      const x = startX + i * (btnW + spacing);

      let hovered = UIHelper.inside(mouseX, mouseY, x, y, btnW, btnH);
      let clickable = PlayerState.age >= agesRequired[i];

      // button shading
      if (hovered && mouseIsPressed && clickable) fill(150);
      else if (hovered && clickable) fill(180);
      else if (!clickable) fill(100); // greyed out if too young
      else fill(220);

      rect(x, y, btnW, btnH, 10); // button background

      // icon
      image(GameData.iconImgs[i], x, y, btnW, btnH);

      // label
      text(labels[i], x + btnW / 2, y + btnH + 8);

      // save button bounds for UI logic
      UIConfig.buttons[i].x = x;
      UIConfig.buttons[i].y = y;
      UIConfig.buttons[i].w = btnW;
      UIConfig.buttons[i].h = btnH;

      // click handling
      if (hovered && UIHelper.mouseJustClicked()) {
        if (clickable) {
          GameState.menuOn = i;
          GameState.scrollOffset = 0;
        } else {
          print("You are not old enough for " + labels[i]);
        }
      }
    }
  },
  
  /**
   * draws the whole stats section under the buttons
   */
  drawStatsPanel() {
    textAlign(CENTER, TOP);
    textStyle(NORMAL);
    textSize(16);
    fill(255);
    textStyle(BOLD);
    text("📊 Your Stats", width / 2, 480);
    
    textStyle(NORMAL);
    textAlign(CENTER, TOP);
    textSize(14);
    fill(255);
    text("Moves left: " + GameState.moves, width / 2, 500);
    
    const clampVal = (v) => constrain(v, 0, 100);
    const chaosPercent = clampVal((GameState.chaos / 140) * 100);
    
    const stats = [
      { label: "Mental Health", value: clampVal(PlayerState.mentalHealth), icon: "🧠", color: "#00D6A0" },
      { label: "Intelligence", value: clampVal(PlayerState.intelligence), icon: "🧬", color: "#FF9F1C" },
      { label: "Health", value: clampVal(PlayerState.health), icon: "💪", color: "#FF4FBF" },
      { label: "Looks", value: clampVal(PlayerState.looks), icon: "✨", color: "#FBE142" },
      { label: "Chaos", value: chaosPercent, icon: "🔥", color: "#E60000" }
    ];
    
    const firstRowY = 535;
    const rowGap = 47;
    const labelX = 25;
    const barX = 25;
    const barMaxWidth = width - 50;
    const barHeight = 8;
    const percentX = width - 32;
    
    for (let i = 0; i < stats.length; i++) {
      const s = stats[i];
      const y = firstRowY + i * rowGap;
      
      textAlign(LEFT, CENTER);
      textSize(14);
      fill(255);
      text(s.icon + " " + s.label, labelX, y);
      
      textAlign(RIGHT, CENTER);
      fill("#D0D0D0");
      text(Math.round(s.value) + "%", percentX, y);
      
      const barY = y + 15;
      noStroke();
      fill("#24324B");
      rect(barX, barY, barMaxWidth, barHeight, 4);
      
      fill(s.color);
      const w = (barMaxWidth * s.value) / 100;
      rect(barX, barY, w, barHeight, 4);
    }
    
    textAlign(LEFT, CENTER);
    textSize(14);
    fill(255);
    text("Skills: " + PlayerState.skills, 25, 775);
    
    textAlign(CENTER, TOP);
    textSize(13);
    fill("#CCCCCC");
    text("Press Space to Age Up", width / 2, 800);
  }
};
