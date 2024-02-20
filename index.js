let startbutton = document.getElementById('startgame')
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');
let restartbutton = document.getElementById('restart-button');

hitButton.style.display = 'none';
stayButton.style.display = 'none';
restartbutton.style.display = 'none';

var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let deck=[]
var playerhand=[]
var dealerhand=[]
var playersum=0
var dealersum=0
var alive = "F"

function getDeck()
{
	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}
}

function drawRandomCard(deck){
    var randomIndex = Math.floor(deck.length * Math.random());
    return deck[randomIndex];
}

function getHandValue(hand){
    var sum = 0
    for(var i=0;i<hand.length;i++){
        if(hand[i].Value === 'A'){
            sum += 11;
        }
        else if(hand[i].Value === 'J' || hand[i].Value=== 'Q' || hand[i].Value === 'K'){
            sum += 10;
        }
        else {
            sum += hand[i].Value;
        }            
    }
    return sum;
}

function hit(){
    if( playersum >= 21){
        hitButton.style.display = 'None';
        stayButton.style.display = 'None';
    }
    else{
        var temp=drawRandomCard(deck);
        playerhand.push(temp);
        cardUI_player(temp.Value);        
        playersum=getHandValue(playerhand)
        check()
    }
}

function stand(){

    if(dealersum <= 16){
        var temp=drawRandomCard(deck);
        dealerhand.push(temp);
        dealersum=getHandValue(dealerhand);
        cardUI_dealer(temp.Value);
    }

    let sum_d=document.getElementById("sum-dealer");
    sum_d.textContent = "Sum: " + " "+dealersum;  
    let messageEl=document.getElementById("message-el");

    msg=""

    if(alive === "T"){
        if((21-playersum)<(21-dealersum)){
            msg="You won!"
        }
        else if(dealersum>21) {
            msg="You won!"
        }
        else{
            msg="Dealer won!"
        }
    }

    messageEl.textContent = msg
    hitButton.style.display = 'None';
    stayButton.style.display = 'None';
    startbutton.style.display ='None';
    restartbutton.style.display='inline';

}

function restart() {

    const myNode = document.getElementById("flex-container-player");
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
      }
    const Node = document.getElementById("flex-container-dealer");
    while (Node.lastElementChild) {
          Node.removeChild(Node.lastElementChild);
        }
        
    playerhand=[];
    dealerhand=[];
    playersum=0;
    dealersum=0;
    startgame();
}

function startgame() {
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    getDeck();
    restartbutton.style.display = 'None';
    startbutton.style.display ='None';   
    playerhand=[drawRandomCard(deck),drawRandomCard(deck)];
    dealerhand=[drawRandomCard(deck),drawRandomCard(deck)];
    
    for(var count=0;count < dealerhand.length ;count++){
        cardUI_dealer(dealerhand[count].Value)
    }
    
    for(var count=0;count < playerhand.length ;count++){
        cardUI_player(playerhand[count].Value)
    }
    
    playersum=getHandValue(playerhand);
    dealersum=getHandValue(dealerhand);
    check()
}


function check() {
    
    let cards_d=document.getElementById("cards-dealer");
    cards_d.textContent = "Cards:" + " "


    let sum_d=document.getElementById("sum-dealer");
    sum_d.textContent = "Sum: " + " "+dealersum;  

    let cards_y=document.getElementById("cards-you");
    cards_y.textContent = "Cards:" + " "
   

    let sum_y=document.getElementById("sum-you");
    sum_y.textContent = "Sum: " + " "+playersum;  
    
    
    let messageEl=document.getElementById("message-el");
    if(playersum < 21){
        msg="Do you want to draw a card?";
        alive="T";
    }
    else if(playersum === 21 ){
        msg="wohoo, you got blackjack";
        startbutton.textContent=" Start Game "; 
        hitButton.style.display = 'None';
        stayButton.style.display = 'None';
        restartbutton.style.display ='inline';
        alive="T";
    }
    else if(playersum > 21 ){
        msg="Dealer Won!";
        startbutton.textContent=" Start Game "; 
        hitButton.style.display = 'None';
        stayButton.style.display = 'None';
        restartbutton.style.display ='inline';
        alive="F";
    }

    messageEl.textContent = msg

}

function cardUI_player(num){
    
        const terms = document.createElement('p');
        const node = document.createTextNode(num);
        terms.appendChild(node);
        terms.setAttribute('class', 'card');
        document.getElementById("flex-container-player").appendChild(terms);
    
}
function cardUI_dealer(num){
        const terms = document.createElement('p');
        const node = document.createTextNode(num);
        terms.appendChild(node);
        terms.setAttribute('class', 'card');
        document.getElementById("flex-container-dealer").appendChild(terms);
    
}
