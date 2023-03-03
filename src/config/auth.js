import jwt_decode from "jwt-decode";
const moment = require("moment");

export const isAuthenticated = () => {
    if(getToken()) {
        if(moment() > moment(jwt_decode(getToken()).tokenObj.tokenExpiration)) {
            localStorage.removeItem('TEST_KEY');
            return null;  
        } 
        return true;
    } 
    return false;
};

export const isAdmin = () => {
    if (isAuthenticated()) {
        const token = jwt_decode(getToken());
        if (token.tokenObj.role === "admin") {
            return true;
        }
    }
    return false;
}

export const getToken = () => {
    if (localStorage.getItem('TEST_KEY')) {
        return localStorage.getItem('TEST_KEY');
    }
    return false;
};

export const decodeToken = (token) => {
    if (token){
        if(moment() > moment(jwt_decode(token).tokenObj.tokenExpiration)) return null;
        return jwt_decode(token);
    } else {
        return null;
    }
};