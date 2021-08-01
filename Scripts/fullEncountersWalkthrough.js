function encountersCreate(pageEncounters, eventNumbers){
    makeSidebars(pageEncounters)
    makePopups(pageEncounters,eventNumbers)  
}

function makeSidebars(pageEncounters){
    outputLoc=document.getElementById("encounterSidebarContent")
    fulltext=''
    testExistenceLoc=0
    testExistenceType=0
    Loop1:
    for(curLoc=0; curLoc<pageEncounters.length;curLoc++){
        testExistenceLoc=findEncIndex(AllEncounters,pageEncounters[curLoc][0])
        if(testExistenceLoc==-1){
            continue Loop1;
        }
        AllEncountersCurrentLoc=returnHashedArray(testExistenceLoc);
        curLocLoop=pageEncounters[curLoc]
        Loop2:
        for(curType=0; curType<curLocLoop[1].length; curType++){
            testExistenceType=findEncTypeIndex(AllEncountersCurrentLoc[0][1],curLocLoop[1][curType])
            if(testExistenceType==-1){
                continue Loop2;
            }
            shortText=curLocLoop[0].replaceAll(' ','')+curLocLoop[1][curType].replaceAll(' ','')+'TxT'
            fulltext+='<a href="javascript:void(0)" class="encounterDetailsSidebar" id="'+shortText+'">'
            fulltext+=curLocLoop[0]+' '+curLocLoop[1][curType]+'</a><br><br>'
        }
    }
    outputLoc.innerHTML=fulltext
}

function makePopups(pageEncounters,eventNumbers){
    outputLoc=document.getElementById("encountersHere")
    fulltext=''
    eventCurNum=0;
    Loop1:
    for(curLoc=0; curLoc<pageEncounters.length;curLoc++){
        testExistenceLoc=findEncIndex(AllEncounters,pageEncounters[curLoc][0])
        if(testExistenceLoc==-1){
            continue Loop1;
        }
        //AllEncountersCurrentLoc=AllEncounters[testExistenceLoc]
        AllEncountersCurrentLoc=returnHashedArray(testExistenceLoc);
        curLocLoop=pageEncounters[curLoc]
        Loop2:
        for(curType=0; curType<curLocLoop[1].length; curType++){
            testExistenceType=findEncTypeIndex(AllEncountersCurrentLoc[0][1],curLocLoop[1][curType])
            if(testExistenceType==-1){
                continue Loop2;
            }
            AllEncountersCurrentType=AllEncountersCurrentLoc[testExistenceType+1]
            shortText=curLocLoop[0].replaceAll(' ','')+curLocLoop[1][curType].replaceAll(' ','')
            fulltext+=encounterPopStart[0]+shortText+encounterPopStart[1]+shortText+encounterPopStart[2]+curLocLoop[0]+' '+curLocLoop[1][curType]+encounterPopStart[3]+encounterPopStart[4]
            for(encounterMethod=0;encounterMethod<AllEncountersCurrentType[1][0];encounterMethod++){
                fulltext+='<td>'+AllEncountersCurrentType[1][1][encounterMethod]+'</td>'
            }
            fulltext+='</tr>'
            fulltext+=makePokemon(AllEncountersCurrentType,eventNumbers[eventCurNum])
            if(AllEncountersCurrentType[0]=="Events"){
                eventCurNum++
            }
            fulltext+='</table></div>'
        }
    }
    outputLoc.innerHTML=fulltext
}

function makePokemon(pokemonList, eventNum){
    pokemonText=""
    if(pokemonList[0]=='Shadows'){
        actualPokList=pokemonList[2]
        for(curPok=0;curPok<actualPokList.length;curPok++){
            if(actualPokList[curPok][0][0].indexOf("_")==-1){
                pokNum=parseInt(actualPokList[curPok][0][0])
                pokForm=0
            }
            else{
                pokNum=parseInt(actualPokList[curPok][0][0].split("_")[0])
                pokForm=parseInt(actualPokList[curPok][0][0].split("_")[1])
            }
            thisPokemon=BattlePokedex[pokNum-1][pokForm+7]
            pokemonText+='<tr><th class="wildPokemonTooltipPosition"><span class="wildPokemonName">'
            pokemonText+='<span class="type1" style="background-color: var(--typeShadow);"></span>'
            pokemonText+='<img class="encounterPokemonImage" src="../../images/PokemonSprites/'+actualPokList[curPok][0][0]+'_shadow.png"><br>'
            pokemonText+='Shadow '+thisPokemon[0]+'<br>'+actualPokList[curPok][0][1]+'</span></th>'
            pokemonText+='<td>'+actualPokList[curPok][1]+'</td><td>'+actualPokList[curPok][2]+'</td></tr>'
        }
    }
    else{
        actualPokList=pokemonList[2]
        LoopCurPok:
        for(curPok=0;curPok<actualPokList.length;curPok++){
            if(pokemonList[0]=='Events'){
                if(actualPokList[curPok][3]>eventNum){
                    continue LoopCurPok;
                }
            }
            if(actualPokList[curPok][0][0].indexOf("_")==-1){
                pokNum=parseInt(actualPokList[curPok][0][0])
                pokForm=0
            }
            else{
                pokNum=parseInt(actualPokList[curPok][0][0].split("_")[0])
                pokForm=parseInt(actualPokList[curPok][0][0].split("_")[1])
            }
            thisPokemon=BattlePokedex[pokNum-1][pokForm+7]
            pokemonText+='<tr><th class="wildPokemonTooltipPosition"><span class="wildPokemonName">'
            //Set Types Below
            pokemonText+='<span class="type1" style="background-color: var(--type'+thisPokemon[1][0]+');"></span>'
            if(thisPokemon[1].length==2){
                pokemonText+='<span class="type2" style="background-color: var(--type'+thisPokemon[1][1]+');"></span>'
            }
            if(actualPokList[curPok][0][0]=="5"){
                pokemonText+=""
            }
            //Set Image Below
            pokemonText+='<img class="encounterPokemonImage" src="../../images/PokemonSprites/'+actualPokList[curPok][0][0]+'.png"><br>'
            if(actualPokList[curPok][0].length==1){
                levels=''
            } else {
                levels='<br>'+actualPokList[curPok][0][1]
            }
            pokemonText+='#'+pokNum+' '+thisPokemon[0]+levels+'<span class="wildPokemonTooltip">'+pokemontooltips[pokNum-1][pokForm][actualPokList[curPok][2]]+'</span></span></th>'
            //Start Setting Encounter Rates & Info
            if(pokemonList[0]=='Grass' && pokemonList[1][0]!=1){ //Case Grass with more than 1 time of day
                colorLists=[]
                for(timeDay=0; timeDay<pokemonList[1][0]; timeDay++){
                    colorLists.push(getColorTime(pokemonList[1][1][timeDay]))
                }
                colorListsNum=0;
                for(encRate=0;encRate<pokemonList[1][0];encRate++){
                    if(actualPokList[curPok][1][encRate]=="0%"){
                        pokemonText+="<td>"+actualPokList[curPok][1][encRate]+"</td>"
                    } else {
                        pokemonText+='<td style="background-color: var(--'+colorLists[colorListsNum]+');">'+actualPokList[curPok][1][encRate]+'</td>'
                    }
                    colorListsNum=colorListsNum+1 % pokemonList[1][0]
                }
            } else if (pokemonList[0]=='Events'){ //Case Events
                pokemonText+="<td>"+actualPokList[curPok][1][0]+"</td>"
                colorSet=getColorTime(actualPokList[curPok][1][1])
                pokemonText+='<td style="background-color: var(--'+colorSet+');">'+actualPokList[curPok][1][1]+'</td>'
            } else if (pokemonList[0]=='Others') {
                colorLists=[]
                for(timeDay=0; timeDay<pokemonList[1][0]; timeDay++){
                    colorLists.push(getColorTime(pokemonList[1][1][timeDay]))
                }
                colorListsNum=0;
                for(encRate=0;encRate<pokemonList[1][0];encRate++){
                    if(actualPokList[curPok][1][encRate]=="0%"){
                        pokemonText+="<td>"+actualPokList[curPok][1][encRate]+"</td>"
                    } else {
                        pokemonText+='<td style="background-color: var(--'+colorLists[colorListsNum]+');">'+actualPokList[curPok][1][encRate]+'</td>'
                    }
                    colorListsNum=colorListsNum+1 % pokemonList[1][0]
                }
            } 
            else { //All Other Cases
                colorSet=getColor(pokemonList[0])
                for(encRate=0;encRate<pokemonList[1][0];encRate++){
                    if(actualPokList[curPok][1][encRate]=="0%"){
                        pokemonText+="<td>"+actualPokList[curPok][1][encRate]+"</td>"
                    } else {
                        pokemonText+='<td style="background-color: var(--'+colorSet+');">'+actualPokList[curPok][1][encRate]+'</td>'
                    }
                }
            }
            pokemonText+="</tr>"
        }
    }
    return pokemonText
}
//Getting the right colors
function getColor(colorType){
    if(colorType=='Fishing'){
        return "fishingAvailable"
    }
    else{
        return "alldayAvailable"
    }
}

function getColorTime(description){
    if(description.indexOf("Nighttime")!=-1){
        return "nightAvailable"
    } else if (description.indexOf("Night")!=-1){
        return "nightAvailable"
    } else if (description.indexOf("Daytime")!=-1){
        return "daytimeAvailable"
    } else if (description.indexOf("Morning")!=-1) {
        return "morningAvailable"
    } else if (description.indexOf("Rock Smash")!=-1){
        return "rocksmashAvailable"
    } else if (description.indexOf("Headbutt")!=-1){
        return "headbuttAvailable"
    }
    else {
        return "alldayAvailable"
    }
}

var encounterPopStart=[
    '<div id="', //ID
    '" class="EncounterPopup"><span class="close" id="', //Close ID
    'Close">&times;</span><p class="encounterDetails" style="text-align:center;">',//Encounter Name
    '</p><table class="encounterPopupContent">', 
    '<tr><th>Pokemon Name</th>', //Detail Columns (Loop)
]

/*
          <tr>
            <th class="wildPokemonTooltipPosition">
              <span class="wildPokemonName">
                <span class="type1" style="background-color: var(--typeNormal);"></span>
                <img class="encounterPokemonImage" src="../../images/PokemonSprites/293.png">
                <br>
                #293 Whismur
                <span class="wildPokemonTooltip">
                  Whismur as a Pokemon is not good. It has decent Attack and Special Attack, but it's Speed and Defenses are so low that it will often fall before getting a hit off. To add insult to injury, it's movepool is also very poor until it evolves into a Loudred. The good news is, it does evolve into Loudred early, at level 20, and once it has Uproar it can put dents into a lot of teams, even Ghost types if you manage to get one with the ability Scrappy. Loudred is weak against the second gym, which can cause problems, but if you can work around and manage to get Exploud then you have one of the few extremely powerful Boomburst users. It'll just take a while to get there.
                </span>
              </span>
            </th>
            <td>Route 1</td>
            <td style="background-color: var(--alldayAvailable);">Give Gourmet Treat</td>
          </tr>
*/