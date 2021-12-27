var allmoves=JSON.parse(movetext)
var allmovesDetails=JSON.parse(moveDetails)

function readText(){
    var notFound=true;
    var inputField=document.getElementById("myTextInput"); //Input text field
    var outputField=document.getElementById("mainOutput"); //Output of the Pokedex
    var bigNameField=document.getElementById("pokemonBigName"); //Big Name on Top of page
    
    //Input text assessment
    var inputtext=inputField.value;
    var formNumber; //Form Number

    if(isNaN(inputtext[0])){
      inputName=inputtext;
      for(var i=0; i<PokemonList.length; i++){
        if(inputName.toLowerCase()==PokemonList[i]){
          returnText=createbattlePokedexText(BattlePokedex[i],7);
          bigNameField.innerHTML=BattlePokedex[i][0]+" - "+inputName;
          notFound=false;
          return returnText;
        }
      }
      if(notFound){
        bigNameField.innerHTML="Pokemon";
        outputField.innerHTML="Pokemon Not Found";
        var allOutputs=document.getElementsByClassName("pokedexOutputs");
        for(var i=1; i<allOutputs.length; i++){
          allOutputs[i].innerHTML="";
        }
        return "";
      }
      return "";
    }

    if(inputtext.search("_")==-1){
        formNumber=0;
        inputName=inputtext.substr(6,inputtext.length-6);
    } else {
        formNumber=parseInt(inputtext.substr(inputtext.search("_")+1,1));
        inputName=inputtext.substr(8,inputtext.length-8);
    }

    inputNumber=parseInt(inputtext.substr(0,3));
    returnText=createbattlePokedexText(BattlePokedex[inputNumber-1],formNumber+7);
    bigNameField.innerHTML=BattlePokedex[inputNumber-1][0]+" - "+inputName;
    return returnText;
}

function showText(alltext){
  if(alltext==""){
    alltext=readText();
    if(alltext==""){
      return "";
    }
  }
  //Main Output (Always Show)
  var docOut = document.getElementById("mainOutput");
  docOut.innerHTML=alltext[0];

  //Evolution Output (Checkbox)
  docOut = document.getElementById("evoOutput");
  var checkboxCheck=document.getElementById("showEvolution");
  if(checkboxCheck.checked){
    docOut.innerHTML=alltext[1];
  } else {
    docOut.innerHTML="";
  }

  docOut = document.getElementById("moveOutput");
  var checkboxCheck=document.getElementById("showMoves");
  if(checkboxCheck.checked){
    docOut.innerHTML=alltext[2];
  } else {
    docOut.innerHTML="";
  }

  docOut = document.getElementById("FormOutput");
  var checkboxCheck=document.getElementById("showMoves");
  if(checkboxCheck.checked){
    docOut.innerHTML=alltext[3];
  } else {
    docOut.innerHTML="";
  }

  setClickables();
  return alltext;
}

function setClickables(){
  var clickTable = document.getElementById("evolutionTable")
  if(clickTable!=null){
    var clickableLoop = clickTable.getElementsByClassName("pokemonImageCell")
    for(var i=0; i<clickableLoop.length; i++){
      pokemonToChangeTo = clickableLoop[i].id;
      clickableLoop[i].onclick = function(){changePage(this)};
    }
  }
  return
}

function changePage(changePokemon){
  changePokemon=changePokemon.id;
  var changeInput=document.getElementById("myTextInput");
  changeInput.value=changePokemon;
  alltext=readText();
  alltext=showText(alltext);
} //Change Pokemon on evolution image click

function createbattlePokedexText(PokemontoDetail, formNumber){
  var actualPokemon=PokemontoDetail[formNumber];
  var pokemonImageNumberString;
  var i;
  var fulltext=[];

  statTitleNames=['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed', 'Stat Total']

  if(formNumber==7){
    pokemonImageNumberString=PokemontoDetail[0];
  }
  else{
    pokemonImageNumberString=PokemontoDetail[0]+"_"+String(formNumber-7);
  }

  statColors = calcStatColor(actualPokemon[4]);

  //Image + Statbars
  fulltext.push('<table class="pokedexTable"><tr><td rowspan="7" class="pokemonImageCell" style="text-align: center;"><img class="pokemonImageSource" src="../../images/PokemonSprites/'+pokemonImageNumberString+'.png"><br>'+actualPokemon[0]+'</td><td class="statTitles">HP:</td><td class="statBarContainer"><div class="statBar" style="width: '+String(2*actualPokemon[4][0]) +'px;background-color: var(--'+statColors[0]+'"></div></td><td class="statNumber" style="width: 40px;">'+String(actualPokemon[4][0])+'</td></tr>');
  for(i=1; i<6; i++){
    fulltext[0]+='<tr><td class="statTitles">'+statTitleNames[i]+':</td><td class="statBarContainer"><div class="statBar" style="width: '+String(2*actualPokemon[4][i]) +'px;background-color: var(--'+statColors[i]+'"></div></td><td class="statNumber" style="width: 40px;">'+String(actualPokemon[4][i])+'</td></tr>'
  }
  //Base Stat Total
  fulltext[0]+='<tr><td class="statTitles">'+statTitleNames[6]+':</td><td class="statBarContainer"><div class="statBar" style="width: '+String((500/720)*actualPokemon[4][6]) +'px;background-color: var(--'+statColors[6]+'"></div></td><td class="statNumber" style="width: 40px;">'+String(actualPokemon[4][6])+'</td></tr>'

  //Type + Abilities
  fulltext[0]+='<tr><td style="text-align: center;"><span class="typeTable" style="background-color: var(--type'+actualPokemon[1][0]+');">'+actualPokemon[1][0]+'</span><br>'
  if(actualPokemon[1].length==2){
    fulltext[0]+='<span class="typeTable" style="background-color: var(--type'+actualPokemon[1][1]+');">'+actualPokemon[1][1]+'</span>'
  }
  fulltext[0]+='</td><td class="abilityTable" colspan="2">'
  for(var i=0; i<actualPokemon[2].length; i++){
    fulltext[0]+='Ability '+String(i+1)+': '+actualPokemon[2][i]+'<br>';
  }
  if(actualPokemon[3][0]!='None'){
    fulltext[0]+='Hidden Ability: '+actualPokemon[3][0];
    if(actualPokemon[3].length>1) {
      fulltext[0]+='<br>Other Ability: '+actualPokemon[3][1];
      //Exceptions "Other Abilities" -> Rockruff
    }
    fulltext[0]+='</td></tr>'
  }
  fulltext[0]+='</table><br><br>'

  //Evolution Table
  baseForm=getBaseForm(PokemontoDetail, formNumber); //find the base form of the evolution line
  evolutionLine=getEvoLine(baseForm); //find the full evolution line for the base form
  evolutionNumbers=getEvoNumbers(evolutionLine); //calculate the number of rows and columns needed for the table

  var curPokNumForm = getNumberForm(evolutionLine[0]); //Get number and form for BattlePokedex
  temptext=[];
  evolutionsToInsert=[];
  evolutionMethods=[];
  for(var i=1; i<evolutionLine.length; i++){
    evolutionsToInsert.push(evolutionLine[i]);
    evolutionMethods.push(BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][9][(i-1)*2]);
  }

  fulltext.push('<table class="evolutionTable" id="evolutionTable"><tr>');
  curRowSpan=evolutionNumbers[0];
  
  setWidth=parseInt(600/(evolutionNumbers[1]+1));
  fulltext[1]+='<td rowspan="'+String(curRowSpan+1)+'" class="pokemonImageCell" id="'+evolutionLine[0]+" - "+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'" style="width: '+String(setWidth)+'px;"><img class="pokemonImageSource" src="../../images/PokemonSprites/'+evolutionLine[0]+'.png"><br>'+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'</td>'
  if(evolutionLine.length==1){ //Only 1 Evolution
    fulltext[1]+='</tr></table>';
  } else {
    while(evolutionsToInsert.length!=0){
      temptextVal=0;
      evolutionsToInsertTemp=[];
      for(var curInsertion=0; curInsertion<evolutionsToInsert.length; curInsertion++){
        curPokNumForm=getNumberForm(evolutionsToInsert[curInsertion][0]);
        if(evolutionsToInsert.length>1){
          curRowSpan=0;
        }
        if(typeof(temptext[curInsertion])=='undefined'){
          temptext.push('<td rowspan="'+String(curRowSpan+1)+'" class="evolutionArrowCell"><div class="rightArrow"></div><br>'+evolutionMethods[0]+'</td>'+'<td rowspan="'+String(curRowSpan+1)+'" class="pokemonImageCell" id="'+evolutionsToInsert[curInsertion][0]+" - "+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'" style="width: '+String(setWidth)+'px;"><img class="pokemonImageSource" src="../../images/PokemonSprites/'+evolutionsToInsert[curInsertion][0]+'.png"><br>'+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'</td>');
          evolutionMethods.shift();
        } else {
          if(evolutionsToInsert[curInsertion][0]=='866'){ //Mr. Rime Exception
            temptext[curInsertion+1]=temptext[curInsertion+1]+'<td rowspan="'+String(curRowSpan+1)+'" class="evolutionArrowCell"><div class="rightArrow"></div><br>'+evolutionMethods[0]+'</td>'+'<td rowspan="'+String(curRowSpan+1)+'" class="pokemonImageCell" id="'+evolutionsToInsert[curInsertion][0]+" - "+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'" style="width: '+String(setWidth)+'px;"><img class="pokemonImageSource" src="../../images/PokemonSprites/'+evolutionsToInsert[curInsertion][0]+'.png"><br>'+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'</td>';
            evolutionMethods.shift();
          } else if(evolutionsToInsert[curInsertion][0]=='122') { //Mr. Rime Exception
            temptext[curInsertion]=temptext[curInsertion]+'<td rowspan="'+String(curRowSpan+1)+'" class="evolutionArrowCell"><div class="rightArrow"></div><br>'+evolutionMethods[0]+'</td>'+'<td rowspan="'+String(curRowSpan+1)+'" class="pokemonImageCell" id="'+evolutionsToInsert[curInsertion][0]+" - "+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'" style="width: '+String(setWidth)+'px;"><img class="pokemonImageSource" src="../../images/PokemonSprites/'+evolutionsToInsert[curInsertion][0]+'.png"><br>'+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'</td><td></td><td></td>';
            evolutionMethods.shift();
          } else {
            temptext[curInsertion]=temptext[curInsertion]+'<td rowspan="'+String(curRowSpan+1)+'" class="evolutionArrowCell"><div class="rightArrow"></div><br>'+evolutionMethods[0]+'</td>'+'<td rowspan="'+String(curRowSpan+1)+'" class="pokemonImageCell" id="'+evolutionsToInsert[curInsertion][0]+" - "+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'" style="width: '+String(setWidth)+'px;"><img class="pokemonImageSource" src="../../images/PokemonSprites/'+evolutionsToInsert[curInsertion][0]+'.png"><br>'+BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][0]+'</td>';
            evolutionMethods.shift();
          }
        }
        if(evolutionsToInsert[curInsertion].length==1){
          //evolutionsToInsert.shift();
        } else {
          for(var i=1; i<evolutionsToInsert[curInsertion].length; i++){
            evolutionsToInsertTemp.push(evolutionsToInsert[curInsertion][i]);
            evolutionMethods.push(BattlePokedex[curPokNumForm[0]-1][curPokNumForm[1]+7][9][(i-1)*2]);
          }
        }
      }
      evolutionsToInsert=evolutionsToInsertTemp;
    }
    fulltext[1]+=temptext[0]+'</tr>'
    for(var i=1; i<temptext.length; i++){
      fulltext[1]+='<tr>'+temptext[i]+'</tr>';
    }
  }
  fulltext[1]+='</table>';

  //Levelup Moves
  fulltext.push(outputMoves(actualPokemon[0]));

  //Other Forms
  if(PokemontoDetail.length>8){
    temptext=""
    for(i=7; i<PokemontoDetail.length; i++){
      temptext=temptext+PokemontoDetail[i][0]+", "
    }
    fulltext.push(temptext)
  } else{
    fulltext.push("")
  }

  return fulltext;
} //create an array of output strings for a Pokemon

function outputMovesV0(pokeName){
  var allmoves=JSON.parse(movetext)
  if(pokeName==""){
    return "None";
  }
  keyList=[]
  moveList=[]
  moveLevel=[]
  fulltext='<table class="pokedexMoveTable"><thead><tr><th>Level</th><th>Move Name</th></tr></thead><tbody>'
  for (var key in allmoves.pokemon_name){
      if(allmoves.pokemon_name[key]==pokeName){
          keyList.push(key)
      }
  }
  if(keyList.length==0){ //Pokemon Move Exception Check (Megas, etc)
    pokeName=getMoveException(pokeName);
    for (var key in allmoves.pokemon_name){
      if(allmoves.pokemon_name[key]==pokeName){
          keyList.push(key)
      }
    }
    if(keyList.length==0){
      fulltext="No Moves Available";
      return fulltext;
    }
  }
  for (var key in keyList){
      moveList.push(allmoves.move_name[keyList[key]])
      moveLevel.push(allmoves.level[keyList[key]])
  }
  for (var key in keyList){
      fulltext+="<tr><td>"+moveLevel[key]+"</td><td>"+moveList[key]+"</td></tr>"
  }
  fulltext+='</tbody></table>'
  return fulltext;
} //get the level-up learnable moves for the Pokemon - Deprecated

function outputMoves(pokeName){
  if(pokeName==""){
    return "None"
  }
  otherOutput=""
  keyList=[]
  moveList=[]
  moveLevel=[]
  moveID=[]
  tooltipOutput=[]
  pokeName=getMoveException(pokeName);
  fulltext='<table class="pokedexMoveTable"><tr><th class="levelHeader">Level</th><th class="typeHeader">Type</th><th class="damageHeader">Damage Type</th><th class="powerHeader">Power</th><th class="accHeader">Accuracy</th><th class="nameHeader">Move Name</th>'
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
      if(allmovesDetails.accuracy[moveID[i]]==null){
          fulltext+='<td class="accCell">---</td>'
      } else {
          fulltext+='<td class="accCell">'+allmovesDetails.accuracy[moveID[i]]+'</td>'
      }
      fulltext+='<td class="pokemonMoveNameCell">'+moveList[key]+'</td>';
      fulltext+='</tr>';
      i++;
  }
  return fulltext
}  //get the level-uplearnable moves for the Pokemon

function getIDByName(code) {
  code=code.replaceAll(" ", "-")
  for (var key in allmovesDetails.identifier){
      if(allmovesDetails.identifier[key]==code){
          return key;
      }
  }
} //Helper function for outputMoves(pokeName)

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
} //Helper function for outputMoves(pokeName)

function getBaseForm(thisPokemon, formNumber){
  var nextPokemon=thisPokemon;
  var pokemonToAddNumber;

  while(nextPokemon[formNumber][8]!='None'){
    pokemonToAddNumber=parseInt(nextPokemon[formNumber][8].substr(0,3));
    if(nextPokemon[formNumber][8].search("_")==-1){
      formNumber=7;
    } else {
      formNumber=parseInt(nextPokemon[formNumber][8].substr(nextPokemon[formNumber][8].search("_")+1,1))+7
    }
    nextPokemon=BattlePokedex[pokemonToAddNumber-1]
  }

  return [nextPokemon[0], formNumber];
} //Get the base form of an evolution line

function getEvoLine(baseForm){
  var evolutionLine=[];
  var dexNumber=parseInt(baseForm[0]-1);
  var formNumber=baseForm[1]
  var evolvedPokemonNumber;
  var evolvedPokemonForm;
  var j=0; //Variable to find where the "next" evolution Pokemon is

  if(baseForm[1]==7){
    evolutionLine.unshift(baseForm[0])
  } else {
    evolutionLine.unshift(baseForm[0]+"_"+String(formNumber-7))
  }
  for(var i=0; i<parseInt((BattlePokedex[dexNumber][formNumber][9].length)/2); i++){
    if(BattlePokedex[dexNumber][formNumber][9][j+1].search("_")==-1){
      evolvedPokemonNumber=BattlePokedex[dexNumber][formNumber][9][j+1];
      evolvedPokemonForm=7;
    } else {
      evolvedPokemonNumber=BattlePokedex[dexNumber][formNumber][9][j+1].substr(0,3);
      evolvedPokemonForm=parseInt(BattlePokedex[dexNumber][formNumber][9][j+1].substr(4,1))+7;
    }
    j=j+2;
    newBaseForm=[evolvedPokemonNumber, evolvedPokemonForm];
    evolutionLine.push(getEvoLine(newBaseForm));
  }

  return evolutionLine;
} //get the base evolution for any Pokemon

function getEvoNumbers(evolutionLine){
  var evoNumbers=[0,0]; //number of rows (max diverging evolutions) & number of columns (max number of evolutions)
  if(evolutionLine.length==1){
    return evoNumbers;
  } else {
    evoNumbers[0]=evolutionLine.length-1;
    evoNumbers[1]=1;
    for(var i=1; i<evolutionLine.length; i++){
      var nextEvolutionNumbers=getEvoNumbers(evolutionLine[i]);
      if(nextEvolutionNumbers[0]>evoNumbers[0]){
        evoNumbers[0]=nextEvolutionNumbers[0];
      }
      evoNumbers[1]+=nextEvolutionNumbers[1];
    }
  }
  return evoNumbers;
} //get the number of rows/columns needed for each evolution line

function getNumberForm(pokemonString){
  if(pokemonString.search("_")==-1){
    return [parseInt(pokemonString), 0];
  } else {
    return [parseInt(pokemonString.substr(0,3)), parseInt(pokemonString.substr(4,1))];
  }
} //get the pokedex number and form from any string -> 019_1 is 019 for Rattata: Form 1 (Alolan)

function calcStatColor(statNums){
  statColors=[];
  //HP
  if(statNums[0]<=46){
    statColors.push("veryLowStat");
  } else if (statNums[0]<=69) {
    statColors.push("belowAverageStat");
  } else if (statNums[0]<=95) {
    statColors.push("aboveAverageStat");
  } else {
    statColors.push("veryHighStat");
  }
  //Attack
  if(statNums[1]<=47){
    statColors.push("veryLowStat");
  } else if (statNums[1]<=79) {
    statColors.push("belowAverageStat");
  } else if (statNums[1]<=110) {
    statColors.push("aboveAverageStat");
  } else {
    statColors.push("veryHighStat");
  }
  //Defense
  if(statNums[2]<=43){
    statColors.push("veryLowStat");
  } else if (statNums[2]<=73) {
    statColors.push("belowAverageStat");
  } else if (statNums[2]<=104) {
    statColors.push("aboveAverageStat");
  } else {
    statColors.push("veryHighStat");
  }
  //Special Attack
  if(statNums[3]<=40){
    statColors.push("veryLowStat");
  } else if (statNums[3]<=71) {
    statColors.push("belowAverageStat");
  } else if (statNums[3]<=103) {
    statColors.push("aboveAverageStat");
  } else {
    statColors.push("veryHighStat");
  }
  //Special Defense
  if(statNums[4]<=44){
    statColors.push("veryLowStat");
  } else if (statNums[4]<=71) {
    statColors.push("belowAverageStat");
  } else if (statNums[4]<=98) {
    statColors.push("aboveAverageStat");
  } else {
    statColors.push("veryHighStat");
  }
  //Speed
  if(statNums[5]<=38){
    statColors.push("veryLowStat");
  } else if (statNums[5]<=67) {
    statColors.push("belowAverageStat");
  } else if (statNums[5]<=96) {
    statColors.push("aboveAverageStat");
  } else {
    statColors.push("veryHighStat");
  }
  //Base Stat Total
  if(statNums[6]<=314){
    statColors.push("veryLowStat");
  } else if (statNums[6]<=432) {
    statColors.push("belowAverageStat");
  } else if (statNums[6]<=549) {
    statColors.push("aboveAverageStat");
  } else {
    statColors.push("veryHighStat");
  }
  return statColors;
} //get bar color for stats

function getMoveException(pokeName){
  if(pokeName.search("Mega")!=-1){ //Megas (ADD EXCEPT CHARIZARD AND MEWTWO)
    pokeName=pokeName.slice(5);
    if(pokeName.search("Charizard")!=-1 || pokeName.search("Mewtwo")!=-1 || pokeName.search("Gengar")!=-1){
      pokeName=pokeName.substr(0,pokeName.length-2);
    }
    if(pokeName.search("Toxtricity")!=-1){
      pokeName="Toxtricity Amped"
    }
    return pokeName;
  }
  else if(pokeName.search("Primal")!=-1){ //Primal Groudon/Kyogre
    pokeName=pokeName.slice(7);
    return pokeName;
  }
  //Different Form -> Different Moveset
  else if(pokeName.search("Lycanroc")!=-1) { //Lycanroc
    if(pokeName.search("Midday")!=-1) {
      return "Lycanroc Midday";
    } else if (pokeName.search("Midnight")!=-1){
      return "Lycanroc Midnight";
    } else {
      return "Lycanroc Dusk";
    }
  }
  else if(pokeName.search("Wormadam")!=-1) { //Wormadam
    if(pokeName.search("Plant")!=-1) {
      return "Wormadam Plant";
    } else if (pokeName.search("Sandy")!=-1){
      return "Wormadam Sandy";
    } else {
      return "Wormadam Trash";
    }
  }
  else if(pokeName.search("Deoxys")!=-1){ //Deoxys
    if(pokeName.search("Normal")!=-1) {
      return "Deoxys Normal";
    } else if (pokeName.search("Attack")!=-1){
      return "Deoxys Attack";
    } else if (pokeName.search("Defense")!=-1){
      return "Deoxys Defense";
    } else {
      return "Deoxys Speed";
    }
  }
  else if(pokeName.search("Shaymin")!=-1){ //Shaymin
    if(pokeName.search("Land")!=-1) {
      return "Shaymin Land";
    }
    return "Shaymin Sky";
  }
  else if(pokeName.search("Kyurem")!=-1){ //Kyurem
    if(pokeName.search("Black")!=-1) {
      return "Kyurem Black";
    }
    return "Kyurem White";
  }
  else if(pokeName.search("Meowstic")!=-1){ //Meowstic
    if(pokeName.search("Male")!=-1) {
      return "Meowstic Male";
    }
    return "Meowstic Female";
  }
  else if(pokeName.search("Hoopa")!=-1){ //Hoopa
    if(pokeName.search("Unbound")!=-1) {
      return "Hoopa Unbound";
    }
    return "Hoopa";
  }
  else if(pokeName.search("o-o")!=-1){ //Jangmo-o Line
    if(pokeName.search("Jang")!=-1) {
      return "Jangmo O";
    } else if (pokeName.search("Hakamo")!=-1){
      return "Hakamo O";
    } 
    return "Kommo O";
  }
  else if(pokeName.search("Toxtricity")!=-1){ //Toxtricity
    if(pokeName.search("Amped")!=-1) {
      return "Toxtricity Amped";
    }
    return "Toxtricity Low Key";
  }
  else if(pokeName.search("Indeedee")!=-1){ //Indeedee
    if(pokeName.search("Male")!=-1) {
      return "Indeedee Male";
    }
    return "Indeedee Female";
  }
  else if(pokeName.search("Urshifu")!=-1){ //Urshifu
    if(pokeName.search("Single")!=-1) {
      return "Urshifu Single Strike";
    }
    return "Urshifu Rapid Strike";
  }
  else if(pokeName.search("Calyrex")!=-1){ //Calyrex
    if(pokeName.search("Ice")!=-1) {
      return "Calyrex Ice";
    }
    return "Calyrex Shadow";
  }
  //Different Form -> Same Moveset
  else if(pokeName.search("Castform")!=-1){ //Deoxys
    return "Castform";
  }
  else if(pokeName.search("Rotom")!=-1){ //Pumpkaboo/Gourgeist
    return "Rotom";
  }
  else if(pokeName.search("Giratina")!=-1){ //Pumpkaboo/Gourgeist
    return "Giratina";
  }
  else if(pokeName.search("Tornadus")!=-1){ //Tornadus
    return "Tornadus";
  }
  else if(pokeName.search("Thundurus")!=-1){ //Thundurus
    return "Thundurus";
  }
  else if(pokeName.search("Landorus")!=-1){ //Landorus
    return "Landorus";
  }
  else if(pokeName.search("Meloetta")!=-1){ //Meloetta
    return "Meloetta";
  }
  else if(pokeName.search("Aegislash")!=-1){ //Aegislash
    return "Aegislash";
  }
  else if(pokeName.search("Pumpkaboo")!=-1){ //Pumpkaboo/Gourgeist
    return "Pumpkaboo";
  }
  else if(pokeName.search("Gourgeist")!=-1){ //Pumpkaboo/Gourgeist
    return "Gourgeist";
  }
  else if(pokeName.search("Oricorio")!=-1){ //Oricorio
    return "Oricorio";
  }
  else if(pokeName.search("Minior")!=-1){ //Minior
    return "Minior";
  }
  else if(pokeName.search("Necrozma")!=-1){ //Necrozma
    return "Necrozma";
  }
  else if(pokeName.search("Eiscue")!=-1){ //Eiscue
    return "Eiscue Ice";
  }
  else if(pokeName.search("Zacian")!=-1){ //Zacian
    return "Zacian";
  }
  else if(pokeName.search("Zamazenta")!=-1){ //Zamazenta
    return "Zamazenta";
  }
  //Spelling
  else if(pokeName.search("Farfetch'd")!=-1){ //Farfetch'd
    return "Farfetchd";
  }
  else if(pokeName.search("Mr. Mime")!=-1){ //Mr. Mime
    if(pokeName.search("Galar")!=-1){
      return "Mr Mime Galar"
    }
    return "Mr Mime";
  }
  else if(pokeName.search("Mime Jr.")!=-1){ //Mime Jr.
    return "Mime Jr";
  }
  else if(pokeName.search("Mr. Rime")!=-1){ //Mr. Rime
    return "Mr Rime";
  }

  //Others (Somehow) - Galarian -> Galar
  else if(pokeName.search("Galar")!=-1){
    pokeName=pokeName.substr(0,pokeName.length-10);
    pokeName+="Galar"
    return pokeName
  }
  else if(pokeName.search("Alolan")!=-1){
    pokeName=pokeName.substr(0,pokeName.length-8);
    pokeName+="Alola"
    return pokeName
  }
  else if(pokeName.search("Aevium")!=-1){
    if(pokeName.search("Sandygast")!=-1){ //Aevium Sandygast
      if(pokeName.search("Rock")!=-1){
        return "Sandygast Aevia Rock"
      }
      else if(pokeName.search("Fire")!=-1){
        return "Sandygast Aevia Fire"
      } else {
        return "Sandygast Aevia Ice"
      }
    }
    else if(pokeName.search("Palossand")!=-1){ //Aevium Palossand
      if(pokeName.search("Rock")!=-1){
        return "Palossand Aevia Rock"
      }
      else if(pokeName.search("Fire")!=-1){
        return "Palossand Aevia Fire"
      } else {
        return "Palossand Aevia Ice"
      }
    }
    else if(pokeName.search("Paras")!=-1){ //Paras
      return "Paras Aevia"
    }
    else if(pokeName.search("Parasect")!=-1){ //Parasect
      return "Parasect Aevia"
    }
    pokeName=pokeName.substr(0,pokeName.length-8);
    pokeName+="Aevia"
    return pokeName
  }
  return pokeName;
} //get exception for moveset

function autocomplete(inp, arr, alltext) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocompleteTest-list");
        a.setAttribute("class", "autocompleteTest-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if(arr[i].toUpperCase().search(val.toUpperCase())!=-1){
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                readText(alltext);
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocompleteTest-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    input.addEventListener('keyup', function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          document.getElementById("textInputButton").click();
        }
      });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocompleteTest-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocompleteTest-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocompleteTest-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
} //For autocomplete in the text field
