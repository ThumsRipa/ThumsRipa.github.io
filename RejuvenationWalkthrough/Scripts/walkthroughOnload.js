function walkthroughOnload(areaName){

}

function getAreaCode(areaName){
    for(var i=0; i<AreaCodes.length; i++){
        if(AreaCodes[i][0]==areaName){
            return i;
        }
    }
}

var AreaCodes=[
    ['East Gearen City', []]
]