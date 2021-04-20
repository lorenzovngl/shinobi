function parseCSV(csv) {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
            if (currentline[j] !== undefined) {
                obj[headers[j].trim()] = currentline[j].trim();
            }
        }
        result.push(obj);
    }
    return result;
}

String.prototype.replaceAt = function(index, string) {
    let a = this.split("");
    for (let i = 0; i < string.length; i++){
        a[index+i] = string[i];
    }
    return a.join("");
}

Array.prototype.indexOfKey = function(index, pattern) {
    let res = -1;
    let i = 0;
    while (res === -1 && i < this.length){
        if (this[i][index] === pattern){
            res = i;
        }
        i++;
    }
    return res;
}

Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
}