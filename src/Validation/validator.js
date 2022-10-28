//---------------------------------------importing mongoose--------------------------------------------

const mongoose = require('mongoose');

//----------------------------------------Validation Functionss--------------------------------------


const isNotEmpty = function (value) {
    if (value.trim().length != 0) return true;
    return false;
}

const isWrong = function (value) {
    if (value.match(/^[A-Za-z]+$/)) return true;
    return false;
}

const isValidEmail = function (value) {
    return (/^[a-z]{1}[a-z-A-Z-0-9]{1,}@[a-z-A-Z]{3,}[.]{1}[a-z]{3,6}$/).test(value)

}



const isString=function(value){
    if(typeof value==="string")
    return true
    return false
}
const typeValid=function(value){
    if(typeof value==="object") return true
    return false
}

const keysLength=function(value){
    if(Object.values(value).length != 0) return true
    return false
}


const validBoolean= function (value){
    if(typeof value === "boolean") return true
    return false
}

const isValidName = function (value) {
    if (typeof value === "undefined" || value === null || value == " ")
        return false;
    if (typeof value === "string" && value.trim().length > 0 && value.match(/^[a-zA-Z]*$/))
        return true;
    return false;
}

const isValidPass = function (value) {
    if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/))
        return true
    return false

}

const isValid=function(value){
    if (typeof value === "undefined" || value === null || value == " ")
        return false;
    if (typeof value === "string" && value.trim().length > 0)
        return true;
    return false;
}



//------------------------------ exporting all the functions here------------------------------------

module.exports = {isValidName, isValid, isNotEmpty, isWrong,isValidEmail,isString, typeValid,keysLength, isValidPass, validBoolean};


