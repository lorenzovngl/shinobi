function tokenize(alphabet, romaji){
    romaji = romaji.toLowerCase();
    if (romaji.indexOf("oo") > 0){
        romaji = romaji.replaceAt(romaji.indexOf("oo") + 1, "u");
    }
    if (romaji.indexOf(" o ") > -1){
        romaji = romaji.replaceAt(romaji.indexOf(" o "), " wo ");
    }
    if (romaji.indexOf(" wa ") > -1){
        romaji = romaji.replaceAt(romaji.indexOf(" wa "), " ha ");
    }
    let cursor = {start: 0, end: Math.min(3, romaji.length)};
    let output = [];
    while (cursor.end <= romaji.length && cursor.end > cursor.start) {
        let found = false;
        let i = 0;
        let pattern = romaji.substring(cursor.start, cursor.end);
        while (!found && i < alphabet.length) {
            if (alphabet[i].romaji === pattern) {
                output.push(alphabet[i].romaji);
                found = true;
            }
            i++;
        }
        if (found) {
            cursor.start = cursor.end;
            cursor.end = cursor.start + 3;
            if (cursor.end > romaji.length) {
                cursor.end = romaji.length;
            }
        } else {
            cursor.end--;
            if (cursor.end <= cursor.start) {
                if (romaji[cursor.start] === romaji[cursor.start + 1]) {
                    // Doppia lettera
                    output.push("sokuon");
                } else if (romaji[cursor.start] !== " "){
                    output.push(romaji[cursor.start]);
                }
                cursor.start++;
                cursor.end = cursor.start + 3;
                if (cursor.end > romaji.length) {
                    cursor.end = romaji.length;
                }
            }
        }
    }
    return output;
}

function searchKana(alphabet, romaji) {
    let index = -1;
    let found = false;
    let i = 0;
    while (!found && i < alphabet.length){
        if (alphabet[i].romaji === romaji) {
            found = true;
            index = i;
        }
        i++;
    }
    return index;
}

function romajiToHiragana(alphabet, romaji, output_img) {
    let tokens = tokenize(alphabet, romaji);
    let output = "";
    tokens.forEach(function (val) {
        let index = searchKana(alphabet, val);
        if (index > -1){
            if (output_img && alphabet[index].hiragana_img !== undefined){
                output += '<img src="symbols/' + alphabet[index].hiragana_img + '">';
            } else {
                output += alphabet[index].hiragana;
            }
        } else {
            output += val;
        }
    });
    return output;
}

function romajiToKatakana(alphabet, romaji, output_img) {
    let tokens = tokenize(alphabet, romaji);
    let output = "";
    tokens.forEach(function (val) {
        let index = searchKana(alphabet, val);
        if (index > -1){
            output += alphabet[index].katakana;
        } else {
            output += val;
        }
    });
    return output;
}

/*function romajiToHiragana(alphabet, romaji, output_img) {
    romaji = romaji.toLowerCase();
    if (romaji.indexOf("oo") > 0){
        romaji = romaji.replaceAt(romaji.indexOf("oo") + 1, "u");
    }
    if (romaji.indexOf(" o ") > -1){
        romaji = romaji.replaceAt(romaji.indexOf(" o "), " wo ");
    }
    if (romaji.indexOf(" wa ") > -1){
        romaji = romaji.replaceAt(romaji.indexOf(" wa "), " ha ");
    }
    let cursor = {start: 0, end: Math.min(3, romaji.length)};
    let output = "";
    while (cursor.end <= romaji.length && cursor.end > cursor.start) {
        let found = false;
        let i = 0;
        let pattern = romaji.substring(cursor.start, cursor.end);
        while (!found && i < alphabet.length) {
            if (alphabet[i].romaji === pattern) {
                if (output_img && alphabet[i].hiragana_img !== undefined){
                    output += '<img src="symbols/' + alphabet[i].hiragana_img + '">';
                } else {
                    output += alphabet[i].hiragana;
                }
                found = true;
            }
            i++;
        }
        if (found) {
            cursor.start = cursor.end;
            cursor.end = cursor.start + 3;
            if (cursor.end > romaji.length) {
                cursor.end = romaji.length;
            }
        } else {
            cursor.end--;
            if (cursor.end <= cursor.start) {
                if (romaji[cursor.start] === romaji[cursor.start + 1]) {
                    // Doppia lettera
                    output += "っ"; // Sokuon
                } else if (romaji[cursor.start] !== " "){
                    output += romaji[cursor.start];
                }
                cursor.start++;
                cursor.end = cursor.start + 3;
                if (cursor.end > romaji.length) {
                    cursor.end = romaji.length;
                }
            }
        }
    }
    return output;
}*/