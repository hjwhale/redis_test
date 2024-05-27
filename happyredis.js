//redis와 connection을 맺고 이벤트를 다루는 HappyRedis 클래스
const conf = require('./conf/redis-conf');
const redis = require('redis');


module.exports = class {
    constructor() {
        this._setRedis();
      }

      _setRedis() {
        this._setRedisClient();
    
        //connect 성공
        this.client.on('connect', this._connectHandler);
      }

      _connectHandler() {
        console.log("#######Redis connection!");
      }

      _setRedisClient() {
        //redis client 생성
        this.client = redis.createClient(`redis://${conf.user}:${conf.password}@${conf.host}:${conf.port}`);
      }
  }