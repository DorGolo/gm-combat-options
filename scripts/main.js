Hooks.once("init", () => {
  console.log("Player End Turn | Initializing module...");

  // Register GM-only setting
  game.settings.register("player-end-turn", "allowPlayers", {
    name: "Allow players to end their own turns",
    hint: "When enabled, non-GM users can click the End Turn button in combat.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });
});

Hooks.on("renderCombatTracker", (app, html, data) => {
  const allowPlayers = game.settings.get("player-end-turn", "allowPlayers");

  if (allowPlayers) return;

  // If user is GM, don’t touch anything
  if (game.user.isGM) return;

    const endTurnBtns = html.querySelectorAll(".combat-control[data-action='nextTurn']");
    if (endTurnBtns) {

      
      endTurnBtns.forEach(element => {
        element.style.display = "none";
      });
    }

    const previousTurnBtn = html.querySelector(".combat-control[data-action='previousTurn']");
    if (previousTurnBtn) {
      previousTurnBtn.style.display = "none";
    }
});
