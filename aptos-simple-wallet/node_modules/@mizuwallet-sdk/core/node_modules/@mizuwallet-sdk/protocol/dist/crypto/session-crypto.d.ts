export interface KeyPair {
    publicKey: string;
    secretKey: string;
}
export declare class SessionCrypto {
    private readonly nonceLength;
    private readonly keyPair;
    readonly sessionId: string;
    constructor(keyPair?: KeyPair);
    private createKeypair;
    private createKeypairFromString;
    private createNonce;
    encrypt(message: string, receiverPublicKey: Uint8Array): Uint8Array;
    decrypt(message: Uint8Array, senderPublicKey: Uint8Array): string;
    stringifyKeypair(): KeyPair;
    static generateKeyPairByString(str: string): Promise<KeyPair>;
    static isSameKeypair(key1: KeyPair | undefined, key2: KeyPair | undefined): boolean;
}
