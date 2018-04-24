function showNumberWithAnimation(i,j,randNumber){
    var numberCell = $('#number-cell-'+i+'-'+j);

    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    if(randNumber == 2){
        numberCell.text(text[0]);
    }else{
        numberCell.text(text[1]);
    }
    // numberCell.text(randNumber);

    numberCell.animate({
        width:"70px",
        height:"70px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    })
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function updateScore(score){
    $('#score').text(score);
}