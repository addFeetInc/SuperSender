
//////////AUXILIARY FUNCTIONS//////////

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

//FUNCTIONS: Test String for Column Properties

function isHidden(string_val){
    if(string_val.trim()[0] === '.'){return true}else{return false}
}

function isPoint(string_val){
    if (string_val.trim()[0] === '!' || ( string_val.trim().slice(0,2) === '.!' )){return true}else{return false}
}

function isGroup(string_val){
    if (string_val.trim()[0] === '#' || ( string_val.trim().slice(0,2) === '.#' )){return true}else{return false}
}

function isInteger(string_val){
    if (string_val.trim()[0] === '&' || ( string_val.trim().slice(0,2) === '.&' )){return true}else{return false}
}

function isPointOrGroup(string_val){
    if (isGroup(string_val) || isPoint(string_val)){return true}else{return false}
}

function isStringArrayOfIntegers(string_val){
    if (string_val.trim()[0] === '%' || ( string_val.trim().slice(0,2) === '.%' )){return true}else{return false}
}

function isStringArrayOfStrings(string_val){
    if (string_val.trim()[0] === '*' || ( string_val.trim().slice(0,2) === '.*' )){return true}else{return false}
}


//FUNCTIONS: Test Column Object for Properties

function isStringColFromObject(column_obj){
    if(column_obj.dataType == '_'){return true}else{return false}
}

function isGroupColFromObject(column_obj){
    if(column_obj.dataType == '#'){return true}else{return false}
}

function isPointColFromObject(column_obj){
    if(column_obj.dataType == '!'){return true}else{return false}
}

function isIntegerColFromObject(column_obj){
    if(column_obj.dataType == '&'){return true}else{return false}
}

function isPointOrGroupColFromObject(column_obj){
    if(column_obj.dataType == '!' || column_obj.dataType == '#'){return true}else{return false}
}

function isStrArrIntColFromObject(column_obj){
    if(column_obj.dataType == '%'){return true}else{return false}
}

function isStrArrStrColFromObject(column_obj){
    if(column_obj.dataType == '*'){return true}else{return false}
}

function isHiddenColFromObject(column_obj){
    if(column_obj.hideColumn){return true}else{return false}
}


//FUNCTIONS: Test Column Name for Properties 

function colObjectFromName(column_name, column_array){
    return column_array.find(obj=>obj.name == column_name)
}

function isStringColFromName(column_name, column_array){
    const object = column_array.find(obj=>obj.name == column_name)
    if(object.dataType == '_'){return true}else{return false}
}

function isGroupColFromName(column_name, column_array){
    const object = column_array.find(obj=>obj.name == column_name)
    if(object.dataType == '#'){return true}else{return false}
}

function isPointColFromName(column_name, column_array){
    const object = column_array.find(obj=>obj.name == column_name)
    if(object.dataType == '!'){return true}else{return false}
}

function isIntegerColFromName(column_name, column_array){
    const object = column_array.find(obj=>obj.name == column_name)
    if(object.dataType == '&'){return true}else{return false}
}

function isPointOrGroupColFromName(column_name, column_array){
    const object = column_array.find(obj=>obj.name == column_name)
    if(object.dataType == '!' || object.dataType == '#'){return true}else{return false}
}

function isStrArrIntColFromName(column_name, column_array){
    const object = column_array.find(obj=>obj.name == column_name)
    if(object.dataType == '%'){return true}else{return false}
}

function isStrArrStrColFromName(column_name, column_array){
    const object = column_array.find(obj=>obj.name == column_name)
    if(object.dataType == '*'){return true}else{return false}
}

function isHiddenColFromName(column_name, column_array){
    const object = column_array.find(obj=>obj.name == column_name)
    if(object.hideColumn){return true}else{return false}
}


//FUNCTIONS: Modify String

function insertPeriodAtFront(input){
    return `.${input}`
}

function removePeriodsFromFront(input){
    if(input.startsWith('.')){
        return input.slice(1)
    }else{
        return input
    }
}

function underscoreToSpace(string_val){
    const out_string = string_val.replace(/_/g, ' ').trim()
    return out_string
}

function spaceToUnderscore(string_val){
    const out_string = string_val.trim().replace(/ /g, '_')
    return out_string
}

function cleanColumnName(column_name){
    let new_name = spaceToUnderscore(column_name.trim())
    const regex = /^(#|!|%|\*|&)/
    if(isHidden(column_name)){
        new_name = removeFirstCharacter(new_name)
    }
    if (regex.test(new_name)){
        new_name = removeFirstCharacter(new_name)
    }
    return new_name
}

function removeFirstCharacter(string){
    return spaceToUnderscore(string.trim().slice(1))
}

function stripBrackets(string){
    let new_string = string.trim()
    const regexFront = /^\[/
    const regexBack = /\]$/
    return new_string.replace(regexFront,'').replace(regexBack,'').trim()
}

function hasBrackets(string){
    const test_string = string.trim()
    const regexFront = /^\[/
    const regexBack = /\]$/
    if (regexFront.test(test_string) && regexBack.test(test_string)){
        return true
    }else{
        return false
    }
}

//FUNCTIONS: Verify data format

function checkStringArrayOfIntegers(input){
    if(typeof input === typeof " "){}else{return false}
    let trimmed_string = input.trim()
    if(hasBrackets(trimmed_string)){
        trimmed_string = stripBrackets(trimmed_string)
    }
    if(trimmed_string.trim()==''){
        return true
    }
    new_array = trimmed_string.split(",").map(val=>val.trim())
    console.log(new_array)
    for (let val of new_array){
        if (parseInt(val)){}else{console.log(`${val} is not an integer`); return false}
    }
    return true
}

function checkStringArrayOfStrings(input){
    if(typeof input === typeof " "){}else{return false}
    let trimmed_string = input.trim()
    if(hasBrackets(trimmed_string)){
        trimmed_string = stripBrackets(trimmed_string)
    }
    if(trimmed_string.trim()==''){
        return true
    }
    new_array = trimmed_string.split(",").map(val=>val.trim())
    console.log(new_array)
    for (let val in new_array){
        if (parseInt(val)){}else{return true}
    }
    return false
}

//FUNCTIONS: Test Object Same
function compareObjects(object1, object2){
    for (let prop in object1){
        if (object1[prop] == object2[prop]){}else{return false}
    }
    for (let prop in object2){
        if (object2[prop] == object1[prop]){}else{return false}
    }
    return true
}

//FUNCTIONS: Parse strings to formatted data
function parseArrayOfStrings(input){
    if(checkStringArrayOfStrings(input)){}else{console.error(`error: ${input} is not string containing array of strings`)}
    let trimmed_string = input.trim()
    if(hasBrackets(trimmed_string)){
        trimmed_string = stripBrackets(trimmed_string)
    }
    const output = trimmed_string ? trimmed_string.split(",").map(val=>cleanColumnName(val.trim())) : []
    return output
}

function parseArrayOfIntegers(input){
    if(checkStringArrayOfIntegers(input)){}else{console.error(`error: ${input} is not string containing array of integers`)}
    console.log(input)
    let trimmed_string = input.trim()
    if(hasBrackets(trimmed_string)){
        trimmed_string = stripBrackets(trimmed_string)
    }
    const output = trimmed_string ? trimmed_string.split(",").map(val=>parseInt(val.trim())) : []
    return output
}

