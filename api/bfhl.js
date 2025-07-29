const express = require('express');
const router = express.Router();

const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL = "ABCD123";

function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

router.post('/', (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) throw new Error("Invalid input format");

    let even_numbers = [], odd_numbers = [], alphabets = [], special_chars = [], sum = 0;
    let alphabet_string = "";

    data.forEach(item => {
      const str = String(item);

      if (/^[0-9]+$/.test(str)) {
        const num = parseInt(str);
        sum += num;
        if (num % 2 === 0) even_numbers.push(str);
        else odd_numbers.push(str);
      } else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        alphabet_string += str;
      } else {
        special_chars.push(str);
      }
    });

    const reversed = [...alphabet_string].reverse();
    const altCaps = reversed.map((ch, idx) =>
      idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join('');

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters: special_chars,
      sum: sum.toString(),
      concat_string: altCaps
    });

  } catch (err) {
    return res.status(400).json({
      is_success: false,
      message: err.message
    });
  }
});

module.exports = router;
