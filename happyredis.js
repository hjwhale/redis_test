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
      quit(callback) {
        this.client.quit(callback);
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

        //this.client.connect().then();
        this.client.connect();

        this.client.on('connect', this._connectHandler);
        //connection error
        this.client.on('error', this._errorHandler);
        //connection close
        this.client.on('end', this._endHandler);


//        redisClient.on('connect', () => {
//          console.info('Redis connected!');
//       });



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
        console.log('_setRedisClient');
        //redis client 생성
        //this.client = redis.createClient(`redis://${conf.user}:${conf.password}@${conf.host}:${conf.port}`);   'redis://alice:foobared@awesome.redis.server:6380'

      //  this.client = redis.createClient( `url: redis://127.0.0.1:6379'`);  // redis.createClient('redis://127.0.0.1:6379');
        //this.client = redis.createClient({ legacyMode: true }); 
        this.client = redis.createClient({ url: "redis://localhost:6379" });
        
      }
  }