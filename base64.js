/**
 * Practice Base64 algorithm
 *
 * Reference: https://en.wikipedia.org/wiki/Base64
 */

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

const encode = (str) => {
    let bits = ""
    for (let i = 0; i < str.length; i++) {
        const bit = str[i].charCodeAt(0).toString(2).padStart(8, "0");
        bits += bit;
    }

    let result = "";
    let padding = 0;
    for (let i = 0; i < bits.length; i += 6) {
        let bit = bits.slice(i, i+6);
        if (bit.length < 6) {
            padding = (6 - bit.length) / 2;
            bit = bit.padEnd(6, '0');
        }
        const sextets = parseInt(bit, 2);
        result += ALPHABET[sextets];
    }

    result += "=".repeat(padding);

    return result;
}

const decode = (base64) => {
    let bits = ""
    for (let i = 0; i < base64.length; i++) {
        if (base64[i] === '=') {
            bits = bits.slice(0, -2);
            continue;
        }
        
        const bit = ALPHABET.indexOf(base64[i]).toString(2).padStart(6, '0');
        bits += bit;
    }
    
    let result = ""
    for (let i = 0; i < bits.length; i += 8) {
        const code = parseInt(bits.slice(i, i+8), 2);
        result += String.fromCharCode(code);
    }

    return result;
}


console.log("=== Encoding ===");
const testEncoding = ["Many", "Man", "Ma", "M"];

for (let i = 0; i < testEncoding.length;i++) {
    const el = testEncoding[i];
    console.log(el, encode(el), encode(el) === btoa(el));
}

console.log("\n=== Decoding ===");
const testDecoding = ["TWFueQ==", "TWFu", "TWE=", "TQ=="];
for (let i = 0; i < testDecoding.length;i++) {
    const el = testDecoding[i];
    console.log(el, decode(el), decode(el) === atob(el));
}

