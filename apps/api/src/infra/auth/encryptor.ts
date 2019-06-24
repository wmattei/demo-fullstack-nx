import * as crypto from 'crypto';

export class Encryptor {
    public static encrypt(password: string) {
        return crypto.createHmac('sha256', password).digest('hex');
    }
}
