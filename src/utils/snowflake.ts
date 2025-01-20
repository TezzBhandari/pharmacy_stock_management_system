import { Worker } from "snowflake-uuid";

const snowflake = new Worker(0, 1, {
  workerIdBits: 5,
  datacenterIdBits: 5,
  sequenceBits: 12,
});

export { snowflake };
