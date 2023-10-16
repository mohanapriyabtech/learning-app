import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Session } from '../modules/v1/admin/models/session-model';

const ENCRYPTION_KEY = process.env.SC_ENCRYPTION_KEY || 'agdjhjdhfjdjshkjgfghnbjkggnhhnbv'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text, encryptionKey = ENCRYPTION_KEY) {
  let iv = Buffer.from(crypto.randomBytes(IV_LENGTH)).toString('hex').slice(0, IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv + ':' + encrypted.toString('hex');
}


export function decrypt(text, encryptionKey = ENCRYPTION_KEY) {
  try {
   
    let textParts = text.includes(':') ? text.split(':') : [];
    let iv = Buffer.from(textParts.shift() || '', 'binary');
    console.log(textParts,iv,"----------")
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
  catch (error) {
    if (error) {
      console.log("error in decrypt")
    }
  }
}

export const createSession = (user, device) => {
  return new Promise((resolve, reject) => {
    let tokenParams = {
      id: user._id,
      email: user.email,
      name: user.name,
      time: new Date().valueOf()
    }
    if (device) {
      tokenParams.device_information = device
    }
    checkSession(user._id)
    const sessionParam = {
      session_token: jwt.sign(tokenParams, process.env.SECRET_KEY),
      user_id: user._id,
    };

    const session = new Session(sessionParam);
    session.save()
      .then(_session => {
        resolve(_session);
      })
      .catch(error => {
        reject(error.message);
      });
  });
}

/**
* update user details
* @returns Promise<error | user>
*/
export const logoutSession = (session) => {
  return new Promise(async (resolve, reject) => {
    session = session.split(' ')
    Session.findOneAndDelete({ session_token: session })
      .then(session => {
        resolve(session);
      })
      .catch(error => {
        reject(error.message);
      });
  });
}


/**
* check user session
* @returns Promise<error | user>
*/
export const checkSession = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Session.find({ user_id: id })
        .then(async result => {
          if (result.length > 50) {
            await Session.deleteMany({ user_id: id })
          }
          resolve('sucess')
        })
        .catch(error => {
          reject(error.message);
        });
    }
    catch (err) {
      reject(err)
    }
  })
}