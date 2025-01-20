import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const pathToPrivateKey = path.join(__dirname + "/keys/id_rsa_priv.pem");
const privateKey = fs.readFileSync(pathToPrivateKey, "utf-8");

export const issueJWT = ({
  payload,
  options,
}: {
  payload: {
    id: bigint;
    username: string;
    email: string;
  };
  options: { expiresIn: string | number };
}) => {
  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    // allowInsecureKeySizes: true,
    expiresIn: options.expiresIn,
  });

  return token;
};
