const redis = require("redis");

const publisher = redis.createClient({ url: "redis://localhost:6379" });
publisher.connect();

let intervalCycles = 0;
setInterval(async () => {
  intervalCycles++;
  const counter = await publisher.incr("counter");
  publisher.publish("counter.updates", `New counter value: ${counter}`);
}, 2500);

setInterval(async () => {
  publisher.publish(
    "healthcheck",
    JSON.stringify({
      intervalCycles: `Right now, ${intervalCycles} intervals has been performed`,
    })
  );
}, 5000);