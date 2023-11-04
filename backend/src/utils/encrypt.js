import crypto from 'crypto';
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


export const createSession = async (user, device) => {
  try {
    const tokenParams = {
      id: user._id,
      email: user.email,
      number: user.phone_number,
      name: user.name,
      time: new Date().valueOf()
    };

    if (device) {
      tokenParams.device_information = device;
    }

    await checkSession(user._id);

    const sessionParam = {
      session_token: encrypt(JSON.stringify(tokenParams)),
      user_id: user._id,
    };

    const session = await new Session(sessionParam).save();

    return session;
  } catch (error) {
    throw error.message;
  }
};


/**
 * Log out a session
 * @param {string} session - The session token to be logged out
 * @returns {Promise<error | session>}
 */
export const logoutSession = async (session) => {
  try {
    session = session.split(' ');
    const deletedSession = await Session.findOneAndDelete({ session_token: session });
    return deletedSession;
  } catch (error) {
    throw error.message;
  }
};


/**
 * Check user session and delete sessions if there are more than 50
 * @param {string} id - The user's ID to check sessions for
 * @returns {Promise<string | Error>} A success message or an error
 */
export const checkSession = async (id) => {
  try {
    const result = await Session.find({ user_id: id });

    if (result.length > 50) {
      await Session.deleteMany({ user_id: id });
    }

    return 'success';
  } catch (error) {
    throw error.message;
  }
};