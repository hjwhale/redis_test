//redis-test.js
const { expect } = require('chai');

//HappyRedis Class
const HappyRedis = require('../happyredis');

let redisClient;

describe("redis pub/sub Test", () => {
  before("create redis client", () => {
    publisher = new HappyRedis();
    //3개의 구독자
    subscribers = [ new HappyRedis(), new HappyRedis(), new HappyRedis() ];
  });

  it("pub/sub message Test", done => {
    let subCnt = 0,
        msgCnt = 0,
        channelName = "HappyKoo",
        pubMsg = "Hello!";

    console.log("pub/sub messag");
    subscribers.forEach( subscriber => {
      //channel "HappyKoo" 구독
      console.log("channel HappyKoo subscribe");
      subscriber.subscribe(channelName);
      console.log("channel HappyKoo subscribe complete");
     
      //구독 완료 했을 때
      subscriber.on("subscribe", (channel, count) => {
        expect(channel).to.equal(channelName);
        if(++subCnt === subscribers.length) {
          //메시지 전송
          publisher.publish(channelName, pubMsg);
        }
      });

      subscriber.on("message", (channel, message) => {
        expect(channel).to.equal(channelName);
        expect(message).to.equal(pubMsg);
        if(++msgCnt === subscribers.length) {
          done();
        }
      });
     
    });
  });

  after(() => {
    subscribers.forEach( subscriber => {
      //구독 취소
      subscriber.unsubscribe("HappyKoo")
      subscriber.quit();
    });
    publisher.quit();
  });
});