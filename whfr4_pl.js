Hooks.once("init", function() {
	CONFIG.supportedLanguages["pl"] = "pl";
});
Hooks.on("renderCompendiumDirectory", async () => {
    if (game.packs.get("wfrp4e.basic")) {
        game.packs.delete("wfrp4e.basic")
        ui.sidebar.element.find("[data-pack='wfrp4e.basic']").remove()
    }
    if (game.packs.get("wfrp4e-gm-toolkit.db.gm-toolkit-tables")) {
        game.packs.delete("wfrp4e-gm-toolkit.gm-toolkit-tables")
        ui.sidebar.element.find("[data-pack='wfrp4e-gm-toolkit.gm-toolkit-tables']").remove()
    }
});