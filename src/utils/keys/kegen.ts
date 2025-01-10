import crypto from "crypto";
import fs from "fs";

const genKeyPair = () => {
    // generates public and private key
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "spki",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            //   cipher: "aes-256-cbc",
            //   passphrase: "innov8ITCode@code.com",
        },
    });

    // Create the public key file
    fs.writeFileSync(__dirname + "/id_rsa_pub.pem", publicKey);

    // Create the private key file
    fs.writeFileSync(__dirname + "/id_rsa_priv.pem", privateKey);
};

genKeyPair();
