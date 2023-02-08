Hooks.once("init", function() {
	CONFIG.supportedLanguages["pl"] = "pl";

    // Add enable/disable setting for arrow reclamation feature
    game.settings.register("wfrp4e-pl", "alternativeArmour.Enable", {
      name: "wfrp4epl.alternativeArmour.Enable",
      hint: "wfrp4epl.alternativeArmour.EnableHint",
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
      onChange: value => {
        foundry.utils.debouncedReload()
      }
    });

    // Add enable/disable setting for arrow reclamation feature
    game.settings.register("wfrp4e-pl", "arrowReclamation.Enable", {
      name: "wfrp4epl.arrowReclamation.Enable",
      hint: "wfrp4epl.arrowReclamation.EnableHint",
      scope: "world",
      config: true,
      default: false,
      type: Boolean
    });
  
    // Add enable/disable recovery of Arrows
    game.settings.register("wfrp4e-pl", "arrowReclamation.EnableArrows", {
      name: "wfrp4epl.arrowReclamation.EnableArrows",
      hint: "wfrp4epl.arrowReclamation.EnableArrowsHint",
      scope: "world",
      config: true,
      default: true,
      type: Boolean
    });
  
    // Add enable/disable recovery of Bolts
    game.settings.register("wfrp4e-pl", "arrowReclamation.EnableBolts", {
      name: "wfrp4epl.arrowReclamation.EnableBolts",
      hint: "wfrp4epl.arrowReclamation.EnableBoltsHint",
      scope: "world",
      config: true,
      default: false,
      type: Boolean
    });
  
    // Add enable/disable recovery of Bullets
    game.settings.register("wfrp4e-pl", "arrowReclamation.EnableBullets", {
      name: "wfrp4epl.arrowReclamation.EnableBullets",
      hint: "wfrp4epl.arrowReclamation.EnableBulletsHint",
      scope: "world",
      config: true,
      default: true,
      type: Boolean
    });
  
    // Add setting that allows for different rules of arrow reclamation
    game.settings.register("wfrp4e-pl", "arrowReclamation.Rule", {
      name: "wfrp4epl.arrowReclamation.Rule",
      hint: "wfrp4epl.arrowReclamation.RuleHint",
      scope: "world",
      config: true,
      default: "default",
      type: String,
      choices: {
        "default": "wfrp4epl.arrowReclamation.DefaultRule",
        "success": "wfrp4epl.arrowReclamation.SuccessRule",
        "noCrit": "wfrp4epl.arrowReclamation.NoCritRule",
        "successNoCrit": "wfrp4epl.arrowReclamation.SuccessNoCritRule",
        "failure": "wfrp4epl.arrowReclamation.FailureRule",
        "failureNoCrit": "wfrp4epl.arrowReclamation.FailureNoCritRule",
        "percentage": "wfrp4epl.arrowReclamation.PercentageRule",
        "percentageNoCrit": "wfrp4epl.arrowReclamation.PercentageNoCritRule",
      }
    });
  
    // Add Percentage setting for Percentage rules
    game.settings.register("wfrp4e-pl", "arrowReclamation.Percentage", {
      name: "wfrp4epl.arrowReclamation.Percentage",
      hint: "wfrp4epl.arrowReclamation.PercentageHint",
      scope: "world",
      config: true,
      default: 50,
      type: Number
    });

  // Allow and process incoming socket data
  game.socket.on("module.wfrp4e-pl", data => {
    if (game.user.isGM) {
      if (data.type === "arrowToReclaim") {
        let actorId = data.payload.actorId;
        let ammoId = data.payload.ammoId;
        let userId = data.payload.userId

        // retrieve existing data or initialize it
        let ammoReplenish = game.combat.getFlag('wfrp4e-pl', 'ammoReplenish') || {};
        let actorData = ammoReplenish[actorId] || [];
        let ammoData = actorData.find(a => a.id === ammoId);

        // if ammo object doesn't exist, create one
        if (ammoData === undefined) {
          ammoData = {
            "id": ammoId,
            "user": userId,
            "quantity": 0
          };
          actorData.push(ammoData);
        }
        ammoData.quantity += 1;

        // overwrite actor data
        ammoReplenish[actorId] = actorData;

        // set (overwrite) flag with updated data
        game.combat.unsetFlag('wfrp4e-pl', 'ammoReplenish').then(() => {
          game.combat.setFlag('wfrp4e-pl', 'ammoReplenish', ammoReplenish);
        });
      }
    }
  });

  Handlebars.registerHelper('i18nformat', function (stringId, ...arrData) {
      let objData;
      if (typeof arrData[0] === 'object')
          objData = arrData[0];
      else
          objData = { ...arrData };

      return game.i18n.format(stringId, objData);
  });

  $("body").on("click", ".journal-sheet .item-property", ev => {
    game.wfrp4e.utility.postProperty(ev.target.text)
  })
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
    if (!game.settings.get("wfrp4e-pl", "alternativeArmour.Enable")) {
      if (game.packs.get("wfrp4e-pl.armoury")) {
        ui.sidebar.element.find("[data-pack='wfrp4e-pl.armoury']").remove()
      }
    }
});


CONFIG.JournalEntry.noteIcons = {
    "Marker": "systems/wfrp4e/icons/buildings/point_of_interest.png",
    "Wioska 1": "systems/wfrp4e/icons/buildings/village1.png",
    "Wioska 2": "systems/wfrp4e/icons/buildings/village2.png",
    "Wioska 3": "systems/wfrp4e/icons/buildings/village3.png",
    "Imperialne Koszary": "systems/wfrp4e/icons/buildings/empire_barracks.png",
    "Nawiedzony Las": "systems/wfrp4e/icons/buildings/haunted_wood.png",
    "Aptekarz": "systems/wfrp4e/icons/buildings/apothecary.png",
    "Droga": "systems/wfrp4e/icons/buildings/roads.png",
    "Obóz Orków": "systems/wfrp4e/icons/buildings/orc_city.png",
    "Cmentarz": "systems/wfrp4e/icons/buildings/cemetery.png",
    "Krasnoludzkie Piwo": "systems/wfrp4e/icons/buildings/dwarf_beer.png",
    "Bretońskie Miasto 1": "systems/wfrp4e/icons/buildings/bret_city1.png",
    "Bretońskie Miasto 2": "systems/wfrp4e/icons/buildings/bret_city2.png",
    "Bretońskie Miasto 3": "systems/wfrp4e/icons/buildings/bret_city3.png",
    "Imperialne Miasto 1": "systems/wfrp4e/icons/buildings/empire_city1.png",
    "Imperialne Miasto 2": "systems/wfrp4e/icons/buildings/empire_city2.png",
    "Imperialne Miasto 3": "systems/wfrp4e/icons/buildings/empire_city3.png",
    "Kislevickie Miasto 1": "systems/wfrp4e/icons/buildings/kislev_city1.png",
    "Kislevickie Miasto 2": "systems/wfrp4e/icons/buildings/kislev_city2.png",
    "Kislevickie Miasto 3": "systems/wfrp4e/icons/buildings/kislev_city3.png",
    "Wzgórze Zamkowe 1": "systems/wfrp4e/icons/buildings/castle_hill1.png",
    "Wzgórze Zamkowe 2": "systems/wfrp4e/icons/buildings/castle_hill2.png",
    "Wzgórze Zamkowe 3": "systems/wfrp4e/icons/buildings/castle_hill3.png",
    "Wzgórze z Wieżą": "systems/wfrp4e/icons/buildings/tower_hill.png",
    "Nawiedzone Wzgórze": "systems/wfrp4e/icons/buildings/haunted_hill.png",
    "Jedzenie": "systems/wfrp4e/icons/buildings/food.png",
    "Jedzenie 2": "systems/wfrp4e/icons/buildings/food2.png",
    "Dwór": "systems/wfrp4e/icons/buildings/court.png",
    "Jaskinia 1": "systems/wfrp4e/icons/buildings/cave1.png",
    "Jaskinia 2": "systems/wfrp4e/icons/buildings/cave2.png",
    "Jaskinia 3": "systems/wfrp4e/icons/buildings/cave3.png",
    "Miejsce Kultu Bretonii": "systems/wfrp4e/icons/buildings/bretonnia_worship.png",
    "Miejsce Kultu Chaosu": "systems/wfrp4e/icons/buildings/chaos_worship.png",
    "Menhiry": "systems/wfrp4e/icons/buildings/standing_stones.png",
    "Leśne Elfy 1": "systems/wfrp4e/icons/buildings/welves1.png",
    "Leśne Elfy 2": "systems/wfrp4e/icons/buildings/welves2.png",
    "Leśne Elfy 3": "systems/wfrp4e/icons/buildings/welves3.png",
    "Stajnia": "systems/wfrp4e/icons/buildings/stables.png",
    "Krasnoludzka Twierdza 1": "systems/wfrp4e/icons/buildings/dwarf_hold1.png",
    "Krasnoludzka Twierdza 2": "systems/wfrp4e/icons/buildings/dwarf_hold2.png",
    "Krasnoludzka Twierdza 3": "systems/wfrp4e/icons/buildings/dwarf_hold3.png",
    "Farma": "systems/wfrp4e/icons/buildings/farms.png",
    "Kowal": "systems/wfrp4e/icons/buildings/blacksmith.png",
    "Strażnica": "systems/wfrp4e/icons/buildings/guards.png",
    "Magia": "systems/wfrp4e/icons/buildings/magic.png",
    "Metal": "systems/wfrp4e/icons/buildings/metal.png",
    "Góra 1": "systems/wfrp4e/icons/buildings/mountains1.png",
    "Góra 2": "systems/wfrp4e/icons/buildings/mountains2.png",
    "Mury Zamkowe": "systems/wfrp4e/icons/buildings/castle_wall.png",
    "Orki": "systems/wfrp4e/icons/buildings/orcs.png",
    "Portal Chaosu": "systems/wfrp4e/icons/buildings/chaos_portal.png",
    "Zajazd 1": "systems/wfrp4e/icons/buildings/inn1.png",
    "Zajazd 2": "systems/wfrp4e/icons/buildings/inn2.png",
    "Bagno": "systems/wfrp4e/icons/buildings/swamp.png",
    "Zwoje": "systems/wfrp4e/icons/buildings/scroll.png",
    "Port": "systems/wfrp4e/icons/buildings/port.png",
    "Obóz Zwierzoludzi 1": "systems/wfrp4e/icons/buildings/beastmen_camp1.png",
    "Obóz Zwierzoludzi 2": "systems/wfrp4e/icons/buildings/beastmen_camp2.png",
    "Ruiny": "systems/wfrp4e/icons/buildings/ruins.png",
    "Tartak": "systems/wfrp4e/icons/buildings/lumber.png",
    "Sigmar": "systems/wfrp4e/icons/buildings/sigmar_worship.png",
    "Świątynia": "systems/wfrp4e/icons/buildings/temple.png",
    "Płótna": "systems/wfrp4e/icons/buildings/textile.png",
    "Wieża 1": "systems/wfrp4e/icons/buildings/tower1.png",
    "Wieża 2": "systems/wfrp4e/icons/buildings/tower2.png",
    "Wieża Czarownika": "systems/wfrp4e/icons/buildings/wizard_tower.png",
    "Ulric": "systems/wfrp4e/icons/buildings/ulric_worship.png"
};

Hooks.on("setup", () => {
    let config = {
      weaponQualities: {
        slash: game.i18n.localize("PROPERTY.Slash"),
        sturdy: game.i18n.localize("PROPERTY.Sturdy"),
        recoverable: game.i18n.localize("PROPERTY.Recoverable")
      },

      weaponFlaws: {
        frail: game.i18n.localize("PROPERTY.Frail"),
        unrecoverable: game.i18n.localize("PROPERTY.Unrecoverable")
      },

      qualityDescriptions: {
        slash: game.i18n.localize("WFRP4E.Properties.Slash"),
        sturdy: game.i18n.localize("WFRP4E.Properties.Sturdy"),
        recoverable: game.i18n.localize("WFRP4E.Properties.Recoverable")
      },

      flawDescriptions : {
        frail: game.i18n.localize("WFRP4E.Properties.Frail"),
        unrecoverable: game.i18n.localize("WFRP4E.Properties.Unrecoverable"),
      },
    
      propertyHasValue: {
        sturdy: false,
        slash: true,
        recoverable: false,
        frail: false,
        unrecoverable: false
    }
  }

  mergeObject(game.wfrp4e.config, config)
  if (game.settings.get("wfrp4e-pl", "alternativeArmour.Enable")) {
    game.wfrp4e.config.armorTypes = {
      "light": game.i18n.localize("WFRP4E.ArmourType.Light"),
      "medium": game.i18n.localize("WFRP4E.ArmourType.Medium"),
      "heavy": game.i18n.localize("WFRP4E.ArmourType.Heavy"),
      "other": game.i18n.localize("WFRP4E.ArmourType.Other")
    };


    Reflect.defineProperty(ActorWfrp4e.prototype, 'armourPrefillModifiers', { value: 
      function (item, type, options, tooltip = []) {

        let modifier = 0;
        let wearingMedium = 0;
        let wearingHeavy = 0;
    
        for (let a of this.getItemTypes("armour").filter(i => i.isEquipped)) {
          // For each armor, apply its specific penalty value, as well as marking down whether
          // it qualifies for armor type penalties (wearingMail/Plate)
    
          // Skip practical
          if (a.properties.qualities.practical)
            continue;
    
          if (a.armorType.value == "medium")
            wearingMedium += 1;
          if (a.armorType.value == "heavy")
            wearingHeavy += 1;
        }
        wearingMedium = Math.min(wearingMedium, 2);
        wearingHeavy = Math.min(wearingHeavy, 2);
  
        let stealthPenaltyValue = 0;        
        if (wearingMedium)
          stealthPenaltyValue += -10 * wearingMedium;
        if (wearingHeavy)
          stealthPenaltyValue += -10 * wearingHeavy;
  
        if (type == "skill" && item.name.includes(game.i18n.localize("NAME.Stealth"))) {
          if (stealthPenaltyValue) {
            modifier += stealthPenaltyValue
            tooltip.push(`Kara do Skradania ze względu na pancerz ciężki (max -20) lub średni (max -20) - (+${stealthPenaltyValue})`);
          }
        }
        return modifier;
      }
    });


    Reflect.defineProperty(ItemWfrp4e.prototype, '_addAPLayer', { value:
        function (AP) {
          // If the armor protects a certain location, add the AP value of the armor to the AP object's location value
          // Then pass it to addLayer to parse out important information about the armor layer, namely qualities/flaws
          for (let loc in this.currentAP) {
            if (this.currentAP[loc] > 0) {

              AP[loc].value += this.currentAP[loc];

              let layer = {
                value: this.currentAP[loc],
                armourType: this.armorType.value // used for sound
              }

              let properties = this.properties
              layer.impenetrable = !!properties.qualities.impenetrable;
              layer.partial = !!properties.flaws.partial;
              layer.weakpoints = !!properties.flaws.weakpoints;

              if (this.system.special?.value && this.system.special?.value?.indexOf('Metal') !== -1) {
                layer.metal = true;
              }

              AP[loc].layers.push(layer);
            }
          }
        }
      });

      Reflect.defineProperty(ItemWfrp4e.prototype, '_armourExpandData', { value:
        function()  {
          let data = this.toObject().system
          let properties = [];
          properties.push(game.wfrp4e.config.armorTypes[this.armorType.value]);
          let special = data.special?.value?.split(',');
          if (special) {
            for(let i = 0; i < special.length; i++) {
              properties.push(special[i]);
            }
          }
          let itemProperties = this.Qualities.concat(this.Flaws)
          for (let prop of itemProperties)
            properties.push("<a class ='item-property'>" + prop + "</a>")
          properties.push(this.penalty.value);
      
          data.properties = properties.filter(p => !!p);
          return data;
      }
    });
  }
});


Hooks.on("deleteCombat", async function (combat) {
  if (game.user.isGM) {
    let ammoReplenish = combat.getFlag('wfrp4e-pl', 'ammoReplenish');

    for (let actorId in ammoReplenish) {
      if (Array.isArray(ammoReplenish[actorId])) {
        for (let i = 0; i < ammoReplenish[actorId].length; i++) {
          let usedAmmo = ammoReplenish[actorId][i];
          
          let user = usedAmmo.user;          
          let actor = game.actors.find(a => a.id === actorId);
          let ammo = actor.items.get(usedAmmo.id);
      
          ammo.quantity.value += usedAmmo.quantity;
          await ammo.update({ "system.quantity.value": ammo.quantity.value })

          let templateData = {};
          templateData.name = actor.name;
          templateData.img = actor.img;
          templateData.ammo = {};
          templateData.ammo.name = ammo.name;
          templateData.ammo.img = ammo.img;
          templateData.quantity = usedAmmo.quantity;
      
          // Don't post any image for the item (which would leave a large gap) if the default image is used
          if (templateData.img.includes("/unknown.png"))
            templateData.img = null;
          if (templateData.ammo.img.includes("/blank.png"))
            templateData.ammo.img = null;
      
          let html = await renderTemplate('modules/wfrp4e-pl/templates/ammo-recovery.html', templateData)
          let chatData = {
            user: user,
            speaker: {alias: actor.name, actor: actor.id},
            whisper: game.users.filter((u) => u.isGM).map((u) => u.id),
            content: html
          };
          ChatMessage.create(chatData);
        }
      }
    }
  }
});

Hooks.on("wfrp4e:rollWeaponTest", function (roll, cardOptions) {
  // if feature not enabled, do nothing
  if (!game.settings.get("wfrp4e-pl", "arrowReclamation.Enable"))
    return;

  // if there is no ammo, do nothing
  let weapon = roll.weapon;
  if (weapon === undefined || weapon.ammo === undefined || weapon.currentAmmo === undefined || game.combat == null)
    return;

  let ammoId = weapon.currentAmmo.value;
  let actorId = cardOptions.speaker.actor;
  let recovered = false;
  let message = "";
  let percentageTarget = game.settings.get("wfrp4e-pl", "arrowReclamation.Percentage");
  let ammo = weapon.parent.items.get(ammoId);
  let ammoQualities = ammo.properties.qualities;

  let allowArrows = game.settings.get("wfrp4e-pl", "arrowReclamation.EnableArrows");
  let allowBolts = game.settings.get("wfrp4e-pl", "arrowReclamation.EnableBolts");
  let allowBullets = game.settings.get("wfrp4e-pl", "arrowReclamation.EnableBullets");
  let recoverable = ammo.properties.qualities.recoverable !== undefined;
  let unrecoverable = ammo.properties.flaws.unrecoverable !== undefined;
  let allowed = null;
  let type = null;

  if (!unrecoverable) {
    if (weapon.ammunitionGroup.value === 'bow') {
      allowed = allowArrows;
      type = 'Arrow';
    } else if (weapon.ammunitionGroup.value === 'crossbow') {
      allowed = allowBolts;
      type = 'Bolt';
    } else if (weapon.ammunitionGroup.value === 'sling') {
      allowed = allowBullets;
      type = 'Bullet';
    }

    if (!allowed && !recoverable)
      type = null;
  }

  // if type is not recognized or not allowed, do nothing
  if (type == null) {
    return;
  }

  // define chat messages
  type = game.i18n.localize("wfrp4epl." + type);
  let messageFuture = game.i18n.format("wfrp4epl.recoveredFuture", {type});

  // if unbreakable, recover, if not, apply rules
  if (ammoQualities.unbreakable !== undefined) {
    recovered = true;
  } else {
    //recovered = this.isProjectileSaved(roll, percentageTarget, ammo);

    let crit = (roll.result.critical !== undefined || roll.result.fumble !== undefined);
    let even = roll.result.roll % 2 === 0;
    let success = roll.result.roll <= roll.target;
    let sturdy = ammo.properties.qualities.sturdy !== undefined;
    let frail = ammo.properties.flaws.frail !== undefined;
    let formula = "1d100";

    if (sturdy) {
      formula = "2d100kl";
    } else if (frail) {
      formula = "2d100kh";
    }

    let percentage = (new Roll(formula).roll().total <= percentageTarget);
    let sturdyRoll = (new Roll("1d100").roll().total <= percentageTarget);

    switch (game.settings.get("wfrp4e-pl", "arrowReclamation.Rule")) {
      case 'success':
        if (sturdy)
          recovered = even;
        else
          recovered = even && success;
        if (frail && recovered)
          recovered = sturdyRoll;
        break;
      case 'noCrit':
        recovered = even && !crit;
        if (sturdy && !recovered)
          recovered = sturdyRoll;
        if (frail && recovered)
          recovered = sturdyRoll;
        break;
      case 'successNoCrit':
        if (sturdy)
          recovered = even && !crit;
        else
          recovered = even && success && !crit;
        if (frail && recovered)
          recovered = sturdyRoll;
        break;
      case 'failure':
        if (sturdy)
          recovered = even;
        else
          recovered = even && !success;
        if (frail && recovered)
          recovered = sturdyRoll;
        break;
      case 'failureNoCrit':
        if (sturdy)
          recovered = even && !crit;
        else
          recovered = even && !success && !crit;
        if (frail && recovered)
          recovered = sturdyRoll;
        break;
      case 'percentage':
        recovered = percentage;
        break;
      case 'percentageNoCrit':
        recovered = percentage && !crit;
        break;
      case 'default':
      default:
        recovered = even;
        if (sturdy && !recovered)
          recovered = sturdyRoll;
        if (frail && recovered)
          recovered = sturdyRoll;
    }
  }

  if (recovered === true) {
    message = messageFuture;
    if (game.user.isGM) {
      // retrieve existing data or initialize it
      let ammoReplenish = game.combat.getFlag('wfrp4e-pl', 'ammoReplenish') || {};
      let actorData = ammoReplenish[actorId] || [];
      let ammoData = actorData.find(a => a.id === ammoId);

      // if ammo object doesn't exist, create one
      if (ammoData === undefined) {
        ammoData = {
          "id": ammoId,
          "user": game.user.id,
          "quantity": 0
        };
        actorData.push(ammoData);
      }
      ammoData.quantity += 1;

      // overwrite actor data
      ammoReplenish[actorId] = actorData;

      // set (overwrite) flag with updated data
      game.combat.unsetFlag('wfrp4e-pl', 'ammoReplenish').then(() => {
        game.combat.setFlag('wfrp4e-pl', 'ammoReplenish', ammoReplenish);
      });
    } else {
      game.socket.emit("module.wfrp4e-pl", {
        type: "arrowToReclaim",
        payload: {actorId: actorId, ammoId: ammoId, userId: game.user.id}
      })
    }

    if (Array.isArray(roll.result.other)) {
      roll.result.other.push(message)
    } else {
      roll.result.other = [message];
    }
  }
});