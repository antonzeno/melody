import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
require('dotenv').config();

export const generateSaltedHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export const verifyPassword = async (password: string, storedHash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, storedHash, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

export const encrypt = (text: string) => {
    let iv = crypto.randomBytes(parseInt(process.env.CRYPTO_ENCRYPT_LENGTH));
    let cipher = crypto.createCipheriv(process.env.CRYPTO_ALGORITHM, Buffer.from(process.env.CRYPTO_ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}