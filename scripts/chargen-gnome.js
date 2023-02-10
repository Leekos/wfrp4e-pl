Hooks.on("setup", () => {
  let WFRP4E = game.wfrp4e.config;
  WFRP4E.species["gnome"] = "Gnom";

  WFRP4E.speciesCharacteristics["gnome"] = {
    ws: "2d10+20",
    bs: "2d10+10",
    s: "2d10+10",
    t: "2d10+15",
    i: "2d10+30",
    ag: "2d10+30",
    dex: "2d10+30",
    int: "2d10+30",
    wp: "2d10+40",
    fel: "2d10+15",
  };

  WFRP4E.speciesSkills["gnome"] = [
    "Splatanie Magii (Ulgu)",
    "Charyzma",
    "Mocna Głowa",
    "Unik",
    "Występy ()",
    "Plotkowanie",
    "Język (Ghassally)",
    "Język (Magiczny)",
    "Język (Jałowej Krainy)",
    "Sztuka Przetrwania",
    "Skradanie ()",
  ];

  WFRP4E.speciesTalents["gnome"] = [
    "Niegodny Uwagi, Suffused with Ulgu",
    "Szczęście, Naśladowca",
    "Widzenie w Ciemnościach",
    "Rybak, Czytanie/Pisanie",
    "Percepcja Magiczna, Szósty Zmysł",
    "Mały",
    0,
  ];

  WFRP4E.speciesFate["gnome"] = 2;

  WFRP4E.speciesRes["gnome"] = 0;

  WFRP4E.speciesExtra["gnome"] = 2;

  WFRP4E.speciesMovement["gnome"] = 3;

  WFRP4E.speciesAge.gnome = "20+10d10";

  WFRP4E.speciesHeight.gnome = {
    feet: 3,
    inches: 4,
    die: "1d10",
  };
});

Hooks.on("setup", () => {
  // @@@@@@@@@@ GNOME NAMES @@@@@@@@@@@@@
  fetch("modules/wfrp4e-rnhd/names/gnome_male_forenames.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_male_forenames = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_male_forenames.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_surname_clothes_male.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_surname_clothes_male = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_surname_clothes_male.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_female_forenames.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_female_forenames = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_female_forenames.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_surname_clothes_female.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_surname_clothes_female = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_surname_clothes_female.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_prefix_surname_body.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_prefix_surname_body = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_prefix_surname_body.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_prefix_surname_clothes.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_prefix_surname_clothes = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_prefix_surname_clothes.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_prefix_surname_element.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_prefix_surname_element = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_prefix_surname_element.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_surname_body.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_surname_body = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_surname_body.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_surname_element.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_surname_element = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_surname_element.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_prefix_surname_eye.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_prefix_surname_eye = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_prefix_surname_eye.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });
  fetch("modules/wfrp4e-rnhd/names/gnome_clan.txt")
    .then((r) => r.text())
    .then(async (nameText) => {
      game.wfrp4e.names.gnome_clan = [];
      nameText.split("\n").forEach((nameGroup) =>
        game.wfrp4e.names.gnome_clan.push(
          nameGroup.split(",").map(function (item) {
            return item.trim();
          })
        )
      );
    });

  game.wfrp4e.names.gnome = {
    forename(gender = "male") {
      return game.wfrp4e.names.RollArray(`gnome_${gender}_forenames`);
    },
    surname(gender = "male") {
      let result = Math.floor(Math.random * 75 + 1);
      let nameGen = game.wfrp4e.names;
      if (result < 34)
        return `${nameGen.RollArray(
          `gnome_prefix_surname_clothes`
        )}${nameGen.RollArray(
          `gnome_surname_clothes_${gender}`
        )} (${nameGen.RollArray(`gnome_clan`)})`;
      else if (result < 72)
        return `${nameGen.RollArray(
          `gnome_prefix_surname_body`
        )}${nameGen.RollArray(`gnome_surname_body`)} (${nameGen.RollArray(
          `gnome_clan`
        )})`;
      else if (result < 75)
        return `${nameGen.RollArray(
          `gnome_prefix_surname_element`
        )}${nameGen.RollArray(`gnome_surname_element`)} (${nameGen.RollArray(
          `gnome_clan`
        )})`;
      else
        return `${nameGen.RollArray(
          `gnome_prefix_surname_eye`
        )}eye (${nameGen.RollArray(`gnome_clan`)})`;
    },
  };
});
