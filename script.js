rusLetters = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
rusLet = false;
words = ["капуста","картон","диаграмма","полиция","хлопья","льдина","овчарка"];
ltrs = ["к", "т", "р", "о", "н", "д", "а", "п", "я", "х", "у", "с", "и", "г", "м", "л", "ь", "в", "и", "ц"]
findUncorLtrs = [];
win = false;
lose = false;
word = words[Math.floor(Math.random()*7)];
attempts=1;
foundLtrs=0;
find = false;
displayLetters = [];
sovpadenie=false;
score=0;
for(i = 0; i < word.length; i++){
    displayLetters[i]="_";
}
for(i = 0; i < word.length; i++){ 
   document.getElementById('letter'+(i+1)).innerHTML="_";
}
updUncor_Ltr=function(){
    if (attempts < 6) {
        findUncorLtrs[attempts] = letter;
        uncorrectLtr.innerHTML = uncorrectLtr.innerHTML+" "+findUncorLtrs[attempts];
        draw_BodyPart();
        attempts++;
    } else if (attempts == 6) {
        draw_BodyPart();
        findUncorLtrs[attempts] = letter;
        uncorrectLtr.innerHTML = uncorrectLtr.innerHTML+" "+findUncorLtrs[attempts];
        lose=true;
        alert("Вы проиграли!");
        final.innerHTML="Вы проиграли!";
        final.style.color="red";
    }
}

guessLetter = function(){
    if((win == false) && (lose == false)) {
        letter=prompt("Введите букву (русскую):")
        for (i = 0; i < 33; i++) {
            if (rusLetters[i] == letter.toLowerCase()) {
                rusLet = true;
            }
        } 
        if (letter.length != 1) {
            alert("Введите одну букву")
        } else if (letter == "") {
            alert("Введите букву")
        } else if (letter == "1" || letter == "2" || letter == "3" || letter == "4" || letter == "5" || letter == "6" || letter == "7" || letter == "8" || letter == "9") {
            alert("Это цифра, а не буква");
            guessLetter();
        } else if (rusLet == false) {
            alert("Это не русская буква");
        } else {
            rusLet = false;
            alert("Загрузка..");
            updateDispLetters();
        }
    } else if (win == true) {
        alert("Вы уже победили. Чтобы начать заново перезагрузите страницу");
    } else if (lose == true) {
        alert("Вы уже проиграли. Чтобы начать заново перезагрузите страницу")
    }
}
updateDispLetters = function(){
    i=0;
    for (i = 0; i < word.length; i++){
        if ((letter == displayLetters[i]) || (letter == findUncorLtrs[i])) {
            sovpadenie=true;
        }
    }
    if (sovpadenie == false) {
        for(i= 0; i < word.length; i++) {
            if (letter.toLowerCase() == word[i]){
                alert("Вы угадали букву");
                document.getElementById('letter'+(i+1)).innerHTML=letter;
                displayLetters[foundLtrs]=letter;
                foundLtrs++;
                score++;
                scores.innerHTML="Ваши очки: "+score;
                if (foundLtrs == word.length) {
                    win = true;
                    alert("Поздравляю! Вы победили! Ваши очки: " +score);
                    final.innerHTML="Победа!";
                    final.style.color="green";
                }
                find = true;
            } else if ((letter.toLowerCase() != word[i]) && (i == word.length-1) && (find == false)) {
                find = false;
                alert("Такой буквы здесь нет");
                if (score > 0) {
                    score--;
                    scores.innerHTML="Ваши очки: "+score;
                }
                updUncor_Ltr();
            }
        }    
    } else if (sovpadenie == true) {
        alert("Вы уже называли эту букву")
    }
    find=false;
    sovpadenie=false;
}
draw_BodyPart = function(){
    indImg = document.getElementById('bodyPart'+attempts);
    indImg.src ="img/BodyParts/bodyPart"+attempts+".png";
}