//redis와 connection을 맺고 이벤트를 다루는 HappyRedis 클래스
const conf = require('./conf/redis-conf');
const redis = require('redis');


module.exports = class {
    constructor() {
        this._setRedis();
      }

        //set 명령 실행 추가
      set(key, value, callback) {
        this.client.set(key, value, callback);
      }

      //get 명령 실행 추가
      get(key, callback) {
        this.client.get(key, callback);
      }

      //event listener 등록
      on(event, callback) {
        this.client.on(event, callback);
      }
      //채널에 메세지 전송
      publish(channel, message) {
        this.client.publish(channel, message);
      }
      //채널 구독
      subscribe(channel) {
        this.client.subscribe(channel);
      }
      //채널 구독 취소
      unsubscribe(channel) {
        this.client.unsubscribe(channel);
      }
      _setRedis() {
        this._setRedisClient();
   
        this.client.on('connect', this._connectHandler);
        //connection error
        this.client.on('error', this._errorHandler);
        //connection close
        this.client.on('end', this._endHandler);

      }

      //error Handler 추가
      _errorHandler(err) {
        console.error("######Redis connection Error!! >>", err);
      }
    
      //end Handler 추가
      _endHandler() {
        console.error("######Redis connection close!!");
      }
      _connectHandler() {
        console.log("#######Redis connection!");
      }

      _setRedisClient() {
        //redis client 생성
        this.client = redis.createClient(`redis://${conf.user}:${conf.password}@${conf.host}:${conf.port}`);
      }
  }