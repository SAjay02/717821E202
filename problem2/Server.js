const express = require("express");
const app = express();
const port = 9876;
const axios = require("axios")

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
// app.get('/primes', (req, res) => {
//     const n = 15; 
//     const primes = generatePrimes(n);
//     res.json({ numbers: primes });
// }); 



function generateFibonacci(n) {
    const fibonacci = [1, 1];
    for (let i = 2; i < n; i++) {
        fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
    }
    return fibonacci;
}

// Endpoint to Fibonacci numbers
// app.get('/fibo', (req, res) => {
//     const n = 15; 
//     const fibonacci = generateFibonacci(n);
//     res.json({ numbers: fibonacci });
// });


function generateEvenNumbers(n) {
    const evenNumbers = [];
    for (let num = 0; evenNumbers.length < n; num += 2) {
        evenNumbers.push(num);
    }
    return evenNumbers;
}
function averageEvenNumbers(n) {
    let sum=0 ;
    for (let num = 0; num<n.length; num++) {
        sum+=n[num];
    }
    return parseFloat((sum/n.length));
}

// Endpoint to get a list of odd numbers
// app.get('/even', (req, res) => {
//     const n = 15; // 
//     const evenNumbers = generateEvenNumbers(n);
//     res.json({ numbers: evenNumbers });
// });


function generateRandNumbers(n) {
    const randNumbers = [];
    for (let num = 0; randNumbers.length < n; num += 2) {
        randNumbers.push(Math.random(num)*num);
    }
    return randNumbers;
}

// Endpoint to  rand numbers
// app.get('/rand', (req, res) => {
//     const n = 20; 
//     const randNumbers = generateRandNumbers(n);
//     res.json({ numbers: randNumbers });
// });


function mergeAndSort(num)
{
    return Array.from(new Set(num)).sort((a, b) => a - b);
}

// Endpoint to  main numbers
app.get('/numbers/:id', async (req, res) => {
        const prevState=[];
        const currState=[];
        const numbers=[];
        let evenNumbers=[];
        const urls = req.params.id;
        if(urls=='e')
        {
            const n = 15; 
            evenNumbers = generateEvenNumbers(n);
            res.json({ 
                windowPrevState:prevState,
                windowCurrState: evenNumbers ,
                numbers:evenNumbers,
                avg:averageEvenNumbers(evenNumbers)
            });
        }
        else if(urls=='f')
        {
            const n = 15; 
            const fibonacci = generateFibonacci(n);
            res.json({ 
                windowPrevState:prevState,
                windowCurrState: fibonacci,
                numbers:fibonacci,
                avg:averageEvenNumbers(fibonacci)
            });
        }
        else if(urls=='p')
        {
            const n = 15; 
            const primes = generatePrimes(n);
            res.json({ numbers: primes });
        }
        else if(urls=='r')
        {
            const n = 20; 
            const randNumbers = generateRandNumbers(n);
            res.json({ numbers: randNumbers });
        }
        else
        {
            res.json({message:"Invalid url given"})
        }
    
});



app.listen(port,()=>
{
    console.log("Server is Running")
})
