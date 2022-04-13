Hooks.once("init", function() {
	CONFIG.supportedLanguages["pl"] = "pl";
});
Hooks.on("renderCompendiumDirectory", async () => {
    if (game.packs.get("wfrp4e.basic")) {
        game.packs.delete("wfrp4e.basic")
        ui.sidebar.element.find("[data-pack='wfrp4e.basic']").remove()
    }
});