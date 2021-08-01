function showTrainerTable(idname, locCode){
    var buttonName=idname.concat("Button");
    var buttonChange=document.getElementById(buttonName);
    var tableElement=document.getElementById(idname);
    if(buttonChange.innerHTML=="Show Trainers"){
        buttonChange.innerHTML="Hide Trainers";
        tableElement.style.display="table"
    } else {
        buttonChange.innerHTML="Show Trainers";
        tableElement.style.display="none"
    }
}

function showHiddenTable(idname){
    var buttonName=idname.concat("Button");
    var buttonChange=document.getElementById(buttonName);
    var tableElement=document.getElementById(idname);
    if(buttonChange.innerHTML=="Show Hidden Items"){
        buttonChange.innerHTML="Hide Hidden Items";
        tableElement.style.display="table"
    } else {
        buttonChange.innerHTML="Show Hidden Items";
        tableElement.style.display="none"
    }    
}

function spoilerButton(spoilerName){
    if(document.getElementById(spoilerName).style.display=='none') {
        document.getElementById(spoilerName).style.display='inline-block'
    }
    else{
        document.getElementById(spoilerName).style.display='none'
    }
}

function scrollTop(){
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera  
}