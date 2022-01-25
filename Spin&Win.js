let prizes = {
    count : 12,
    prize_names: ["3000 credits", "35% off", "Hard Luck", "70% off", "Swagpack", "100 % off", "Netflix", "50% off", "Amazon Voucher", "2 Extra spin", "CB T-shirt", "CB Book"]
}
let config = {
    type : Phaser.CANVAS, 
    width: 500,
    height: 500,
    backgroundColor: 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    console.log("in preload fxn");
    this.load.image('background', 'Assets/back.jpg');
    this.load.image('wheel', 'Assets/wheel.png');
    this.load.image('stand', 'Assets/stand.png');
    this.load.image('pin', 'Assets/pin.png');
}

function create(){
    let W = game.config.width;
    let H = game.config.height;
    console.log("in create fxn");
    let back = this.add.sprite(0,0, 'background');
    back.setPosition(W/2, H/2);
    back.setScale(0.30);
    this.wheel = this.add.sprite(0,0, 'wheel');
    this.wheel.setPosition(W/2, H/2);
    this.wheel.setScale(0.20);
    this.wheel.depth = 1;
    let pin = this.add.sprite(0, 0, 'pin');
    pin.setPosition(W/2, H/2 - 200);
    pin.setScale(0.20);
    pin.depth = 1;
    let stand = this.add.sprite(0, 0, 'stand');
    stand.setPosition(W/2, H/2 + 200);
    stand.setScale(0.20);
    //Adding event listener
    this.input.on("pointerdown", spinwheel, this);
    
    //Adding text
    font_style = {
            font : "bold 30px Roboto",
            align: "centre",
            color: "red",
    }
    this.game_text = this.add.text(10, 10, "Welcome to spin and win", font_style);
}

function update(){
    console.log("in update fxn");
//    this.wheel.angle += 1;
    
}

function spinwheel(){
//    this.game_text.setText("Moving!");
    //Stopping the pin at points only
    let rounds = Phaser.Math.Between(2,5);
    let degree = Phaser.Math.Between(0, 11);
    let total = rounds*360 + degree*30;
    
    //What prize is won?
    let idx = prizes.count - 1 - degree;
    
    //add animations via tween
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total,
        ease: "Cubic.easeOut",
        duration: 3000,
        callbackScope: this,
        onComplete: function(){
            this.game_text.setText ("You won " + prizes.prize_names[idx]);
        }
        
    });
}