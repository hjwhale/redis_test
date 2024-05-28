const redis = require('redis');

const subscriber = redis.createClient();

subscriber.on('message', (channel, message) => {
  console.log(`Received message: ${message} from channel: ${channel}`);
});

// 'test-channel' 채널을 구독
subscriber.subscribe('test-channel');
