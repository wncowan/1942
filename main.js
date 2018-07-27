$(document).ready(function(){
    var alive = true;
    var score = 0;
    var hero = {
        x: 300,
        y: 500
    }

    var bullets = [];
    var wreckage = [];

    var enemies = [{x: 50, y: 70},{x: 250, y: 40},{x: 350, y: 50}];

    function displayHero(){
        document.getElementById('hero').style['top'] = hero.y + "px";
        document.getElementById('hero').style['left'] = hero.x + "px";
    }

    function displayEnemies(){
        var output = '';
        for(var i=0; i<enemies.length; i++){
            output += "<div id='" + i + "'class='enemy1' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;'></div>";
        }
        //  console.log(output);
            document.getElementById('enemies').innerHTML = output;
    }

    function displayWreckage(){
        var output = '';
        for(var i=0; i<wreckage.length; i++){
            output += "<div class='wreckage1' style='top:" + wreckage[i].y + "px; left:" + wreckage[i].x + "px;'></div>";
        }
        document.getElementById('wreckage').innerHTML = output;
    }

    function moveEnemies(){
        for(var i = 0; i<enemies.length; i++){
            enemies[i].y += 5;
            if(enemies[i].y > 550){
                enemies[i].y = 0;
                enemies[i].x = Math.random()*500;
            }
        }

    }
    function moveBullets(){
        for(var i = 0; i<bullets.length; i++){
            bullets[i].y -= 5;
            if(bullets[i].y < 0){
                bullets[i] = bullets[bullets.length - 1];
                bullets.pop();
                console.log(bullets);
            }
        }

    }

    function displayScore(){
        document.getElementById("score").innerHTML = score;
    }

    function displayBullets(){
        var output = "";
        for(var i = 0; i<bullets.length; i++){
            output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" + bullets[i].x + "px;'></div>"
        }
        document.getElementById('bullets').innerHTML = output;
    }

    function gameLoop(){
        if (alive == true){
            displayHero();
            moveEnemies();
            displayEnemies();
            moveBullets();
            displayBullets();
            detectBulletCollision();
            detectEnemyCollision();
            displayWreckage();
            displayScore();
        }
        else{
            displayEnemies();
            displayBullets();
            displayWreckage();
            displayScore();
        }
       
    }
    function detectBulletCollision(){
        for(var i =0; i<bullets.length; i++){
            for(var j=0; j < enemies.length; j++){
                if( Math.abs(bullets[i].x - enemies[j].x) < 20 && Math.abs(bullets[i].y - enemies[j].y) < 20){
                    console.log("hit");
                    bullets[i] = bullets[bullets.length - 1];
                    bullets.pop();
                    score += 10;
                    wreckage.push({x: enemies[j].x, y: enemies[j].y});
                    enemies[j] = enemies[enemies.length -1];
                    enemies.pop();
                    break;
                }
                
            }
        }
    }

    function detectEnemyCollision(){
        for(var j=0; j < enemies.length; j++){
            if( Math.abs(hero.x - enemies[j].x) < 20 && Math.abs(hero.y - enemies[j].y) < 20){
                console.log("you were hit");
                alive = false;
                score -= 500;
                wreckage.push({x: hero.x, y: hero.y});
                document.getElementById('gameover').innerHTML = "<div id='dead'><h3>You Dead</h3></div>"

            }
        }
    }

    setInterval(gameLoop, 50);

    document.onkeydown = function(a){
        console.log(a.keyCode);
        if(a.keyCode == 37 && alive == true){
            hero.x -= 10;
        }
        else if(a.keyCode == 39 && alive == true){
            hero.x += 10;
        }
        if(a.keyCode == 38 && hero.y > 10 && alive == true){
            hero.y -= 10;
        }
        else if(a.keyCode == 40 && hero.y < 520 && alive == true){
            hero.y += 10;
        }
        else if(a.keyCode == 32 && alive == true){
            bullets.push({x: hero.x+6, y: hero.y-15});
            console.log(bullets);
            displayBullets();
        }
        displayHero();

    }
    displayEnemies();
    displayHero();

})
