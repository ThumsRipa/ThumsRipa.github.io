function globalrunOnLoad(badgeNum, fieldType){ //On webpage load
    addSidebarDropdowns(); //Add Left Sidebar Dropdowns
    setRightSideNavOnLoad(badgeNum, fieldType); //Set up the left and right sidebars and dropdowns
    loadSidebars(); //Setup the left side and walkthrough onclicks
}

function overviewOnLoad(){
  setRightSideNavOnLoad("","")
  var modal=document.getElementById("blankSidebar");
  modal.style.width="230px"
}

function addSidebarDropdowns(){ // Add Dropdowns to Left Sidebar
    var modal=document.getElementsByClassName("trainerSidebar");
    //For Walkthrough
    for (var i = 0; i < modal.length; i++) {
        if(modal[i].id=='mapSidebarContent'){
            modal[i].innerHTML+=`
            <div class="sidebarDropdown">
            <button class=sidebarDropdownButton>Maps</button>
                <div class="sidebarDropdownContent">
                  <button class="sidebarDropdownSel1" onclick="popSidebar('encounterSidebarContent');">Encounters</button><br>
                  <button class="sidebarDropdownSel2" onclick="popSidebar('shopSidebarContent');">Shops</button>
                  <button class="sidebarDropdownSel3" onclick="popSidebar('fieldEffects');">Field Effects</button>
                </div>
            </div>  
            `
        }
        else if(modal[i].id=='encounterSidebarContent'){
            modal[i].innerHTML+=`
            <div class="sidebarDropdown">
            <button class=sidebarDropdownButton>Encounters</button>
                <div class="sidebarDropdownContent">
                  <button class="sidebarDropdownSel1" onclick="popSidebar('mapSidebarContent');">Maps</button><br>
                  <button class="sidebarDropdownSel2" onclick="popSidebar('shopSidebarContent');">Shops</button>
                  <button class="sidebarDropdownSel3" onclick="popSidebar('fieldEffects');">Field Effects</button>
                </div>
            </div>
            `
        }
        else if(modal[i].id=='shopSidebarContent'){
            modal[i].innerHTML+=`
            <div class="sidebarDropdown">
            <button class=sidebarDropdownButton>Shops</button>
                <div class="sidebarDropdownContent">
                  <button class="sidebarDropdownSel1" onclick="popSidebar('mapSidebarContent');">Maps</button><br>
                  <button class="sidebarDropdownSel2" onclick="popSidebar('encounterSidebarContent');">Encounters</button>
                  <button class="sidebarDropdownSel3" onclick="popSidebar('fieldEffects');">Field Effects</button>
                </div>
            </div>
            `
        }
        else if(modal[i].id=='fieldEffects'){
          modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton>Field Effects</button>
              <div class="sidebarDropdownContent">
                <button class="sidebarDropdownSel1" onclick="popSidebar('mapSidebarContent');">Maps</button><br>
                <button class="sidebarDropdownSel2" onclick="popSidebar('encounterSidebarContent');">Encounters</button>
                <button class="sidebarDropdownSel3" onclick="popSidebar('shopSidebarContent');">Shops</button>
              </div>
          </div>
          `
      }
    }

    //For Field Effects
    for (var i = 0; i < modal.length; i++) {
      if(modal[i].id=='ElementalFields'){
          modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton><a class="topDropField" href="FieldEffects-Elemental.html">Elemental Fields</a></button>
              <div class="sidebarDropdownContent">
                <button class="sidebarDropdownSel1" onclick="popSidebar('TelluricFields');">Telluric Fields</button><br>
                <button class="sidebarDropdownSel2" onclick="popSidebar('SyntheticFields');">Synthetic Fields</button>
                <button class="sidebarDropdownSel3" onclick="popSidebar('MagicalFields');">Magical Fields</button>
              </div>
          </div>  
          `
      }
      else if(modal[i].id=='TelluricFields'){
          modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton><a class="topDropField" href="FieldEffects-Telluric.html">Telluric Fields</a></button>
              <div class="sidebarDropdownContent">
              <button class="sidebarDropdownSel1" onclick="popSidebar('ElementalFields');">Elemental Fields</button><br>
              <button class="sidebarDropdownSel2" onclick="popSidebar('SyntheticFields');">Synthetic Fields</button>
              <button class="sidebarDropdownSel3" onclick="popSidebar('MagicalFields');">Magical Fields</button>
              </div>
          </div>
          `
      }
      else if(modal[i].id=='SyntheticFields'){
          modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton><a class="topDropField" href="FieldEffects-Synthetic.html">Synthetic Fields</a></button>
              <div class="sidebarDropdownContent">
              <button class="sidebarDropdownSel1" onclick="popSidebar('ElementalFields');">Elemental Fields</button><br>
              <button class="sidebarDropdownSel2" onclick="popSidebar('TelluricFields');">Telluric Fields</button>
              <button class="sidebarDropdownSel3" onclick="popSidebar('MagicalFields');">Magical Fields</button>
              </div>
          </div>
          `
      }
      else if(modal[i].id=='MagicalFields'){
        modal[i].innerHTML+=`
        <div class="sidebarDropdown">
        <button class=sidebarDropdownButton><a class="topDropField" href="FieldEffects-Magical.html">Magical Fields</a></button>
            <div class="sidebarDropdownContent">
              <button class="sidebarDropdownSel1" onclick="popSidebar('ElementalFields');">Elemental Fields</button><br>
              <button class="sidebarDropdownSel2" onclick="popSidebar('TelluricFields');">Telluric Fields</button>
              <button class="sidebarDropdownSel3" onclick="popSidebar('SyntheticFields');">Synthetic Fields</button>
            </div>
        </div>
        `
      }
    }

    //For MapEvents
    for (var i = 0; i < modal.length; i++) {
      if(modal[i].id=='FloriaIsland'){
        modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton>Floria Island</button>
              <div class="sidebarDropdownContent">
                <button class="sidebarDropdownSel1" onclick="popSidebar('TerajumaIsland');">Terajuma Island</button><br>
                <button class="sidebarDropdownSel2" onclick="popSidebar('AeviumPast');">Aevium (Past)</button>
                <button class="sidebarDropdownSel3" onclick="popSidebar('TerrialIsland');">Terrial Island</button>
                <button class="sidebarDropdownSel4" onclick="popSidebar('Badlands');">Badlands</button>
              </div>
          </div>  
        `
      }
      else if(modal[i].id=='TerajumaIsland'){
        modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton>Terajuma Island</button>
              <div class="sidebarDropdownContent">
                <button class="sidebarDropdownSel1" onclick="popSidebar('FloriaIsland');">Floria Island</button><br>
                <button class="sidebarDropdownSel2" onclick="popSidebar('AeviumPast');">Aevium (Past)</button>
                <button class="sidebarDropdownSel3" onclick="popSidebar('TerrialIsland');">Terrial Island</button>
                <button class="sidebarDropdownSel4" onclick="popSidebar('Badlands');">Badlands</button>
              </div>
          </div>  
        `
      }
      else if(modal[i].id=='AeviumPast'){
        modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton>Aevium (Past)</button>
              <div class="sidebarDropdownContent">
                <button class="sidebarDropdownSel1" onclick="popSidebar('FloriaIsland');">Floria Island</button><br>
                <button class="sidebarDropdownSel2" onclick="popSidebar('TerajumaIsland');">Terajuma Island</button>
                <button class="sidebarDropdownSel3" onclick="popSidebar('TerrialIsland');">Terrial Island</button>
                <button class="sidebarDropdownSel4" onclick="popSidebar('Badlands');">Badlands</button>
              </div>
          </div>  
        `
      }
      else if(modal[i].id=='TerrialIsland'){
        modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton>Terrial Island</button>
              <div class="sidebarDropdownContent">
                <button class="sidebarDropdownSel1" onclick="popSidebar('FloriaIsland');">Floria Island</button><br>
                <button class="sidebarDropdownSel2" onclick="popSidebar('TerajumaIsland');">Terajuma Island</button>
                <button class="sidebarDropdownSel3" onclick="popSidebar('AeviumPast');">Aevium (Past)</button>
                <button class="sidebarDropdownSel4" onclick="popSidebar('Badlands');">Badlands</button>
              </div>
          </div>  
        `
      }
      else if(modal[i].id=='Badlands'){
        modal[i].innerHTML+=`
          <div class="sidebarDropdown">
          <button class=sidebarDropdownButton>Badlands</button>
              <div class="sidebarDropdownContent">
                <button class="sidebarDropdownSel1" onclick="popSidebar('FloriaIsland');">Floria Island</button><br>
                <button class="sidebarDropdownSel2" onclick="popSidebar('TerajumaIsland');">Terajuma Island</button>
                <button class="sidebarDropdownSel3" onclick="popSidebar('AeviumPast');">Aevium (Past)</button>
                <button class="sidebarDropdownSel4" onclick="popSidebar('TerrialIsland');">Terrial Island</button>
              </div>
          </div>  
        `
      }
    }
}

function setRightSideNavOnLoad(badgeNum, fieldType){ //Set Both Left and Right Sidebars
    setSideNav(fieldType);
    setDropDowns(); //Set Rightside Dropdowns
    if(badgeNum!==''){
      dropDownNav(badgeNum); //Auto Dropdown the correct badge
    }
}

function setSideNav(fieldType) { //Set Right Walkthrough Navigation and Open to Encounters on the Left
  rightSideNav=document.getElementById("rightSidebar");
  rightSideNav.innerHTML=`
    <div class="separateSet">
      <div class="badgeNumber">
        <a href="../Prologue/Prologue.html" class="subTitle">Prologue</a>
      </div>
    </div>
      
    <p class="sidebarBreak"></p>
    <div class="separateSet">
    <div class:"arrowParent"><div class="downArrow"></div></div>
      <div class="badgeNumber" id="FirstTxT">First Badge</div>
      <div class="collabsibleRightSidebar" id="First">
        <a href="../Chapter1/OceanaPier-FirstPokemon.html">
          <span class="subTitle">Your First Pokemon</span>
        </a>
        <a href="../Chapter1/EastGearenCity-1.html">
          <span class="subTitle">East Gearen City</span>
        </a>
        <a href="../Chapter1/EastGearenCity-2.html">
          <span class="subTitle">East Gearen City (Continued)</span>
        </a>
        <a href="../Chapter1/GearenSewers.html">
          <span class="subTitle">The Abandoned Sewers</span>
        </a>
        <a href="../Chapter1/Route1-Goldenwood.html">
          <span class="subTitle">Route 1 & Goldenwood Forest</span>
        </a>
        <a href="../Chapter1/GoldenwoodForest-2.html">
          <span class="subTitle">Goldenwood Forest (Continued)</span>
        </a>
        <a href="../Chapter1/EastGearenCity-3.html">
          <span class="subTitle">East Gearen City - Second Visit</span>
        </a>
        <a href="../Chapter1/EastGearenCitySidequests.html">
          <span class="subTitle">East Gearen City - Sidequests</span>
        </a>
        <a href="../Chapter1/EastGearenCityGym.html">
          <span class="subTitle">East Gearen City Gym</span>
        </a>
      </div>
    </div>
  
    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="SecondTxT">Second Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Second">
        <a href="../Chapter2/AfterVenam.html">
          <span class="subTitle">After the First Badge</span>
        </a>
        <a href="../Chapter2/Route2.html">
          <span class="subTitle">Route 2</span>
        </a>
        <a href="../Chapter2/AmethystCave.html">
          <span class="subTitle">Amethyst Cave</span>
        </a>
        <a href="../Chapter2/SheridanVillageArena.html">
          <span class="subTitle">Sheridan Village & Arena</span>
        </a>
        <a href="../Chapter2/CaratosMountain.html">
          <span class="subTitle">Caratos Mountain</span>
        </a>
        <a href="../Chapter2/SheridanSidequests.html">
          <span class="subTitle">Sheridan Sidequests</span>
        </a>
        <a href="../Chapter2/SheridanGymLeader.html">
          <span class="subTitle">Sheridan Gym Battle</span>
        </a>
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="ThirdTxT">Third Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Third">
        <a href="../Chapter3/AfterKeta.html">
          <span class="subTitle">After the Third Gym</span>
        </a>
        <a href="../Chapter3/Route3PhasialCave.html">
          <span class="subTitle">Route 3 and Phasial Cave</span>
        </a>
        <a href="../Chapter3/MirageWoods.html">
          <span class="subTitle">Side Activity - Mirage Woods</span>
        </a>
        <a href="../Chapter3/Courtyard.html">
          <span class="subTitle">Chrysalis Courtyard</span>
        </a>
        <a href="../Chapter3/CourtyardGymLeader.html">
          <span class="subTitle">Chrysalis Courtyard Gym Leader</span>
        </a>
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="FourthTxT">Fourth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Fourth">
        <a href="../Chapter4/GoldenleafTown.html">
          <span class="subTitle">Goldenleaf Town</span>
        </a>
        <a href="../Chapter4/WispyPath.html">
          <span class="subTitle">Wispy Path</span>
        </a>
        <a href="../Chapter4/WispyTower.html">
          <span class="subTitle">Wispy Tower</span>
        </a>
        <a href="../Chapter4/SideActivity-GoldenwoodForest.html">
          <span class="subTitle">Side Activities - Goldenwood Forest Revisit</span>
        </a>
        <a href="../Chapter4/GoldenleafGym.html">
          <span class="subTitle">Goldenleaf Gym</span>
        </a>
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="FifthTxT">Fifth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Fifth">
        <a href="../Chapter5/WispyRuins.html">
          <span class="subTitle">Wispy Ruins</span>
        </a>
        <a href="../Chapter5/Route4.html">
          <span class="subTitle">Route 4</span>
        </a>
        <a href="../Chapter5/AkuwaTown.html">
          <span class="subTitle">Akuwa Town</span>
        </a>
        <a href="../Chapter5/SideActivities.html">
          <span class="subTitle">Side Activities</span>
        </a>
        <a href="../Chapter5/Blacksteeple.html">
          <span class="subTitle">Blacksteeple Castle</span>
        </a>
        <a href="../Chapter5/XenBattleship.html">
          <span class="subTitle">The Battleship</span>
        </a>
        <a href="../Chapter5/TerajumaIsland.html">
          <span class="subTitle">Terajuma Island</span>
        </a>
        <a href="../Chapter5/Badge5.html">
          <span class="subTitle">Terajuma Jungle Gym Battle</span>
        </a>
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="SixthTxT">Sixth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Sixth">
      <a href="../Chapter6/TerajumaJungle.html">
        <span class="subTitle">Terajuma Jungle</span>
      </a>
      <a href="../Chapter6/KakoriVillage.html">
        <span class="subTitle">Kakori Village</span>
      </a>
      <a href="../Chapter6/Side-SafariZone.html">
        <span class="subTitle">Side Activity - Safari Zone</span>
      </a>
      <a href="../Chapter6/Route5.html">
        <span class="subTitle">Route 5 & Valor Shore</span>
      </a>
      <a href="../Chapter6/SheridanWetlands.html">
        <span class="subTitle">Sheridan Wetlands</span>
      </a>
      <a href="../Chapter6/ShadowHeadquarters.html">
        <span class="subTitle">Shadow HQ</span>
      </a>
      <a href="../Chapter6/SideActivities-Overview.html">
        <span class="subTitle">Side Activities - Overview</span>
      </a>
      <a href="../Chapter6/SideActivities-Backtrack.html">
        <span class="subTitle">Side Activity - Backtracking with Surf</span>
      </a>
      <a href="../Chapter6/SideActivities-Route11Evergreen.html">
        <span class="subTitle">Side Activity - Route 11 and Evergreen Islands</span>
      </a>
      <a href="../Chapter6/SideActivities-KakoriHelpCenter.html">
        <span class="subTitle">Side Activity - Kakori Village Help Center</span>
      </a>
      <a href="../Chapter6/KakoriVillageGym.html">
        <span class="subTitle">Kakori Village Gym</span>
      </a>
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="SeventhTxT">Seventh Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Seventh">
      <a href="../Chapter7/Route6AquamarineCave.html">
        <span class="subTitle">Route 6 and Aquamarine Cave</span>
      </a>
      <a href="../Chapter7/TeilaResort.html">
        <span class="subTitle">Teila Resort</span>
      </a>
      <a href="../Chapter7/SideActivity-TypeNull.html">
        <span class="subTitle">Side Activity - Type: Null</span>
      </a>
      <a href="../Chapter7/KristilineTown.html">
        <span class="subTitle">Kristiline Town & Isle of Angels - Frozen</span>
      </a>
      <a href="../Chapter7/TowerOfTheolia.html">
        <span class="subTitle">Tower of Theolia - The Seventh Badge</span>
      </a>
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="EighthTxT">Eighth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Eighth">
      <a href="../Chapter8/KristilineTown-PostAngie.html">
        <span class="subTitle">Kristiline Town - Unfrozen</span>
      </a>
      <a href="../Chapter8/KristilineTownHelpCenter.html">
        <span class="subTitle">Side Activity - Kristiline Town Help Center</span>
      </a>
      <a href="../Chapter8/BacktrackRockClimb.html">
        <span class="subTitle">Side Activity - Backtracking with Rock Climb</span>
      </a>
      <a href="../Chapter8/CaratosMountain-Corrupted.html">
        <span class="subTitle">Caratos Mountain - Second Visit</span>
      </a>
      <a href="../Chapter8/GarufanRuins.html">
        <span class="subTitle">Garufan Ruins</span>
      </a>
      <a href="../Chapter8/ValorMountain.html">
        <span class="subTitle">Valor Mountain</span>
      </a>
      <a href="../Chapter8/TeilaResortGym.html">
        <span class="subTitle">Teila Resort Gym - The Eighth Badge</span>
      </a>
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="NinthTxT">Ninth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Ninth">
      
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="TenthTxT">Tenth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Tenth">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="EleventhTxT">Eleventh Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Eleventh">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="TwelfthTxT">Twelfth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Twelfth">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="ThirteenthTxT">Thirteenth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Thirteenth">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="FourteenthTxT">Fourteenth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Fourteenth">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="FifteenthTxT">Fifteenth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Fifteenth">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="SixteenthTxT">Sixteenth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Sixteenth">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="SeventeenthTxT">Seventeenth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Seventeenth">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="EighteenthTxT">Eighteenth Badge<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Eighteenth">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="EliteFourTxT">Elite Four<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="EliteFour">
      </div>
    </div>

    <p class="sidebarBreak"> </p>
      <div class="separateSet">
      <div class="badgeNumber" id="PostgameTxT">Postgame<div class:"arrowParent"><div class="downArrow"></div></div></div>
      <div class="collabsibleRightSidebar" id="Postgame">
      </div>
    </div>
  `

  if(!popSidebar('encounterSidebarContent')){
    if(!popSidebar(fieldType)){
      var fieldtypeID=fieldType.concat('Fields');
      popSidebar(fieldtypeID);
    }
  }

  resourceNav=document.getElementById("resourceSidebar");
  if(resourceNav!==null){
    resourceNav.innerHTML=`
      <div class="separateSet">
        <div class="badgeNumber">
          Other Resources
        </div>
      </div>
      <div class="separateSet">
        <div class="badgeNumber">
          <a href="../Information/FieldEffects.html" class="subTitle">Field Effect Guide</a>
        </div>
      </div>
      <div class="separateSet">
        <div class="badgeNumber">
          <a href="../Information/RejuvenationMaps.html" class="subTitle">All Maps</a>
        </div>
      </div>
      <div class="separateSet">
        <div class="badgeNumber">
          <a href="../Information/Pokedex.html" class="subTitle">Pokedex</a>
        </div>
      </div>
    `
  }
}

function popSidebar(idname){ //Close and open the correct sidebar
  var closetrainerSide=document.getElementsByClassName("trainerSidebar");
  for (var i = 0; i < closetrainerSide.length; i++) {
      closeNav(closetrainerSide[i].id);
  }
  var trainerSide=document.getElementById(idname);
  if(trainerSide!==null){
      trainerSide.style.width = "230px";
      return true;
  }
  return false;
}

function closeNav(idname) { //Close Sidebar
  document.getElementById(idname).style.width = "0";
}

function setDropDowns(){ //Set the dropdowns for the right side
    var dropdowns=document.getElementsByClassName("collabsibleRightSidebar");
    var dropdownTxTElement;
    var dropdownID;
    var dropdownTxT;
    for (var i = 0; i < dropdowns.length; i++) {
        dropdownID = dropdowns[i].id;
        dropdownTxT = dropdownID.concat('TxT');
        dropdownTxTElement=document.getElementById(dropdownTxT);
        dropdownTxTElement.onclick=function() {
            dropdownID = this.id.slice(0,-3);
            dropDownNav(dropdownID);
        }
        dropDownNav(dropdownID);
    }
}

function dropDownNav(badgeNum){ //Rightside dropdowns onclick function
    var dropdown=document.getElementById(badgeNum);
    var dropdownbadgeNumID=badgeNum.concat('TxT');
    var dropdownbadgeNumElement=document.getElementById(dropdownbadgeNumID);
    if(dropdown.style.display=='none'){
        dropdown.style.display='inherit'
        dropdownbadgeNumElement.style.borderRadius = "10px 10px 0px 0px"
    }
    else{
        dropdown.style.display='none'
        dropdownbadgeNumElement.style.borderRadius = "10px 10px 10px 10px"
    }
}

function loadSidebars(){ //Loop to load and set popups on click
    var modal = document.getElementsByClassName("TrainerPopup");
    var modalID;
    var textID;

    var modaltoOpen;

    for (var i = 0; i < modal.length; i++) {
        modalID = modal[i].id;
        popUpTrainer(modalID);
        modaltoOpen=document.getElementById(modalID);
        if(modaltoOpen!==null){
          modaltoOpen.style.display="none";
        }
    }

    modal = document.getElementsByClassName("encounterDetailsSidebar")

    for (var i = 0; i < modal.length; i++) {
        textID = modal[i].id;
        modalID = textID.slice(0,-3);
        popUpTrainer(modalID);
        modaltoOpen=document.getElementById(modalID);
        if(modaltoOpen!==null){
          modaltoOpen.style.display="none";
        }
    }
}

function popUpTrainer(idname){ //Set the popup on click
    // Get the modal
    var modal = document.getElementById(idname);

    var newtextid = idname.concat('TxT');
    var trainertext = document.getElementById(newtextid);
    if (trainertext==null){

    }
    else{
        trainertext.onclick = function(){
            var modal2 = document.getElementsByClassName("EncounterPopup")
            var Trainermodal = document.getElementsByClassName("TrainerPopup")
            for (var i = 0; i < modal2.length; i++) {
                if(modal2[i].style.display=="none"){
                } else {
                    modal2[i].style.display="none";
                }
            }
            for (var i = 0; i < Trainermodal.length; i++) {
                if(Trainermodal[i].style.display=="none"){
                } else {
                    Trainermodal[i].style.display="none";
                }
            }
            modal.style.display = "block";
        }
    }

    var walkthroughText = idname.concat('Name');
    var walkthroughBattle = document.getElementById(walkthroughText);
    if (walkthroughBattle==null){

    }
    else{
        walkthroughBattle.onclick = function(){
            var modal2 = document.getElementsByClassName("EncounterPopup")
            var Trainermodal = document.getElementsByClassName("TrainerPopup")
            for (var i = 0; i < modal2.length; i++) {
                if(modal2[i].style.display=="none"){
                } else {
                    modal2[i].style.display="none";
                }
            }
            for (var i = 0; i < Trainermodal.length; i++) {
                if(Trainermodal[i].style.display=="none"){
                } else {
                    Trainermodal[i].style.display="none";
                }
            }
            modal.style.display = "block";
        }
    }

    var newtoClose = idname.concat('Close');
    var toClose = document.getElementById(newtoClose);
    if(toClose!==null){
      toClose.onclick = function(){
        modal.style.display = "none"
      }
    }
}

function escapeToClose(){ //Close Popups when Escape key is hit
  var modal = document.getElementsByClassName("EncounterPopup")
  var Trainermodal = document.getElementsByClassName("TrainerPopup")
  //var sideBars = document.getElementsByClassName("trainerSidebar")
  //var noPopups;
  //noPopups=true;
  for (var i = 0; i < modal.length; i++) {
      if(modal[i].style.display=="none"){
      } else {
          modal[i].style.display="none";
          noPopups=false;
      }
  }
  for (var i = 0; i < Trainermodal.length; i++) {
      if(Trainermodal[i].style.display=="none"){
      } else {
          Trainermodal[i].style.display="none";
          noPopups=false;
      }
  }
  /*
  if(noPopups){
      for (var i = 0; i < sideBars.length; i++) {
          sideBars[i].style.width="0";
      }
  }
  */
}