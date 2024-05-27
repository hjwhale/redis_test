//redis-test.js
const { expect } = require('chai');

//HappyRedis Class
const HappyRedis = require('../happyredis');

let redisClient;

describe("redis connection test", () => {
  before("create redis client", () => {
    redisClient = new HappyRedis();
  });

  it("SET/GET Test", done => {
    //key : HappyKoo, value : GOOD 으로 저장
    redisClient.set("HappyKoo", "GOOD", setErr => {
      if(setErr) {
        console.error(setErr);
        return done(setErr);
      }
      redisClient.get("HappyKoo", (getErr, value) => {
        if(getErr) {
          console.error(getErr);
          return done(getErr);
        }
        expect(value).to.equal("GOOD");
        done();
      });
    });
    
  });

  after("redis connection close", done => {
    redisClient.quit(done);
  });
});