var Controller;
(function (Controller) {
    var proficiencies = [];
    function proficiencyList() {
        var Background = document.forms["myForm"].Background;
        proficiencies.push(document.forms["myForm"].Acrobatics);
        proficiencies.push(document.forms["myForm"].AnimalHandling);
        proficiencies.push(document.forms["myForm"].Arcana);
        proficiencies.push(document.forms["myForm"].Athletics);
        proficiencies.push(document.forms["myForm"].Deception);
        proficiencies.push(document.forms["myForm"].History);
        proficiencies.push(document.forms["myForm"].Insight);
        proficiencies.push(document.forms["myForm"].Intimidation);
        proficiencies.push(document.forms["myForm"].Investigation);
        proficiencies.push(document.forms["myForm"].Medicine);
        proficiencies.push(document.forms["myForm"].Nature);
        proficiencies.push(document.forms["myForm"].Perception);
        proficiencies.push(document.forms["myForm"].Performance);
        proficiencies.push(document.forms["myForm"].Persuasion);
        proficiencies.push(document.forms["myForm"].Religion);
        proficiencies.push(document.forms["myForm"].SlightofHand);
        proficiencies.push(document.forms["myForm"].Stealth);
        proficiencies.push(document.forms["myForm"].Survival);
    }
    function _validateControls(formIsGood, proficiencies) {
        var form = document.forms["myForm"];
        var alignmentEdit = document.forms["myForm"].alignment;
        var Class = document.forms["myForm"].Class;
        var maxlvl = 20;
        var levelEdit = document.forms["myForm"].level;
        var lvlval = parseFloat(levelEdit.value);
        var numOfPro = 0;
        for (var x in proficiencies) {
            if (proficiencies[x].checked === true) {
                numOfPro++;
            }
        }
        if ($("#name").val() === "") {
            $("#CNErrorDiv").text("You must pick a name").css({ 'color': 'red', 'font-style': 'italic' });
            formIsGood = false;
        }
        else {
            $("#CNErrorDiv").text("");
        }
        if (isNaN(lvlval)) {
            $("#CLErrorDiv").text("Please enter a number").css({ 'color': 'red', 'font-style': 'italic' });
            formIsGood = false;
        }
        if (levelEdit.value === "") {
            $("#CLErrorDiv").text("You must enter a level").css({ 'color': 'red', 'font-style': 'italic' });
            formIsGood = false;
        }
        if (levelEdit.value > maxlvl) {
            $("#CLErrorDiv").text("Level is to high").css({ 'color': 'red', 'font-style': 'italic' });
            formIsGood = false;
        }
        else if (!isNaN(lvlval)) {
            $("#CLErrorDiv").text("");
        }
        if (alignmentEdit.value === "") {
            $("#CAErrorDiv").text("Pick an alignment").css({ 'color': 'red', 'font-style': 'italic' });
            formIsGood = false;
        }
        else {
            $("#CAErrorDiv").text("");
        }
        var strval = parseFloat($("#Str").val());
        var dexval = parseFloat($("#Dex").val());
        var conval = parseFloat($("#Con").val());
        var intval = parseFloat($("#Int").val());
        var wisval = parseFloat($("#Wis").val());
        var chaval = parseFloat($("#Cha").val());
        if ($("#Str").val() === "" || isNaN(strval) ||
            $("#Dex").val() === "" || isNaN(dexval) ||
            $("#Con").val() === "" || isNaN(conval) ||
            $("#Int").val() === "" || isNaN(intval) ||
            $("#Wis").val() === "" || isNaN(wisval) ||
            $("#Cha").val() === "" || isNaN(chaval)) {
            $("#extra").text("invaild stats").css({ 'color': 'red', 'font-style': 'italic' });
            formIsGood = false;
        }
        else {
            $("#extra").text("");
        }
        if (Class.value === "Rogue" && numOfPro != 6) {
            $("#numOfOptions").html("Choose four additional proficiencies:(6 total)" + " <i style='color:red'>" + numOfPro + " proficiencies are selected" + "</i>");
            formIsGood = false;
        }
        if (Class.value != "Rogue" && numOfPro != 4) {
            $("#numOfOptions").html("Choose two additional proficiencies:(4 total)" + " <i style='color:red'>" + numOfPro + " proficiencies are selected" + "</i>");
            formIsGood = false;
        }
        if (Class.value === "Rogue" && numOfPro === 6) {
            $("#numOfOptions").html("Choose four additional proficiencies:(6 total)");
        }
        if ((Class.value != "Rogue" && numOfPro === 4)) {
            $("#numOfOptions").html("Choose two additional proficiencies:(4 total)");
        }
        return formIsGood;
    }
    function _addTableItem(character) {
        var row = "<tr id='" + character.id + "'>";
        row += "<td>" + character.name + "</td>";
        row += "<td>" + character.race + "</td>";
        row += "<td>" + character.jobClass + "</td>";
        row += "<td>" + character.alignment + "</td>";
        row += "<td><button type='button' class='btn btn-md btn-warning glyphicon glyphicon-pencil' id='edit" + character.id + "'></button>"
            + "<button type='button' class='btn btn-md btn-danger glyphicon glyphicon-remove-circle' id= 'delete" + character.id + "'></button>" + "</td>";
        row += "</tr>";
        $("#CharacterTable").append(row);
        $("#edit" + character.id).click(function () { _editBtnClicked(character.id); });
        $("#delete" + character.id).click(function () { _deleteBtnClicked(character.id); });
    }
    function _clearInput() {
        $("#name").val("");
        $("#level").val("");
        document.forms["myForm"].isLG.checked = true;
        document.forms["myForm"].isLG.checked = false;
        document.forms["myForm"].Class.value = "Barbarian";
        document.forms["myForm"].Race.value = "Human";
        document.forms["myForm"].Background.value = "Acolyte";
        $("#numOfOptions").text("Choose two additional proficiencies:(4 total)");
        $("#CNErrorDiv").text("");
        $("#CLErrorDiv").text("");
        $("#CAErrorDiv").text("");
        $("#numDiv").text("or use these stats");
        $("#Nums").val("15 14 13 12 10 8");
        $("#Str").val("");
        $("#Dex").val("");
        $("#Con").val("");
        $("#Int").val("");
        $("#Wis").val("");
        $("#Cha").val("");
        backgroundPerks();
        racePerks();
        $("#createBtn").css("display", "inline");
        $("#saveBtn").css("display", "none").off("click");
    }
    function _createBtnClicked() {
        var formIsGood = true;
        formIsGood = _validateControls(formIsGood, proficiencies);
        var choices = [];
        for (var x in proficiencies) {
            if (proficiencies[x].checked == true) {
                choices.push(x);
            }
        }
        if (formIsGood == true) {
            var character = CharacterModel.createCharacter(document.forms["myForm"].name.value, document.forms["myForm"].level.value, document.forms["myForm"].alignment.value, document.forms["myForm"].Race.value, document.forms["myForm"].Class.value, document.forms["myForm"].Background.value, choices, document.forms["roll"].Str.value, document.forms["roll"].Dex.value, document.forms["roll"].Con.value, document.forms["roll"].Int.value, document.forms["roll"].Wis.value, document.forms["roll"].Cha.value);
            _addTableItem(character);
            _clearInput();
        }
    }
    function _cancelBtnClicked() {
        _clearInput();
    }
    function _editBtnClicked(id) {
        var character = CharacterModel.getCharacter(id);
        if (character == null) {
            alert("unable to find character id " + id);
        }
        $("#name").val(character.name);
        $("#level").val(character.level);
        $("#Str").val(character.str);
        $("#Dex").val(character.dex);
        $("#Con").val(character.con);
        $("#Int").val(character.int);
        $("#Wis").val(character.wis);
        $("#Cha").val(character.cha);
        document.forms["myForm"].alignment.value = character.alignment;
        document.forms["myForm"].Race.value = character.race;
        document.forms["myForm"].Class.value = character.jobClass;
        document.forms["myForm"].Background.value = character.background;
        for (var x in proficiencies) {
            proficiencies[x].checked = false;
        }
        for (var x in character.proficiencies) {
            proficiencies[character.proficiencies[x]].checked = true;
        }
        racePerks();
        roguePerks();
        $("#createBtn").css("display", "none");
        $("#saveBtn")
            .css("display", "inline")
            .off("click")
            .click(function () { _saveBtnClicked(id); });
    }
    function _saveBtnClicked(id) {
        var formIsGood = true;
        formIsGood = _validateControls(formIsGood, proficiencies);
        var choices = [];
        for (var x in proficiencies) {
            if (proficiencies[x].checked == true) {
                choices.push(x);
            }
        }
        if (formIsGood == true) {
            var character = CharacterModel.getCharacter(id);
            if (character == null) {
                alert("unable to find character id " + id);
            }
            character.name = $("#name").val(),
                character.level = $("#level").val(),
                character.alignment = document.forms["myForm"].alignment.value,
                character.race = document.forms["myForm"].Race.value,
                character.jobClass = document.forms["myForm"].Class.value,
                character.background = document.forms["myForm"].Background.value,
                character.proficiencies = choices;
            character.str = $("#Str").val();
            character.dex = $("#Dex").val();
            character.con = $("#Con").val();
            character.int = $("#Int").val();
            character.wis = $("#Wis").val();
            character.cha = $("#Cha").val();
            var tr = $("#" + id).children();
            tr.eq(0).text(character.name);
            tr.eq(1).text(character.race);
            tr.eq(2).text(character.jobClass);
            tr.eq(3).text(character.alignment);
            CharacterModel.updateCharacter(id, character);
            _clearInput();
        }
    }
    function _deleteBtnClicked(id) {
        _clearInput();
        var character = CharacterModel.getCharacter(id);
        if (character === null) {
            alert("character with id" + id + "not found!");
            return;
        }
        if (!confirm("Are you sure you want to delete " + character.name + "?"))
            return;
        if (!CharacterModel.deleteCharacter(id)) {
            alert("character with id" + id + "not found!");
        }
        $("#" + id).remove();
    }
    ;
    function racePerks() {
        var Race = document.forms["myForm"].Race;
        var str = document.getElementById("StrBonus");
        var dex = document.getElementById("DexBonus");
        var con = document.getElementById("ConBonus");
        var int = document.getElementById("IntBonus");
        var wis = document.getElementById("WisBonus");
        var cha = document.getElementById("ChaBonus");
        if (Race.value == "Human") {
            str.innerHTML = "+1";
            dex.innerHTML = "+1";
            con.innerHTML = "+1";
            int.innerHTML = "+1";
            wis.innerHTML = "+1";
            cha.innerHTML = "+1";
            $("#extra").text("");
        }
        if (Race.value == "Half-Elf") {
            str.innerHTML = "";
            dex.innerHTML = "";
            con.innerHTML = "";
            int.innerHTML = "";
            wis.innerHTML = "";
            cha.innerHTML = "+2";
            $("#extra").text("+1 any two stats").css({ 'color': '#FFA300', 'font-style': 'italic' });
        }
        if (Race.value == "Tiefling") {
            str.innerHTML = "";
            dex.innerHTML = "";
            con.innerHTML = "";
            int.innerHTML = "+1";
            wis.innerHTML = "";
            cha.innerHTML = "+2";
            $("#extra").text("");
        }
        if (Race.value == "Mountain Dwarf") {
            str.innerHTML = "+2";
            dex.innerHTML = "";
            con.innerHTML = "+2";
            int.innerHTML = "";
            wis.innerHTML = "";
            cha.innerHTML = "";
            $("#extra").text("");
        }
        if (Race.value == "Dragonborn") {
            str.innerHTML = "+2";
            dex.innerHTML = "";
            con.innerHTML = "";
            int.innerHTML = "";
            wis.innerHTML = "";
            cha.innerHTML = "+1";
            $("#extra").text("");
        }
        if (Race.value == "Hill Dwarf") {
            str.innerHTML = "";
            dex.innerHTML = "";
            con.innerHTML = "+2";
            int.innerHTML = "";
            wis.innerHTML = "+1";
            cha.innerHTML = "";
            $("#extra").text("");
        }
        if (Race.value == "High Elf") {
            str.innerHTML = "";
            dex.innerHTML = "+2";
            con.innerHTML = "";
            int.innerHTML = "+1";
            wis.innerHTML = "";
            cha.innerHTML = "";
            $("#extra").text("");
        }
        if (Race.value == "Wood Elf") {
            str.innerHTML = "";
            dex.innerHTML = "+2";
            con.innerHTML = "";
            int.innerHTML = "";
            wis.innerHTML = "+1";
            cha.innerHTML = "";
            $("#extra").text("");
        }
        if (Race.value == "Drow") {
            str.innerHTML = "";
            dex.innerHTML = "+2";
            con.innerHTML = "";
            int.innerHTML = "";
            wis.innerHTML = "";
            cha.innerHTML = "+1";
            $("#extra").text("");
        }
        if (Race.value == "Lightfoot Halfling") {
            str.innerHTML = "";
            dex.innerHTML = "+2";
            con.innerHTML = "";
            int.innerHTML = "";
            wis.innerHTML = "";
            cha.innerHTML = "+1";
            $("#extra").text("");
        }
        if (Race.value == "Stout Halfling") {
            str.innerHTML = "";
            dex.innerHTML = "+2";
            con.innerHTML = "+1";
            int.innerHTML = "";
            wis.innerHTML = "";
            cha.innerHTML = "";
            $("#extra").text("");
        }
        if (Race.value == "Forest Gnome") {
            str.innerHTML = "";
            dex.innerHTML = "+1";
            con.innerHTML = "";
            int.innerHTML = "+2";
            wis.innerHTML = "";
            cha.innerHTML = "";
            $("#extra").text("");
        }
        if (Race.value == "Rock Gnome") {
            str.innerHTML = "";
            dex.innerHTML = "";
            con.innerHTML = "+1";
            int.innerHTML = "+2";
            wis.innerHTML = "";
            cha.innerHTML = "";
            $("#extra").text("");
        }
        if (Race.value == "Half-Orc") {
            str.innerHTML = "+2";
            dex.innerHTML = "";
            con.innerHTML = "+1";
            int.innerHTML = "";
            wis.innerHTML = "";
            cha.innerHTML = "";
            $("#extra").text("");
        }
    }
    Controller.racePerks = racePerks;
    function roguePerks() {
        var Class = document.forms["myForm"].Class;
        if (Class.value == "Rogue") {
            $("#numOfOptions").html("Choose four additional proficiencies:(6 total)");
        }
        else {
            $("#numOfOptions").html("Choose two additional proficiencies:(4 total)");
        }
    }
    Controller.roguePerks = roguePerks;
    function backgroundPerks() {
        var Acrobatics = document.forms["myForm"].Acrobatics;
        var AnimalHandling = document.forms["myForm"].AnimalHandling;
        var Arcana = document.forms["myForm"].Arcana;
        var Athletics = document.forms["myForm"].Athletics;
        var Deception = document.forms["myForm"].Deception;
        var History = document.forms["myForm"].History;
        var Insight = document.forms["myForm"].Insight;
        var Intimidation = document.forms["myForm"].Intimidation;
        var Investigation = document.forms["myForm"].Investigation;
        var Medicine = document.forms["myForm"].Medicine;
        var Nature = document.forms["myForm"].Nature;
        var Perception = document.forms["myForm"].Perception;
        var Performance = document.forms["myForm"].Performance;
        var Persuasion = document.forms["myForm"].Persuasion;
        var Religion = document.forms["myForm"].Religion;
        var SlightofHand = document.forms["myForm"].SlightofHand;
        var Stealth = document.forms["myForm"].Stealth;
        var Survival = document.forms["myForm"].Survival;
        var Background = document.forms["myForm"].Background;
        for (var x in proficiencies) {
            proficiencies[x].checked = false;
        }
        //reset current proficiencies and then add the ones related to the background chosen
        if (Background.value == "Charlatan") {
            Deception.checked = true;
            SlightofHand.checked = true;
        }
        if (Background.value == "Acolyte") {
            Insight.checked = true;
            Religion.checked = true;
        }
        if (Background.value == "Criminal") {
            Deception.checked = true;
            Stealth.checked = true;
        }
        if (Background.value == "Entertainer") {
            Acrobatics.checked = true;
            Performance.checked = true;
        }
        if (Background.value == "Folk Hero") {
            AnimalHandling.checked = true;
            Survival.checked = true;
        }
        if (Background.value == "Guild Artisan") {
            Insight.checked = true;
            Persuasion.checked = true;
        }
        if (Background.value == "Hermit") {
            Medicine.checked = true;
            Religion.checked = true;
        }
        if (Background.value == "Noble") {
            History.checked = true;
            Persuasion.checked = true;
        }
        if (Background.value == "Outlander") {
            Athletics.checked = true;
            Survival.checked = true;
        }
        if (Background.value == "Sage") {
            Arcana.checked = true;
            History.checked = true;
        }
        if (Background.value == "Sailor") {
            Athletics.checked = true;
            Perception.checked = true;
        }
        if (Background.value == "Soldier") {
            Athletics.checked = true;
            Intimidation.checked = true;
        }
        if (Background.value == "Urchin") {
            SlightofHand.checked = true;
            Stealth.checked = true;
        }
    }
    Controller.backgroundPerks = backgroundPerks;
    function randomNum() {
        $("#numDiv").text("");
        var num1 = 0;
        var num2 = 0;
        var num3 = 0;
        var num4 = 0;
        var smallest;
        var result = 0;
        if ($("#Nums").val() != "") {
            $("#Nums").val("");
        }
        for (var i = 0; i < 6; i++) {
            num1 = Math.floor((Math.random() * 6) + 1);
            num2 = Math.floor((Math.random() * 6) + 1);
            num3 = Math.floor((Math.random() * 6) + 1);
            num4 = Math.floor((Math.random() * 6) + 1);
            smallest = Math.min(num1, num2, num3, num4);
            result = num1 + num2 + num3 + num4 - smallest;
            document.forms["roll"].Nums.value += result + " ";
        }
    }
    Controller.randomNum = randomNum;
    function initalize() {
        $("#createBtn").click(_createBtnClicked);
        $("#cancelBtn").click(_cancelBtnClicked);
        var list = CharacterModel.getAllCharacters();
        for (var i in list) {
            _addTableItem(list[i]);
        }
        _clearInput();
        proficiencyList();
    }
    Controller.initalize = initalize;
})(Controller || (Controller = {}));
//# sourceMappingURL=controller.js.map