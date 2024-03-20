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


function mergeAndSort(num)
{
    return Array.from(new Set(num)).sort((a, b) => a - b);
}

// Endpoint to  main numbers
app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    const requests = urls.map(
        url => axios.get(url, { timeout: 500 }).
        then(response => response.data.numbers).
        catch(() => []));

    try {
        const responses = await Promise.all(requests);
        const mergedNumbers = mergeAndSort(responses.flat());
        res.json({ numbers: mergedNumbers });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.listen(port,()=>
{
    console.log("Server is Running")
})
