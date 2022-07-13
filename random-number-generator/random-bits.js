const fs = require('fs');

function randomBit() {
    // Source: https://www.tutorialstonight.com/js/how-to-create-a-random-number-in-javascript.php#:~:text=1%20Creating%20a%20random%20number%20in%20Javascript.%20To,is%20a%20number%20that%20is%20generated%20randomly.%20
    return Math.floor(Math.random() * (2)); // Math.floor(Math.random() * (max - min + 1) + min);
}

let digits = 365;

let bits = randomBit();

while (digits - 1 > 0) {
    bits = `${bits}, ${randomBit().toString()}`;
    digits--;
    console.log(digits);
}

console.log(bits);

fs.writeFile('bits.csv', bits, (err) => {
    if (err) throw err;
});