var dilerBroj = 0;
var jaBroj = 0;

var dilerAsBroj = 0;
var jaAsBroj = 0;

var skriven;
var deck;

var daHit = true;

window.onload = function() {
    cjeliDeck();
    promjesajDeck();
    pocetakIgre();

    document.getElementById("restart").addEventListener("click", function() { 
        location.reload();
    });
}

function cjeliDeck() {
    let vrijednosti = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let boje = ["C","D","H","S"];
    deck = [];

    for (let i = 0; i < boje.length; i++) {
        for (let j = 0; j < vrijednosti.length; j++) {
            deck.push(vrijednosti[j] + "-" + boje[i]);
        }
    }
}

function promjesajDeck() {
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function pocetakIgre() {
    skriven = deck.pop();
    dilerBroj += dajVrijednost(skriven);
    dilerAsBroj += provjeriAs(skriven);
    while (dilerBroj < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./karte/" + card + ".png";
        dilerBroj += dajVrijednost(card);
        dilerAsBroj += provjeriAs(card);
        document.getElementById("dkarte").append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./karte/" + card + ".png";
        jaBroj += dajVrijednost(card);
        jaAsBroj += provjeriAs(card);
        document.getElementById("jkarte").append(cardImg);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
    if(!daHit) {
        return;
    }
    
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./karte/" + card + ".png";
    jaBroj += dajVrijednost(card);
    jaAsBroj += provjeriAs(card);
    document.getElementById("jkarte").append(cardImg);

    if (smanjiAs(jaBroj, jaAsBroj) > 21) { 
        daHit = false;
    }
}

function stay() {
    dilerBroj = smanjiAs(dilerBroj, dilerAsBroj);
    jaBroj = smanjiAs(jaBroj, jaAsBroj);

    daHit = false;
    document.getElementById("skriven").src = "./karte/" + skriven + ".png";

    let message = "";
    if (jaBroj > 21) {
        message = "Izgubio si!";
    }
    else if (dilerBroj > 21) {
        message = "Pobjedio si!";
    }
    else if (jaBroj == dilerBroj) {
        message = "Izjednačeno";
    }
    else if (jaBroj > dilerBroj) {
        message = "Pobjedio si!";
    }
    else if (jaBroj < dilerBroj) {
        message = "Izgubio si!";
    }

    document.getElementById("dbroj").innerText = dilerBroj;
    document.getElementById("jbroj").innerText = jaBroj;
    document.getElementById("restart").style.display = "inline-block";
    document.getElementById("rezultati").innerText = message;
}

function dajVrijednost(card) {
    let razdvojeno = card.split("-");
    let vrijednost = razdvojeno[0];

    if (isNaN(vrijednost)) { 
        if (vrijednost == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(vrijednost);
}

function provjeriAs(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function smanjiAs(igracBroj, igracAsBroj) {
    while (igracBroj > 21 && igracAsBroj > 0) {
        igracBroj -= 10;
        igracAsBroj -= 1;
    }
    return igracBroj;
}
