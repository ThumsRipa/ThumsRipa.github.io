var allquestions = JSON.parse(jeopardyQuestionList);

var allCategories = [
    ['Statistic Vocabulary', 'Data Classification and Collection', 'Sampling and Biases', 'Frequency Distributions', 'Graphs and Numerical Measures'],
    ['Probability Vocabulary', 'Basic Probability and Counting', 'Conditional Probability', 'Permutations and Combinations', '---'],
    ['Probability Distribution Vocabulary', 'Identifying and Calculating Discrete Distributions', 'Calculating Normal Distributions', 'Sampling Distribution & Central Limit Theorem', '---'],
];

var currentAnswer = '';

function escapeToClose(){
    document.getElementById("questionDiv").style.display="none";
} //Press escape to close from the questions view

function setSet(){
    document.getElementById('chooseSet').style.display='none';
    document.getElementById("gameLocation").innerHTML='';

    gametableText = '<table class="gameTable"><tr class="categories" id="curSetCategories">';
    gametableText += '<th>'+allCategories[setNumber-1][0]+'</th><th>'+allCategories[setNumber-1][1]+'</th><th>'+allCategories[setNumber-1][2]+'</th><th>'+allCategories[setNumber-1][3]+'</th>'
    
    catNumberLoop = 1;
    queNumberLoop = 1;
    if(setNumber==1){
        gametableText += '<th>'+allCategories[setNumber-1][4]+'</th></tr>';
        maxCat = 6;
    } else {
        gametableText += '</tr>';
        maxCat = 5;
    }
    while (queNumberLoop<6){
        gametableText += '<tr class="questionValues">';
        catNumberLoop = 1;
            while(catNumberLoop<maxCat){
                curqueID = catNumberLoop.toString() + "Q" + queNumberLoop.toString();
                gametableText += '<td class="unclicked" id="'+curqueID+'Loc">'
                gametableText += '<button class="questionButton" id="'+curqueID+'" onclick="openQuestion(\''+curqueID+'\');">$'+queNumberLoop+'00</button></td>';
                catNumberLoop++;
            }
        gametableText += '</tr>';
        queNumberLoop++;
    }
    gametableText += '</table>';

    document.getElementById("gameLocation").innerHTML=gametableText;
}

function openQuestion(thisQuestion){
    document.getElementById("questionDiv").style.display="block";
    curQuestionDiv = document.getElementById("questionDiv");
    temptext = '';
    temptext += '<div id="questionArea">' + getQuestion(thisQuestion) + '</div>';
    temptext += '<div id="answerArea"><button class="answerButton" id="'+thisQuestion+'Ans" onclick="showAnswer(\''+thisQuestion+'\');">Show Answer</button></div>';
    curQuestionDiv.innerHTML = temptext;

    document.getElementById(thisQuestion+"Loc").className = "clicked";
    document.getElementById(thisQuestion+"Loc").innerHTML = document.getElementById(thisQuestion).innerHTML;
} //Open the selected question

function getQuestion(thisQuestion){
    var catNum = parseInt(thisQuestion[0]);
    var queNum = parseInt(thisQuestion[2]);

    keyList = [];
    for (var key in allquestions.Category){
        if(allquestions.Category[key]==catNum){
            keyList.push(key);
        }
    }

    thisQuestionKey = keyList[(5*(setNumber-1))+(queNum-1)]

    temptext = '';
    temptext += "Category: " + catNum.toString() + ", Question #" + queNum.toString() + "<br><br>";
    temptext += allquestions.Question[thisQuestionKey] + "<br>"

    currentAnswer = allquestions.Answer[thisQuestionKey]

    temptabletext = '';
    if(allquestions.QuestionType[thisQuestionKey] == "Multiple Choice"){
        temptabletext = '';
        temptabletext += '<br><br><table class="multipleChoiceTable"><tr><td>'+allquestions.Choice1[thisQuestionKey]+'</td><td>'+allquestions.Choice2[thisQuestionKey]+'</td></tr><tr><td>'+allquestions.Choice3[thisQuestionKey]+'</td><td>'+allquestions.Choice4[thisQuestionKey]+'</td></tr></table>'
    }

    temptext += temptabletext;

    return temptext;
}

function showAnswer(thisAnswer){
    temptext = '';
    temptext += currentAnswer;
    temptext += '<br><button class="answerButton" onclick="escapeToClose();">Back to Panel</button>';

    document.getElementById("answerArea").innerHTML=temptext
} //Show the answer to the question