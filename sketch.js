var paredes;
var parede1, parede2, parede3, parede4, parede5, parede6, parede7, parede8, parede9, parede10;
var parede11, parede12, parede13, parede14, parede15, parede16, parede17, parede18, parede19, parede20;
var parede21, parede22, parede23, parede24, parede25, parede26, parede27, parede28, parede29, parede30;
var paredeImg1, paredeImg2, paredeImg3, paredeImg4, paredeImg5;
var paredeImg6, paredeImg7, paredeImg8, paredeImg9, paredeImg10;
var paredeImg11, paredeImg12, paredeImg13, paredeImg14, paredeImg15;
var paredeImg16, paredeImg17, paredeImg18, paredeImg19, paredeImg20;
var paredeImg21, paredeImg22, paredeImg23, paredeImg24, paredeImg25;
var paredeImg26, paredeImg27, paredeImg28, paredeImg29, paredeImg30,parede31;
var boneco;
var fim;
var checkPoint1, checkPoint2;
var cp1 = false, cp2 = false;
var checkpoints = 0;
var edges;
var estado = "jogar";
var obs1, obs2, obs3, obs4, obs5;
var obstaculos;
var aumentando = true;
var diminuindo = false;
var limiteU, limiteD;
var fundo1, fundo2;
var knight1, knight2, knight3, knight4, knight5, knightCorrendo;
var porta;

var bolaImg1,bolaImg2;

function preload() {

  porta = loadImage("door.png");

  bolaImg1 = loadImage("ball1.png");

  imageFundo1 = loadImage("wall1.png");
  imageFundo2 = loadImage("wall2.png");
  paredeImg1 = loadImage("cubeWall4.png");

  paredeImg2 = loadImage("cubeWall11.png");

  paredeImg3 = loadImage("cubeWall3.png");
  paredeImg4 = loadImage("cubeWall4.png");
  paredeImg5 = loadImage("cubeWall4.png");
  paredeImg6 = loadImage("cubeWall10.png");
  paredeImg7 = loadImage("cubeWall2.png");
  paredeImg8 = loadImage("cubeWall2.png");
  paredeImg9 = loadImage("cubeWall2.png");
  paredeImg10 = loadImage("cubeWall8.png");
  paredeImg11 = loadImage("cubeWall2.png");
  paredeImg12 = loadImage("cubeWall2.png");
  paredeImg13 = loadImage("cubeWall2.png");
  paredeImg14 = loadImage("cubeWall2.png");
  paredeImg15 = loadImage("cubeWall1.png");
  paredeImg16 = loadImage("cubeWall1.png");
  paredeImg17 = loadImage("cubeWall5.png");
  paredeImg18 = loadImage("cubeWall1.png");
  paredeImg19 = loadImage("cubeWall1.png");
  paredeImg20 = loadImage("cubeWall1.png");
  paredeImg21 = loadImage("cubeWall1.png");
  paredeImg22 = loadImage("cubeWall1.png");
  paredeImg23 = loadImage("cubeWall1.png");
  paredeImg24 = loadImage("cubeWall12.png");
  paredeImg25 = loadImage("cubeWall1.png");
  paredeImg26 = loadImage("cubeWall7.png");
  paredeImg27 = loadImage("cubeWall7.png");
  paredeImg28 = loadImage("cubeWall7.png");
  paredeImg29 = loadImage("cubeWall7.png");
  paredeImg30 = loadImage("cubeWall7.png");

  paredeImg31 = loadImage("cubeWall1.png");

  knight1 = loadImage("knight1.png");
  knight2 = loadImage("knight2.png");
  knight3 = loadImage("knight3.png");
  knight4 = loadImage("knight4.png");
  knight5 = loadImage("knight5.png");
  knightCorrendo = loadAnimation("knight5.png", "knight4.png");

}

function setup() {
  paredes = new Group();
  obstaculos = new Group();
  createCanvas(600, 600);

  //fundo1 = createSprite(246, 255, 10, 90);
  //fundo1.addImage("fundo", imageFundo1);

  //fundo2 = createSprite(300, 600, 50, 50);
  //fundo2.addImage("fundo", imageFundo2);


  fim = createSprite(350, 6, 50, 10);
  fim.addImage("door",porta);
  fim.scale = 0.3;

  checkPoint1 = createSprite(245, 367, 100, 100);
  checkPoint1.shapeColor = "green";
  checkPoint1.visible = false;

  checkPoint2 = createSprite(440, 365, 80, 90);
  checkPoint2.shapeColor = "green";
  checkPoint2.visible = false;

  boneco = createSprite(20, 20, 25, 25);
  //boneco.addImage("knight1", knight1)
  boneco.scale = 0.5;
  boneco.shapeColor = "black";


  edges = createEdgeSprites();

  criarParedes();
  criarObs();
}


function draw() {
  background(255, 255, 255);

  boneco.velocityX = 0;
  boneco.velocityY = 0;


  if (keyDown("down")) {
    boneco.velocityY = 5;
    //boneco.loadAnimation("knight5.png","knight4.png");
  }
  if (keyDown("up")) {
    boneco.velocityY = -5;
  }
  if (keyDown("right")) {
    boneco.velocityX = 5;
  }
  if (keyDown("left")) {
    boneco.velocityX = -5;
  }
  if (boneco.isTouching(checkPoint1) && cp1 === false) {
    cp1 = true;
    checkpoints = 1;
  }
  if (boneco.isTouching(checkPoint2) && cp2 === false) {
    cp2 = true;
    checkpoints = 2;
  }
  if (boneco.isTouching(paredes) || boneco.isTouching(edges) || boneco.isTouching(obstaculos)) {
    switch (checkpoints) {
      case 0:
        boneco.x = 20;
        boneco.y = 20;
        break;
      case 1:
        boneco.x = checkPoint1.x;
        boneco.y = checkPoint1.y;
        break;
      case 2:
        boneco.x = checkPoint2.x;
        boneco.y = checkPoint2.y;
        break;
    }
  }
  if (boneco.isTouching(fim)) {
    estado = "fim";
  }

  obs5.rotation += 1;
  ajustarLargura();

  obstaculos.bounceOff(paredes);
  obstaculos.bounceOff(edges);

  obs2.bounceOff(limiteU);
  obs2.bounceOff(limiteD);

  drawSprites();

  if (estado === "fim") {
    boneco.velocityX = 0;
    boneco.velocityY = 0;

    fill("black");
    textSize(40);
    text("STAGE Cleared", 150, 300);

  }

  fill("red");
  text(mouseX + ", " + mouseY, 10, 10);
}
function criarParedes() {
  //verticais:
  parede1 = createSprite(295, 365, 5, 325);
  parede1.addImage("paredeImg", paredeImg1);
  parede1.scale = 0.2;

  parede2 = createSprite(400, 288, 5, 390);
  parede2.addImage("paredeImg", paredeImg2);
  parede2.scale = 0.2;

  parede3 = createSprite(295, 56, 5, 176);
  parede3.addImage("paredeImg", paredeImg3);
  parede3.scale = 0.2;

  parede4 = createSprite(550, 504, 5, 240);
  parede4.addImage("paredeImg", paredeImg4);
  parede4.scale = 0.2;

  parede5 = createSprite(482, 240, 5, 295);
  parede5.addImage("paredeImg", paredeImg5);
  parede5.scale = 0.2;

  parede6 = createSprite(144, 158, 5, 315);
  parede6.addImage("paredeImg", paredeImg6);
  parede6.scale = 0.2;

  parede7 = createSprite(120, 475, 5, 112);
  parede7.addImage("paredeImg", paredeImg7);
  parede7.scale = 0.2;

  parede8 = createSprite(60, 295, 5, 100);
  parede8.addImage("paredeImg", paredeImg8);
  parede8.scale = 0.2;

  parede9 = createSprite(60, 460, 5, 80);
  parede9.addImage("paredeImg", paredeImg9);
  parede9.scale = 0.2;

  parede10 = createSprite(141, 395, 5, 45);
  parede10.addImage("paredeImg", paredeImg10);
  parede10.scale = 0.2;

  parede11 = createSprite(345, 550, 5, 120);
  parede11.addImage("paredeImg", paredeImg11);
  parede11.scale = 0.2;

  parede12 = createSprite(222, 109, 5, 75);
  parede12.addImage("paredeImg", paredeImg12);
  parede12.scale = 0.2;

  parede13 = createSprite(62, 593, 5, 50);
  parede13.addImage("paredeImg", paredeImg13);
  parede13.scale = 0.2;

  parede14 = createSprite(482, 65, 5, 52);
  parede4.addImage("paredeImg", paredeImg4);
  parede4.scale = 0.2;

  //horizontais:
  parede15 = createSprite(30, 115, 60, 5);
  parede15.addImage("paredeImg", paredeImg15);
  parede15.scale = 0.2;

  parede16 = createSprite(98, 247, 80, 5);
  parede16.addImage("paredeImg", paredeImg16);
  parede16.scale = 0.2;

  parede17 = createSprite(100, 419, 220, 5);
  parede17.addImage("paredeImg", paredeImg17);
  parede17.scale = 0.2;

  parede18 = createSprite(25, 555, 55, 5);
  parede18.addImage("paredeImg", paredeImg18);
  parede18.scale = 0.2;

  parede19 = createSprite(181, 315, 90, 5);
  parede19.addImage("paredeImg", paredeImg19);
  parede19.scale = 0.2;

  parede20 = createSprite(258, 511, 93, 5);
  parede20.addImage("paredeImg", paredeImg20);
  parede20.scale = 0.2;

  parede21 = createSprite(340, 417, 118, 5);
  parede21.addImage("paredeImg", paredeImg21);
  parede21.scale = 0.2;

  parede22 = createSprite(243, 250, 100, 5);
  parede22.addImage("paredeImg", paredeImg22);
  parede22.scale = 0.2;

  parede23 = createSprite(181, 145, 85, 5);
  parede23.addImage("paredeImg", paredeImg23);
  parede23.scale = 0.2;

  parede24 = createSprite(392, 93, 190, 5);
  parede24.addImage("paredeImg", paredeImg24);
  parede24.scale = 0.2;

  parede25 = createSprite(437, 482, 75, 5);
  parede25.addImage("paredeImg", paredeImg25);
  parede25.scale = 0.2;

  parede26 = createSprite(575, 370, 55, 5);
  parede26.addImage("paredeImg", paredeImg26);
  parede26.scale = 0.2;

  parede27 = createSprite(510, 300, 60, 5);
  parede27.addImage("paredeImg", paredeImg27);
  parede27.scale = 0.2;

  parede28 = createSprite(575, 240, 60, 5);
  parede28.addImage("paredeImg", paredeImg28);
  parede28.scale = 0.2;

  parede29 = createSprite(510, 160, 60, 5);
  parede29.addImage("paredeImg", paredeImg29);
  parede29.scale = 0.2;

  parede30 = createSprite(575, 93, 60, 5);
  parede30.addImage("paredeImg", paredeImg30);
  parede30.scale = 0.2;

  paredes.add(parede1);
  paredes.add(parede2);
  paredes.add(parede3);
  paredes.add(parede4);
  paredes.add(parede5);
  paredes.add(parede6);
  paredes.add(parede7);
  paredes.add(parede8);
  paredes.add(parede9);
  paredes.add(parede10);
  paredes.add(parede11);
  paredes.add(parede12);
  paredes.add(parede13);
  paredes.add(parede14);
  paredes.add(parede15);
  paredes.add(parede16);
  paredes.add(parede17);
  paredes.add(parede18);
  paredes.add(parede19);
  paredes.add(parede20);
  paredes.add(parede21);
  paredes.add(parede22);
  paredes.add(parede23);
  paredes.add(parede24);
  paredes.add(parede25);
  paredes.add(parede26);
  paredes.add(parede27);
  paredes.add(parede28);
  paredes.add(parede29);
  paredes.add(parede30);
}
function criarObs() {

  obs1 = createSprite(200, 475, 10, 10);
  obs2 = createSprite(515, 365, 10, 10);
  obs3 = createSprite(65, 185, 13, 13);
  obs4 = createSprite(545, 42, 60, 5);
  obs5 = createSprite(345, 455, 5, 60);

  obs1.addImage(knight1);
  obs1.scale = 0.14;

  obstaculos.add(obs1);
  obstaculos.add(obs2);
  obstaculos.add(obs3);
  obstaculos.add(obs4);
  obstaculos.add(obs5);

  obs1.velocityX = 3.5;
  obs2.velocityY = -1;
  obs2.velocityX = 1;
  obs4.velocityX = 1;


  limiteU = createSprite(540, 42, 120, 5);
  limiteU.visible = false;
  limiteD = createSprite(540, 382, 120, 5);
  limiteD.visible = false;

}
function ajustarLargura() {
  if (obs3.width < 140 && aumentando) {
    obs3.width += 1;
  }
  if (obs3.width > 13 && diminuindo) {
    obs3.width -= 1;
  }
  if (obs3.width >= 140) {
    aumentando = false;
    diminuindo = true;
  } else if (obs3.width <= 13) {
    aumentando = true;
    diminuindo = false;
  }
}