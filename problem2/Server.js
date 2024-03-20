const express = require("express");
const app = express();
const port = 9876;


function generatePrimes(n) {
    const primes = [];
    for (let num = 2; primes.length < n; num++) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(num);
    }
    return primes;
}

// Endpoint to  prime numbers
app.get('/primes', (req, res) => {
    const n = 15; 
    const primes = generatePrimes(n);
    res.json({ numbers: primes });
}); 



function generateFibonacci(n) {
    const fibonacci = [1, 1];
    for (let i = 2; i < n; i++) {
        fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
    }
    return fibonacci;
}

// Endpoint to Fibonacci numbers
app.get('/fibo', (req, res) => {
    const n = 15; 
    const fibonacci = generateFibonacci(n);
    res.json({ numbers: fibonacci });
});


function generateOddNumbers(n) {
    const evenNumbers = [];
    for (let num = 0; evenNumbers.length < n; num += 2) {
        evenNumbers.push(num);
    }
    return evenNumbers;
}

// Endpoint to  even numbers
app.get('/even', (req, res) => {
    const n = 20; 
    const oddNumbers = generateOddNumbers(n);
    res.json({ numbers: oddNumbers });
});


function generateRandNumbers(n) {
    const randNumbers = [];
    for (let num = 0; randNumbers.length < n; num += 2) {
        randNumbers.push(Math.random(num)*num);
    }
    return randNumbers;
}

// Endpoint to  rand numbers
app.get('/rand', (req, res) => {
    const n = 20; 
    const randNumbers = generateRandNumbers(n);
    res.json({ numbers: randNumbers });
});






app.listen(port,()=>
{
    console.log("Server is Running")
})
