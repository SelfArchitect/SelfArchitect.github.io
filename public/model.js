var CharacterModel;
(function (CharacterModel) {
    var characterList = [];
    var nextCharacterID = 1000;
    var Character = (function () {
        function Character(name, level, alignment, race, jobClass, background, choices, str, dex, con, int, wis, cha) {
            nextCharacterID++;
            this.id = nextCharacterID;
            this.name = name;
            this.level = level;
            this.alignment = alignment;
            this.race = race;
            this.jobClass = jobClass;
            this.background = background;
            this.proficiencies = choices;
            this.str = str;
            this.dex = dex;
            this.con = con;
            this.int = int;
            this.wis = wis;
            this.cha = cha;
        }
        ;
        return Character;
    }());
    CharacterModel.Character = Character;
    ;
    function createCharacter(name, level, alignment, race, jobClass, background, choices, str, dex, con, int, wis, cha) {
        var character = new Character(name, level, alignment, race, jobClass, background, choices, str, dex, con, int, wis, cha);
        characterList.push(character);
        return character;
    }
    CharacterModel.createCharacter = createCharacter;
    function getAllCharacters() {
        return characterList;
    }
    CharacterModel.getAllCharacters = getAllCharacters;
    function getCharacter(id) {
        for (var x in characterList)
            if (characterList[x].id === id)
                return characterList[x];
        return null;
    }
    CharacterModel.getCharacter = getCharacter;
    function updateCharacter(id, character) {
        var found = false;
        for (var x in characterList)
            if (characterList[x].id === id) {
                found = true;
                character.id = id;
                characterList[x] = character;
                break;
            }
        return found;
    }
    CharacterModel.updateCharacter = updateCharacter;
    function deleteCharacter(id) {
        var found = false;
        for (var x = 0; x < characterList.length; x++) {
            if (characterList[x].id === id) {
                found = true;
                characterList.splice(x, 1);
            }
        }
        return found;
    }
    CharacterModel.deleteCharacter = deleteCharacter;
    ;
})(CharacterModel || (CharacterModel = {}));
//# sourceMappingURL=model.js.map