var board = new Array();        //游戏4*4格子
var score = 0;                  //游戏分数
var hasConflicted = new Array();
var text = ["幼虫","工蜂","王虫","跳虫","虫后","刺蛇","毒爆虫","眼虫","蟑螂","感染者","异龙","坑道虫","雷兽"];

// 小格子定位
$(document).ready(function(){
    newgame();
})

function newgame(){
    // 初始化棋盘格
    init();
    // 随机使两个小格子生成值
    generateOneNumber();
    generateOneNumber();
    
}

// 获取每个小格子id
function init(){
    for(var i = 0; i < 4; i++ ){
        for(var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    for(var i=0; i<4; i++){
        board[i] = new Array();  //将board声明为二维数组
        hasConflicted[i] = new Array();
        for(var j=0; j<4;j++){
            board[i][j] =0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
}


function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i<4 ;i++){
        for(var j = 0; j<4 ;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if( board[i][j] == 0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css('top',getPosTop(i,j)+30);
                theNumberCell.css('left',getPosLeft(i,j)+30);
            }
            else{
                theNumberCell.css("width","70px");
                theNumberCell.css("height","70px");
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                // theNumberCell.text(board[i][j]);
                switch(board[i][j]){
                    case 2:theNumberCell.text(text[0]);break;
                    case 4:theNumberCell.text(text[1]);break;
                    case 8:theNumberCell.text(text[2]);break;
                    case 16:theNumberCell.text(text[3]);break;
                    case 32:theNumberCell.text(text[4]);break;
                    case 64:theNumberCell.text(text[5]);break;
                    case 128:theNumberCell.text(text[6]);break;
                    case 256:theNumberCell.text(text[7]);break;
                    case 512:theNumberCell.text(text[8]);break;
                    case 1024:theNumberCell.text(text[9]);break;
                    case 2048:theNumberCell.text(text[10]);break;
                    case 4096:theNumberCell.text(text[11]);break;
                    case 8192:theNumberCell.text(text[12]);break;
                }
            }
            hasConflicted[i][j] = false;
        }
    }
}
    // 随机一个格子生成数字
function generateOneNumber(){
    if( nospace(board)){
        return false;
    }else{
        //随机一个位置
         var randx = parseInt(Math.floor(Math.random() *4));   //生成x坐标上0--4的随机数
         var randy = parseInt(Math.floor(Math.random() *4));     //生成y坐标上0--4的随机数

        var times = 0;
        while(times < 50){
            if(board[randx][randy] == 0){
                break;
            }else{
                 randx = parseInt(Math.floor(Math.random() *4));
                 randy = parseInt(Math.floor(Math.random() *4));
                times++;
            }
        }
        if(times == 50){
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    if(board[i][j] == 0){
                        randx = i;
                        randy = j;
                    }
                }
            }
        }
        // 随机一个数字
    var randNumber = Math.random() < 0.5 ?2:4;  //随机生成2或4
        // 显示
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
    }
}

// 按键响应
$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:        //左
            if(moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            };
            break;

        case 38:        //上
            event.preventDefault();
            if(moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            };
            break;

        case 39:        //右
            if(moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            };
            break;

        case 40:        //下
            event.preventDefault();
            if(moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            };
            break;

        default:
            break;
    }
})



function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }else{
        for(var i=0;i<4;i++){
            for(var j=1;j<4;j++){
                if(board[i][j] != 0){
                    for(var k=0;k<j;k++){
                        if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                            //移动
                            showMoveAnimation(i,j,i,k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                            //移动
                            showMoveAnimation(i,j,i,k);
                            //叠加
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            //加分
                            score += board[i][k];
                            updateScore(score);

                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()",200);
        return true;
    }
}

function moveRight(){
    if( !canMoveRight( board ) ){
        return false;
    }else{
        for( var i = 0 ; i < 4 ; i ++ ){
            for( var j = 2 ; j >= 0 ; j -- ){
                if( board[i][j] != 0 ){
                    for( var k = 3 ; k > j ; k -- ){
                        if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                            showMoveAnimation( i , j , i , k );
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k]){
                            showMoveAnimation( i , j , i , k);
                            board[i][k] *= 2;
                            board[i][j] = 0;
                            //加分
                            score += board[i][k];
                            updateScore(score);

                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
    }
}

function moveUp(){
    if( !canMoveUp( board ) ){
        return false;
    }else{
        for( var j = 0 ; j < 4 ; j ++ ){
            for( var i = 1 ; i < 4 ; i ++ ){
                if( board[i][j] != 0 ){
                    for( var k = 0 ; k < i ; k ++ ){
                        if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                            showMoveAnimation( i , j , k , j );
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j]){
                            showMoveAnimation( i , j , k , j );
                            board[k][j] *= 2;
                            board[i][j] = 0;
                            //加分
                            score += board[k][j];
                            updateScore(score);

                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()",200);
        return true;
    }
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }else{
        for(var j=0;j<4;j++){
            for(var i=2;i>=0;i--){
                if(board[i][j] != 0){
                    for(var k=3;k>i;k--){
                        if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
                            showMoveAnimation(i,j,k,j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
                            showMoveAnimation(i,j,k,j);
                            board[k][j] *= 2;
                            board[i][j] = 0;
                            //加分
                            score += board[k][j];
                            updateScore(score);

                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()",200);
        return true;
    }
}

function isgameover(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    setTimeout("alert('you die')",400);
    score = 0;
    newgame();
}
