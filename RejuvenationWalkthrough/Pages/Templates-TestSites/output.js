var allmoves=JSON.parse(movetext)
var allmovesDetails=JSON.parse(moveDetails)

function outputMoves(pokeName){
    outputPlace=document.getElementById("testOutput")
    inputName=document.getElementById("pokemonName")
    pokeName=inputName.value
    otherOutput=""
    if(pokeName==""){
        pokeName="Bulbasaur"
    }
    keyList=[]
    moveList=[]
    moveLevel=[]
    moveID=[]
    tooltipOutput=[]
    fulltext='<table class="pokedexMoveTable">'
    for (var key in allmoves.pokemon_name){
        if(allmoves.pokemon_name[key]==pokeName){
            keyList.push(key)
            moveID.push(getIDByName(allmoves.move_name[key].toLowerCase()))
        }
    }
    i=0;
    for (var key in keyList){
        moveList.push(allmoves.move_name[keyList[key]])
        moveLevel.push(allmoves.level[keyList[key]])
        otherOutput="Move Type: ____<br>Power: "+allmovesDetails.power[moveID[i]]+"<br>Accuracy: "+allmovesDetails.accuracy[moveID[i]]
        tooltipOutput.push(otherOutput);
        i++
    }
    i=0;
    for (var key in keyList){
        damageType=getdamageTypeEffect(allmovesDetails.type_id[moveID[i]],allmovesDetails.damage_class_id[moveID[i]])
        fulltext+='<tr>'
        fulltext+='<td class="levelCell">'+moveLevel[key]+'</td>'
        fulltext+='<td class="typeCell" style="background-color: var(--type'+damageType[1]+');">'+damageType[1]+'</td>'
        fulltext+='<td class="pokemonDamageTypeCell"><img class="damageType" src="../../images/moveTypeIcons/'+damageType[0]+'.png"></td>'
        if(allmovesDetails.power[moveID[i]]==null){
            fulltext+='<td class="powerCell">---</td>'
        } else {
            fulltext+='<td class="powerCell">'+allmovesDetails.power[moveID[i]]+'</td>'
        }
        if(allmovesDetails.power[moveID[i]]==null){
            fulltext+='<td class="accCell">---</td>'
        } else {
            fulltext+='<td class="accCell">'+allmovesDetails.accuracy[moveID[i]]+'</td>'
        }
        fulltext+='<td class="pokemonMoveNameCell">'+moveList[key]+'</td>';
        fulltext+='</tr>';
        i++;
    }
    outputPlace.innerHTML=fulltext
    outputPlace=document.getElementById("speNum")
    speNumber=allmoves.pokemon_species[keyList[0]]
    formNumber=allmoves.pokemon_form[keyList[0]]
    pokName=allmoves.pokemon_name[keyList[0]]
    outputPlace.innerHTML=speNumber+", Form: "+formNumber+", Name: "+pokName

    outputPlace=document.getElementById("stats")
    fulltext='<table class="eventTrainerBattle"><tr><td>HP</td><td>Attack</td><td>Defense</td><td>Special Attack</td><td>Special Defense</td><td>Speed</td><td>BST</td></tr><tr>'
    thisPokemon=BattlePokedex[speNumber-1][formNumber+7][4]
    fulltext+='<td>'+thisPokemon[0]+'</td>'+'<td>'+thisPokemon[1]+'</td>'+'<td>'+thisPokemon[2]+'</td>'+'<td>'+thisPokemon[3]+'</td>'+'<td>'+thisPokemon[4]+'</td>'+'<td>'+thisPokemon[5]+'</td>'+'<td>'+thisPokemon[6]+'</td>'
    fulltext+='</tr></table>'
    outputPlace.innerHTML=fulltext

    outputPlace=document.getElementById("evolutions")
    thisPokemon=BattlePokedex[speNumber-1][formNumber+7][9]
    outputPlace.innerHTML=thisPokemon
}

function pseudoHash(){
    outputLoc=document.getElementById("testOutput");
    hashedArray=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
    fulltext="";
    for(i=0; i<AllEncounters.length; i++){
        hashNumber = AllEncounters[i][0][0].charCodeAt(0)-65;
        hashedArray[hashNumber].push(AllEncounters[i]);
    }
    for(i=0; i<hashedArray.length; i++){ //Initial
        fulltext+='[<br>'
        for(j=0; j<hashedArray[i].length; j++){
            fulltext+='\u00A0\u00A0\u00A0\u00A0[[\''+hashedArray[i][j][0][0]+'\', [';
            for(k=0; k<hashedArray[i][j][0][1].length; k++){
                fulltext+='\''+hashedArray[i][j][0][1][k]+'\', '
            }
            fulltext=fulltext.slice(0, -2);
            fulltext+=']],<br>';
            for(k=0; k<hashedArray[i][j][0][1].length; k++){
                actualLocation=k+1;
                fulltext+='\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0[\''+hashedArray[i][j][actualLocation][0]+'\', ['+hashedArray[i][j][actualLocation][1][0]+', [';
                for(l=0; l<hashedArray[i][j][actualLocation][1][0]; l++){
                    fulltext+='\''+hashedArray[i][j][actualLocation][1][1][l]+'\', ';
                }
                fulltext=fulltext.slice(0, -2);
                fulltext+=']],<br>'+'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0['+'<br>';
                for(l=0; l<hashedArray[i][j][actualLocation][2].length; l++){
                    fulltext+='\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
                    fulltext+='[[\''+hashedArray[i][j][actualLocation][2][l][0][0]+'\'], [';
                    for(m=0; m<hashedArray[i][j][actualLocation][2][l][1].length; m++){
                        textToAdd=hashedArray[i][j][actualLocation][2][l][1][m]
                        textToAdd=textToAdd.replaceAll("<br>", "-br-")
                        fulltext+='\''+textToAdd+'\', '
                    }
                    fulltext=fulltext.slice(0, -2);
                    if(hashedArray[i][j][actualLocation][0]=='Shadows'){
                        textToAdd=hashedArray[i][j][actualLocation][2][l][2]
                        textToAdd=textToAdd.replaceAll("<br>", "-br-")
                        fulltext+='], \''+textToAdd+'\'';
                    } else {
                        fulltext+='], '+hashedArray[i][j][actualLocation][2][l][2];
                    }
                    if(hashedArray[i][j][actualLocation][0]=='Events'){
                        fulltext+=', '+hashedArray[i][j][actualLocation][2][l][3]+'],';
                    }
                    else{
                        fulltext+='], '
                    }
                    fulltext+='<br>'
                }
                fulltext+='\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0],<br>'
                fulltext+='\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0],<br>'
            }
            fulltext+='\u00A0\u00A0\u00A0\u00A0],<br>'
        }
        fulltext+='], //' + String.fromCharCode(65 + i) + '<br>'
    }
    outputLoc.innerHTML=fulltext;
}

function emptyHashed(){
    outputLoc=document.getElementById("testOutput");
    fulltext=""
    for(i=0; i<26; i++){
        fulltext+="[<br><br>], //"+String.fromCharCode(65 + i) + '<br>'
    }
    outputLoc.innerHTML=fulltext;
}

function getIDByName(code) {
    code=code.replaceAll(" ", "-")
    for (var key in allmovesDetails.identifier){
        if(allmovesDetails.identifier[key]==code){
            return key;
        }
    }
}

function getdamageTypeEffect(typeID, damagetypeID){
    moveOutput=[]
    //damage Type
    if(damagetypeID==1){
        moveOutput.push("other"); //status moves or other
    } else if (damagetypeID==2) {
        moveOutput.push("physical");
    } else {
        moveOutput.push("special");
    }

    //Type
    if(typeID==1){
        moveOutput.push("Normal");
    } else if (typeID==2) {
        moveOutput.push("Fighting");
    } else if (typeID==3) {
        moveOutput.push("Flying");
    } else if (typeID==4) {
        moveOutput.push("Poison");
    } else if (typeID==5) {
        moveOutput.push("Ground");
    } else if (typeID==6) {
        moveOutput.push("Rock");
    } else if (typeID==7) {
        moveOutput.push("Bug");
    } else if (typeID==8) {
        moveOutput.push("Ghost");
    } else if (typeID==9) {
        moveOutput.push("Steel");
    } else if (typeID==10) {
        moveOutput.push("Fire");
    } else if (typeID==11) {
        moveOutput.push("Water");
    } else if (typeID==12) {
        moveOutput.push("Grass");
    } else if (typeID==13) {
        moveOutput.push("Electric");
    } else if (typeID==14) {
        moveOutput.push("Psychic");
    } else if (typeID==15) {
        moveOutput.push("Ice");
    } else if (typeID==16) {
        moveOutput.push("Dragon");
    } else if (typeID==17) {
        moveOutput.push("Dark");
    } else if (typeID==18) {
        moveOutput.push("Fairy");
    }




    return moveOutput;
}