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

  // If setting is off, don’t do anything
  if (!allowPlayers) return;

  // If user is a GM, nothing changes
  if (game.user.isGM) return;

  // Find the current combatant's turn controls
  html.find(".combatant").each((i, li) => {
    const combatantId = li.dataset.combatantId;
    const combatant = game.combat.combatants.get(combatantId);

    // Only affect the player's own combatant
    if (!combatant?.isOwner) return;

    // Find "End Turn" button
    const endTurnBtn = li.querySelector(".combatant-control[data-control='nextTurn']");
    if (endTurnBtn) {
      endTurnBtn.style.display = "inline-block"; // Ensure visible
    }
  });
});
