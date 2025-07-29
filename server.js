const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


function isNumber(str) {
    return /^[+-]?\d+(\.\d+)?$/.test(str);
}

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: 'data' should be an array"
            });
        }

        const response = {
            is_success: true,
            user_id: "Rudraksh Chib",
            email: "rudraksh745.be22@chitkara.edu.in",
            roll_number: "2210990745",
            odd_numbers: [],
            even_numbers: [],
            alphabets: [],
            special_characters: [],
            sum: 0,
            concat_string: ""
        };

        let numberSum = 0;
        let alphabetChars = [];

        data.forEach(item => {
            if (item === null || item === undefined || item === '') return; 

            const str = String(item);

            if (isNumber(str)) {
                const num = parseFloat(str);
                numberSum += num;

                if (num % 2 === 0) {
                    response.even_numbers.push(str);
                } else {
                    response.odd_numbers.push(str);
                }
            }
            else if (/^[a-zA-Z]+$/.test(str)) {
                response.alphabets.push(str.toUpperCase());
                for (let char of str) {
                    alphabetChars.push(char.toLowerCase());
                }
            }
            else {
                response.special_characters.push(str);
            }
        });

        response.sum = numberSum;

        if (alphabetChars.length > 0) {
            alphabetChars.reverse();
            response.concat_string = alphabetChars
                .map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
                .join('');
        }

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.get('/', (req, res) => {
    res.json({ message: "Bajaj Finserv API is running!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;