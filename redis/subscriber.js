const redis = require("redis");

const subscriber = redis.createClient({ url: "redis://localhost:6379" });
subscriber.connect();

subscriber.subscribe("counter.updates", async (message) => {
  console.log(message);
});

subscriber.subscribe("healthcheck", (message) => {
  const parsed = JSON.parse(message);
  console.log(parsed.intervalCycles);
});