/*
var obj=require('./Encounters/SpecificLists/East Gearen City - Left [Grass-Day].json');
var x=obj[0].data
console.log(x)
x=JSON.parse(x)
console.log(x[0].PokemonID);
*/
/*
var pathLoc='East Gearen City - Left'
var EncounterType = 'Grass';
var EncounterTime = 'Day';
var fileLocation = './Encounters/SpecificLists/' + pathLoc + ' [' + EncounterType + '-' + EncounterTime + '].json';
fileLocation = './Encounters/SpecificLists/East Gearen City - Left [Grass-Day].json';
var curEncounters = require(fileLocation);
curEncounters = curEncounters[0].data;
curEncounters = JSON.parse(curEncounters)
console.log(curEncounters[0].PokemonID)
*/
jQuery.getJSON('East Gearen City - Left [Grass-Day].txt',function(){
    
})
var result='[{\"PokemonID\":69,\"PokemonForm\":0,\"MinLevel\":3,\"MaxLevel\":5,\"EncounterPercent\":34},{\"PokemonID\":265,\"PokemonForm\":0,\"MinLevel\":3,\"MaxLevel\":5,\"EncounterPercent\":4},{\"PokemonID\":399,\"PokemonForm\":0,\"MinLevel\":3,\"MaxLevel\":5,\"EncounterPercent\":25},{\"PokemonID\":504,\"PokemonForm\":0,\"MinLevel\":3,\"MaxLevel\":5,\"EncounterPercent\":6},{\"PokemonID\":519,\"PokemonForm\":0,\"MinLevel\":3,\"MaxLevel\":5,\"EncounterPercent\":31}]'
result=JSON.parse(result);
console.log(result)
result=result[0];
console.log(result)