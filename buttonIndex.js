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
addWingIndex = function() {
    if (wingindex <= 6){
        wingindex++;
    }
    if (wingindex > 6){
        wingindex = 4;
    }
}
subtractWingIndex = function() {
    if (wingindex >= 4){
        wingindex--;
    }
    if (wingindex < 4){
        wingindex = 6;
    }
}

//BLOB
addBlobIndex = function() {
    if (blob_bodyindex <= 11){
        blob_bodyindex++;
    }
    if (blob_bodyindex > 11){
        blob_bodyindex = 0;
    }
}
subtractBlobIndex = function() {
    if (blob_bodyindex >= 0){
        blob_bodyindex--;
    }
    if (blob_bodyindex < 0){
        blob_bodyindex = 11;
    }
}
addBlobEyeIndex = function() {
    if (blob_eyeindex <= 17){
        blob_eyeindex++;
    }
    if (blob_eyeindex > 17){
        blob_eyeindex = 12;
    }
}
subtractBlobEyeIndex = function() {
    if (blob_eyeindex >= 12){
        blob_eyeindex--;
    }
    if (blob_eyeindex < 12){
        blob_eyeindex = 17;
    }
}
addBlobAccIndex = function() {
    if (accessoryindex <= 10){
        accessoryindex++;
    }
    if (accessoryindex > 10){
        accessoryindex = 0;
    }
}
subtractBlobAccIndex = function() {
    if (accessoryindex >= 0){
        accessoryindex--;
    }
    if (accessoryindex < 0){
        accessoryindex = 10;
    }
}

//CAT
addCatEarIndex = function() {
    if (cat_earindex <= 6){
        cat_earindex++;
    }
    if (cat_earindex > 6){
        cat_earindex = 1;
    }
}
subtractCatEarIndex = function() {
    if (cat_earindex >= 1){
        cat_earindex--;
    }
    if (cat_earindex < 1){
        cat_earindex = 6;
    }
}
addCatTailIndex = function() {
    if (cat_tailindex <= 12){
        cat_tailindex++;
        if (cat_tailindex > 12){
            cat_tailindex = 7;
        }
    }
}
subtractCatTailIndex = function() {
    if (cat_tailindex >= 7){
        cat_tailindex--;
        if (cat_tailindex < 7){
            cat_tailindex = 12;
        }
    }
}
addCatEyeIndex = function() {
    if (cat_eyeindex <= 18){
        cat_eyeindex++;
    }
    if (cat_eyeindex > 18){
        cat_eyeindex = 13;
    }
}
subtractCatEyeIndex = function() {
    if (cat_eyeindex >= 13){
        cat_eyeindex--;
    }
    if (cat_eyeindex < 13){
        cat_eyeindex = 18;
    }
}
addCatNoseIndex = function() {
    if (cat_noseindex <= 24){
        cat_noseindex++;
        if (cat_noseindex > 24){
            cat_noseindex = 19;
        }
    }
}
subtractCatNoseIndex = function() {
    if (cat_noseindex >= 19){
        cat_noseindex--;
        if (cat_noseindex < 19){
            cat_noseindex = 24;
        }
    }
}
addCatMouthIndex = function() {
    if (cat_mouthindex <= 30){
        cat_mouthindex++;
    }
    if (cat_mouthindex > 30){
        cat_mouthindex = 26;
    }
}
subtractCatMouthIndex = function() {
    if (cat_mouthindex >= 26){
        cat_mouthindex--;
    }
    if (cat_mouthindex < 26){
        cat_mouthindex = 30;
    }
}

//BUNNY
addBunnyEarIndex = function() {
    if (bunny_earindex <= 6){
        bunny_earindex++;
    }
    if (bunny_earindex > 6){
        bunny_earindex = 1;
    }
}
subtractBunnyEarIndex = function() {
    if (bunny_earindex >= 1){
        bunny_earindex--;
    }
    if (bunny_earindex < 1){
        bunny_earindex = 6;
    }
}
addBunnyEyeIndex = function() {
    if (bunny_eyeindex <= 12){
        bunny_eyeindex++;
    }
    if (bunny_eyeindex > 12){
        bunny_eyeindex = 7;
    }
}
subtractBunnyEyeIndex = function() {
    if (bunny_eyeindex >= 7){
        bunny_eyeindex--;
    }
    if (bunny_eyeindex < 7){
        bunny_eyeindex = 12;
    }
}
addBunnyNoseIndex = function() {
    if (bunny_noseindex <= 18){
        bunny_noseindex++;
    }
    if (bunny_noseindex > 18){
        bunny_noseindex = 13;
    }
}
subtractBunnyNoseIndex = function() {
    if (bunny_noseindex >= 13){
        bunny_noseindex--;
    }
    if (bunny_noseindex < 13){
        bunny_noseindex = 18;
    }
}
addBunnyMouthIndex = function() {
    if (bunny_mouthindex <= 24){
        bunny_mouthindex++;
    }
    if (bunny_mouthindex > 24){
        bunny_mouthindex = 19;
    }
}
subtractBunnyMouthIndex = function() {
    if (bunny_mouthindex >= 19){
        bunny_mouthindex--;
    }
    if (bunny_mouthindex < 19){
        bunny_mouthindex = 24;
    }
}

//DOG
addDogEarIndex = function() {
    if (dog_earindex <= 6){
        dog_earindex++;
    }
    if (dog_earindex > 6){
        dog_earindex = 1;
    }
}
subtractDogEarIndex = function() {
    if (dog_earindex >= 1){
        dog_earindex--;
    }
    if (dog_earindex < 1){
        dog_earindex = 6;
    }
}
addDogTailIndex = function() {
    if (dog_tailindex <= 12){
        dog_tailindex++;
        if (dog_tailindex > 12){
            dog_tailindex = 7;
        }
    }
}
subtractDogTailIndex = function() {
    if (dog_tailindex >= 7){
        dog_tailindex--;
        if (dog_tailindex < 7){
            dog_tailindex = 12;
        }
    }
}
addDogEyeIndex = function() {
    if (dog_eyeindex <= 18){
        dog_eyeindex++;
    }
    if (dog_eyeindex > 18){
        dog_eyeindex = 13;
    }
}
subtractDogEyeIndex = function() {
    if (dog_eyeindex >= 13){
        dog_eyeindex--;
    }
    if (dog_eyeindex < 13){
        dog_eyeindex = 18;
    }
}
addDogNoseIndex = function() {
    if (dog_noseindex <= 24){
        dog_noseindex++;
        if (dog_noseindex > 24){
            dog_noseindex = 19;
        }
    }
}
subtractDogNoseIndex = function() {
    if (dog_noseindex >= 19){
        dog_noseindex--;
        if (dog_noseindex < 19){
            dog_noseindex = 24;
        }
    }
}
addDogMouthIndex = function() {
    if (dog_mouthindex <= 30){
        dog_mouthindex++;
    }
    if (dog_mouthindex > 30){
        dog_mouthindex = 26;
    }
}
subtractDogMouthIndex = function() {
    if (dog_mouthindex >= 26){
        dog_mouthindex--;
    }
    if (dog_mouthindex < 26){
        dog_mouthindex = 30;
    }
}
