import Cryptr from "cryptr";

const cryptrKey = process.env.CRYPTR_KEY || 'cryptr';
const cryptr = new Cryptr(cryptrKey);

export function encrypt(decryptedPassword){
    const encryptedPassword = cryptr.encrypt(decryptedPassword);
    return encryptedPassword;
};

export function decrypt(encryptedPassword){
    const decryptedPassword = cryptr.decrypt(encryptedPassword);
    return decryptedPassword;
};

export function compare(password:string,encryptedPassword:string){
    const decryptedPassword = cryptr.decrypt(encryptedPassword);
    if ( decryptedPassword === password ) return true 
    else return false
};