const MainScreen = ".axUSnc", OptionButton = ".boDUxc";
var isEntered = false, commentOpened = false, isHost = false;


    function CheckIfEntered(){
        return document.querySelector(MainScreen);
    }
    function CheckIfHost(){
        return document.querySelectorAll(OptionButton).length === 5;
    }

function checkCommentNum(){
    return document.querySelectorAll(".oIy2qc").length; 
}

function getRandomFloat(range){
    return Math.ceil(range * Math.random());
}


function CreateTextBlockContainer(){
    const NewContainer = document.createElement("div");
    
    NewContainer.className = "TextContainer";
    NewContainer.style.cssText = 
    `
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
    `
    if(document.querySelector(MainScreen) !== null){
        document.querySelector(MainScreen).appendChild(NewContainer);
    }
}

function InsertText(i){
    return document.getElementsByClassName("oIy2qc")[i].innerHTML;
}
function CalcTextSpeed(lengath){
    /*
    if(length > 10){
        return 4.4;
    }else if(length > 4){
        return 6.2;
    }else{
        return 5;
    }
    */
   return 6.4;
}
function CreateNewTextBlock(i){
    const ParentDOM = document.querySelector(".TextContainer");
    let CommentBlock = document.createElement("div"),
        FontSize = 60;
        RandomY = 2 + getRandomFloat(80),
        InnerContent = InsertText(i),
        ContentLength = InnerContent.length, TextSpeed = CalcTextSpeed(ContentLength);

    

    CommentBlock.innerText = InnerContent;
    CommentBlock.style.cssText = 
    `
        font-size: ` + FontSize + `px;
        position: absolute;
        top: ` + RandomY + `%;
        left: calc(100% + 10px);
        font-weight: 600;
        color: white;
        display: inline-block;
        animation: moveLeft ` + TextSpeed + `s linear forwards;
        white-space: nowrap;
        -webkit-text-stroke: 1.2px #000;
    `;

    ParentDOM.appendChild(CommentBlock);
}


function InitContainer(){
    if(document.getElementsByClassName("TextContainer").length === 0){
        CreateTextBlockContainer();
    }
}
function InitCommentSimultaneity(){
    if(!commentOpened){
        const CommentMenuButton = document.querySelectorAll(OptionButton)[2];
        setTimeout( ()=>{
            CommentMenuButton.click();
        }, 1);
        commentOpened = true;
    }
}

function CreateNewDanmaku(i){
    CreateNewTextBlock(i);
}

function UpdateComment(){
    UpdatedCommentNum = checkCommentNum();
    if(TotalCommentNum !== UpdatedCommentNum){
        for(let i = TotalCommentNum; i < UpdatedCommentNum; i++){
            CreateNewDanmaku(i);
        }
        TotalCommentNum = UpdatedCommentNum;
    }
}

var TotalCommentNum = 0, UpdatedCommentNum;
setInterval( ()=>{

    isEntered = CheckIfEntered();
    isHost = CheckIfHost();
    if(isEntered){
        InitContainer();
        InitCommentSimultaneity();

        UpdateComment();
    }
}, 10)

