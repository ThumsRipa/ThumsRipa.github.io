function shopsSet(shopIDNums, generalLocationNames){
    var shopHTMLLoc=document.getElementById("shopsHere");
    var fulltext="";
    var thisShop;
    var otherIDs=getGeneralLocation(generalLocationNames); //Add the other shops (All of East Gearen City, for example)
    for(var i=0; i<otherIDs.length;i++){
        shopIDNums.push(otherIDs[i]);
    }
    shopIDNums.sort(([a, b], [c, d]) => a - c);
    setShopSidebars(shopIDNums);
    for(var curShop=0; curShop<shopIDNums.length; curShop++){
        thisShop=walkthroughShops[shopIDNums[curShop][0]];
        fulltext+='<div id="'+thisShop[0][0]+'" class="EncounterPopup">';
        fulltext+='<span class="close" id="'+thisShop[0][0]+'Close">&times;</span><p class="encounterDetails" style="text-align:center;">'+thisShop[0][1]+'</p><br><table class="shopPopupContent"><tr><td class="shopheader">Item</td><td class="shopheader">Price</td></tr>';
        if(thisShop[shopIDNums[curShop][1]]=="All"){
            for (var curItem=0; curItem<thisShop[1].length; curItem++){
                fulltext+='<tr><td>'+thisShop[1][curItem][0]+'</td><td><img src="../../images/PokeDollar.png">'+thisShop[1][curItem][1]+'</td></tr>';
            }
        } else {
            for (var curItem=0; curItem<thisShop[shopIDNums[curShop][1]].length; curItem++){
                fulltext+='<tr><td>'+thisShop[1][thisShop[shopIDNums[curShop][1]][curItem]][0]+'</td><td><img src="../../images/PokeDollar.png">'+thisShop[1][thisShop[shopIDNums[curShop][1]][curItem]][1]+'</td></tr>';
            }
        }
        fulltext+='</table></div>'
    }
    if(shopHTMLLoc!=null){
        shopHTMLLoc.innerHTML=fulltext;
    }
}

function getGeneralLocation(generalLocationNames){
    var moreIDNums=[]; //Compiled IDs
    var soloIDNums=[]; //Each area's ID
    for(var curLoc=0; curLoc<generalLocationNames.length; curLoc++){
        curLocName=generalLocationNames[curLoc];
        for(var checkLoc=0; checkLoc<locationShopCodes.length; checkLoc++){
            if(locationShopCodes[checkLoc][0]==curLocName){
                curLocIDs=locationShopCodes[checkLoc][1];
                for(var curID=0; curID<curLocIDs.length; curID++){
                    soloIDNums=[];
                    soloIDNums.push(curLocIDs[curID]);
                    soloIDNums.push(2)
                    moreIDNums.push(soloIDNums);
                }
                break;
            }
        }
    }
    return moreIDNums;
}

function setShopSidebars(shopIDNums){
    var shopSidebar=document.getElementById("shopSidebarContent");
    fullSidetext="";
    for(var curShop=0; curShop<shopIDNums.length; curShop++){
        thisShop=walkthroughShops[shopIDNums[curShop][0]];
        fullSidetext+='<a href="javascript:void(0)" class="encounterDetailsSidebar" id="'+thisShop[0][0]+'TxT">'+thisShop[0][1]+'</a><br><br>'
    }
    shopSidebar.innerHTML=fullSidetext;
}

/*
      <div id="GearenLabShop" class="EncounterPopup">
        <span class="close" id="GearenLabShopClose">&times;</span>
        <p class="encounterDetails" style="text-align:center;">
          Gearen Lab Mart
        </p>
        <br>
        <table class="shopPopupContent">
          <tr>
            <td class="shopheader">
              Item
            </td>
            <td class="shopheader">
              Price
            </td>
          </tr>

          <tr><td>Potion</td><td><img src="../../images/PokeDollar.png">300</td></tr>
          <tr><td>Antidote</td><td><img src="../../images/PokeDollar.png">100</td></tr>
          <tr><td>Poke Ball</td><td><img src="../../images/PokeDollar.png">200</td></tr>
        </table>
      </div>
*/

var locationShopCodes=[
    ['East Gearen City', [0,1,2,3,4,7,8]],
    ['Gearen Sewers', [9]],
    ['Sheridan Village',[11]],
    ['Route 3',[13,14]],
]

var walkthroughShops=[
    [
        ['GearenLabShop','Gearen Lab Mart'],
        [
            ['Potion',300],
            ['Antidote',100],
            ['Poke Ball',100],
        ],
        ['All'], //At All times
    ], //Gearen Lab Shop [0000]

    [
        ['MarketTopLeft','East Gearen Market - Top Left Vendor'],
        [
            ['Poke Ball',100],
            ['Potion',300],
            ['Gourmet Treat',1500],
            ['Repel',350],
            ['Reverse Candy',50],
        ],
        ['All'], //At All times
    ], //Marketplace - Top Left [0001]

    [
        ['MarketBottomLeft','East Gearen Market - Bottom Left Vendor'],
        [
            ['Burn Heal',250],
            ['Ice Heal',250],
            ['Antidote',100],
            ['Awakening',250],
            ['Paralyze Heal',200],
        ],
        ['All'], //At All times
    ], //Marketplace - Bottom Left [0002]

    [
        ['MarketBottomMiddle','East Gearen Market - Bottom Middle Vendor<br>Weekdays, 11:00am-8:00pm'],
        [
            ['Reverse Candy',50],
            ['Soda Pop',300],
        ],
        ['All'], //At All times
    ], //Marketplace - Bottom Middle [0003]

    [
        ['MarketBottomRight','East Gearen Market - Bottom Right Vendor<br>Weekdays, 11:00am-8:00pm'],
        [
            ['Black Flute',400],
            ['White Flute',400],
        ],
        ['All'], //At All times
    ], //Marketplace - Bottom Right [0004]

    [
        ['BerryEmporium','Shopping Emporium - Berry Emporium'],
        [
            ['Oran Berry',200],
            ['Pecha Berry',300],
            ['Sitrus Berry',750],
            ['Chesto Berry',300],
            ['Occa Berry',750],
        ],
        [0,1], //Initial (2)
        [0,1,2,3], //After 5 badges
        [0,1,2,3,4], //After 8 badges
    ], //Berry Emporium [0005]

    [
        ['PokeballShop','Shopping Emporium - Pokeball Shop'],
        [
            ['Heavy Ball',300],
            ['Moon Ball',300],
            ['Love Ball',300],
            ['Fast Ball',300],
            ['Nest Ball',1000],
            ['Net Ball',1000],
            ['Timer Ball',1000],
            ['Dive Ball',1000],
            ['Friend Ball',300],
        ],
        [0,1], //Initial (2)
        [0,1,2,3], //After Badge 1
        [0,1,2,3,4], //After Badge 2
        [0,1,2,3,4,5], //After Badge 3
        [0,1,2,3,4,5,6,7], //After Badge 5
        [0,1,2,3,4,5,6,7,8], //After Badge 6 & Neo
    ], //Pokeball Emporium [0006]

    [
        ['CasinoShop','Chrisola Hotel - Casino Shop'],
        [
            ['TM70 - Flash','1000 Coins'],
            ['TM10 - Hidden Power','4000 Coins'],
            ['TM90 - Substitute','7000 Coins'],
        ],
        ['All'], //Initial
    ], //Chrisola Hotel - Casino Shop [0007]

    [
        ['APShop','Chrisola Hotel - AP Shop'],
        [
            ['HP Up','3 AP'],
            ['PP Up','3 AP'],
            ['Protein','3 AP'],
            ['Iron','3 AP'],
            ['Calcium','3 AP'],
            ['Zinc','3 AP'],
            ['Carbos','3 AP'],
            ['Rare Candy','10 AP'],
            ['Attack Card','10 AP'],
            ['Defense Card','10 AP'],
            ['SPAttack Card','10 AP'],
            ['SPDefense Card','10 AP'],
            ['Golden Axe','15 AP'],
            ['Golden Hammer','15 AP'],
            ['Golden Surfboard','20 AP'],
            ['Golden Gauntlet','25 AP'],
            ['Golden Scuba Gear','25 AP'],
            ['Golden Wings','25 AP'],
            ['Golden Jetpack','25 AP'],
            ['Golden Driftboard','25 AP'],
            ['Golden Claws','25 AP'],
            ['Exp. All','30 AP'],
        ],
        ['All'], //Initial
    ], //Chrisola Hotel - AP Shop [0008]

    [
        ['Sewerk','Gearen Sewers - Sewerk'],
        [['Chinese Food',300],],
        ['All'],
    ], //Gearen Sewers [0009]

    [
        ['KecleonShop','Route 2 Kecleon Shop'],
        [
            ['Poke Ball',300],
            ['Potion',300],
            ['Antidote',100],
            ['Gourmet Treat',1500],
            ['Repel',350],
        ],
        ['All'],
    ], //Kecleon Shop Route 2 [0010]

    [
        ['SheridanShop','Sheridan Village Shop'],
        [
            ['Poke Ball',300],
            ['Great Ball',500],
            ['Potion',300],
            ['Super Potion',700],
            ['Ice Heal',250],
            ['Antidote',100],
            ['Gourmet Treat',1500],
            ['Super Repel',500],
            ['Reverse Candy',50],
        ],
        ['All'],
    ], //Sheridan Village Shop [0011]

    [
        ['VillageDrinks','Sheridan Village Drinks<br>Mon, Wed, Fri, Sun Mornings (4:00am-11:00am)'],
        [
            ['Berry Juice',100],
            ['Fresh Water',200],
            ['Lemonade',350],
            ['Moomoo Milk',500],
        ],
        [0], //Initial (2)
        [0,1], //After 2 Badges
        [0,1,2,3], //After 3 Badges
    ], //Sheridan Drinks [0012]

    [
        ['Route3UpperLeft','Route 3 - Upper Left Vendor<br>Daytime Only'],
        [
            ['Reverse Candy',50],
            ['Sachet',1000],
            ['Soda Pop',300],
            ['Sweet Heart',100],
            ['Red Nectar',550],
            ['Whipped Dream',1000],
        ],
        ['All'], //Initial
    ], //Route 3 Upper Left [0013]

    [
        ['Route3UpperRight','Route 3 - Upper Right Vendor<br>Daytime Only'],
        [
            ['Vanilla Ice Cream<br>Heals for 30 HP',400],
            ['Choc Ice Cream<br>Heals for 70 HP',600],
            ['Berry Ice Cream<br>Heals for 90 HP',800],
        ],
        ['All'], //Initial
    ], //Route 3 Upper Right [0014]

    [
        ['GoldenleafMart','Goldenleaf Town Pokemart'],
        [
            ['Great Ball',600],
            ['Super Potion',700],
            ['Gourmet Treat',2000],
            ['Repel',350],
            ['Super Repel',500],
            ['Escape Rope',550],
        ],
        ['All'],
    ], //Goldenleaf Pokemart [0015]

    [
        ['LostCampAndrew','Lost Camp Andrew'],
        [
            ['Pomeg Berry',600],
            ['Kelpsy Berry',600],
            ['Qualot Berry',600],
            ['Hondew Berry - After 1 Upgrade',600],
            ['Grepa Berry - After 1 Upgrade',600],
            ['Tamato Berry - After 2 Upgrades',600],
        ],
        ['All'],
    ], //Lost Camp Andrew [0016]

    [
        ['LostCampMatthew','Lost Camp Matthew'],
        [
            ['Water Stone',2100],
            ['Fire Stone',2100],
            ['Leaf Stone',2100],
        ],
        ['All'],
    ], //Lost Camp Matthew [0017]

    [
        ['XenBattleshipStore','Xen Battleship Store'],
        [
            ['Poke Ball',200],
            ['Great Ball',600],
            ['Potion',300],
            ['Super Potion',700],
            ['Antidote',100],
            ['Ice Heal',250],
            ['Gourmet Treat',2000],
            ['Super Repel',500],
            ['Reverse Candy',50],
        ],
        ['All'],
    ], //Xen Battleship Store [0018]

    [
        ['TerajumaShoreStore','Terajuma Island Stores'],
        [
            ['Poke Ball',200],
            ['Great Ball',600],
            ['Potion',300],
            ['Super Potion',700],
            ['Antidote',100],
            ['Ice Heal',250],
            ['Gourmet Treat',2000],
            ['Super Repel',500],
            ['Reverse Candy',50],
            ['Spice Powder',850],
        ],
        ['All'], //Shore Store
        [0,1,2,3,4,5,6,7,8] //Jungle Store
    ], //Terajuma Stores [0019]
]

/*
      <div id="KecleonShop" class="EncounterPopup">
        <span class="close" id="KecleonShopClose">&times;</span>
        <p class="encounterDetails" style="text-align:center;">
          Kecleon Shop
        </p>
        <br>
        <table class="shopPopupContent">
          <tr>
            <td class="shopheader">
              Item
            </td>
            <td class="shopheader">
              Price
            </td>
          </tr>

          <tr><td>Poke Ball</td><td><img src="../../images/PokeDollar.png">200</td></tr>
          <tr><td>Potion</td><td><img src="../../images/PokeDollar.png">300</td></tr>
          <tr><td>Antidote</td><td><img src="../../images/PokeDollar.png">100</td></tr>
          <tr><td>Gourmet Treat</td><td><img src="../../images/PokeDollar.png">1500</td></tr>
          <tr><td>Repel</td><td><img src="../../images/PokeDollar.png">350</td></tr>
        </table>
      </div>
*/