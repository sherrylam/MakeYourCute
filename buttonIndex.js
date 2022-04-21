addIndex = function() {
    if (chracterIndex <= characterImages.length - 1){
        chracterIndex++;
    }
    if (chracterIndex > characterImages.length - 1){
        chracterIndex = 0;
    }
    
}
subtractIndex = function() {
    if (chracterIndex >= 0){
        chracterIndex--;
    }
    if (chracterIndex < 0){
        chracterIndex = characterImages.length - 1;
    }
}

//CHICKEN
addCombIndex = function() {
    if (combindex <= 12){
        combindex++;
    }
    if (combindex > 12){
        combindex = 10;
    }
}
subtractCombIndex = function() {
    if (combindex >= 10){
        combindex--;
    }
    if (combindex < 10){
        combindex = 12;
    }
}
addTailIndex = function() {
    if (tailindex <= 3){
        tailindex++;
    }
    if (tailindex > 3){
        tailindex = 1;
    }
}
subtractTailIndex = function() {
    if (tailindex >= 1){
        tailindex--;
    }
    if (tailindex < 1){
        tailindex = 3;
    }
}
addFeetIndex = function() {
    if (feetindex <= 9){
        feetindex++;
    }
    if (feetindex > 9){
        feetindex = 7;
    }
}
subtractFeetIndex = function() {
    if (feetindex >= 7){
        feetindex--;
    }
    if (feetindex < 7){
        feetindex = 9;
    }
}

//BLOB
addBlobIndex = function() {
    if (blob_bodyindex <= 2){
        blob_bodyindex++;
    }
    if (blob_bodyindex > 2){
        blob_bodyindex = 0;
    }
}
subtractBlobIndex = function() {
    if (blob_bodyindex >= 0){
        blob_bodyindex--;
    }
    if (blob_bodyindex < 0){
        blob_bodyindex = 2;
    }
}
addBlobEyeIndex = function() {
    if (blob_eyeindex <= 5){
        blob_eyeindex++;
    }
    if (blob_eyeindex > 5){
        blob_bodyindex = 3;
    }
}
subtractBlobEyeIndex = function() {
    if (blob_eyeindex >= 3){
        blob_eyeindex--;
    }
    if (blob_eyeindex < 3){
        blob_bodyindex = 5;
    }
}

//CAT
addCatEyeIndex = function() {
    if (cat_eyeindex <= 6){
        cat_eyeindex++;
    }
    if (cat_eyeindex > 6){
        cat_eyeindex = 4;
    }
}
subtractCatEyeIndex = function() {
    if (cat_eyeindex >= 4){
        cat_eyeindex--;
    }
    if (cat_eyeindex < 4){
        cat_eyeindex = 6;
    }
}
addCatNoseIndex = function() {
    if (cat_noseindex <= 9){
        cat_noseindex++;
    }
    if (cat_noseindex > 9){
        cat_bodyindex = 7;
    }
}
subtractCatNoseIndex = function() {
    if (cat_noseindex >= 7){
        cat_noseindex--;
    }
    if (cat_noseindex < 7){
        cat_bodyindex = 9;
    }
}
addCatMouthIndex = function() {
    if (cat_mouthindex <= 12){
        cat_mouthindex++;
    }
    if (cat_mouthindex > 12){
        cat_bodyindex = 10;
    }
}
subtractCatMouthIndex = function() {
    if (cat_mouthindex >= 10){
        cat_mouthindex--;
    }
    if (cat_mouthindex < 10){
        cat_bodyindex = 12;
    }
}
