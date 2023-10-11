import * as bcrypt from 'bcrypt';

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