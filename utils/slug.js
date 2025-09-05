function makeSlug(length = 10) {
const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
let out = '';
for (let i = 0; i < length; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
return out;
}
module.exports = { makeSlug };

