import crypto from "crypto";

class GenerateId {
  async user_id() {
    const dateTime = new Date().getTime();
    const id = crypto.randomUUID();
    return `${id}${dateTime}`;
  }

  async ohter_id() {
    const number = crypto.randomInt(100, 999999999999);
    const id = crypto.randomUUID();
    return `${number}${id}`;
  }
}

export const generate = new GenerateId();
