// publisher.js
const redis = require('redis');
const publisher = redis.createClient();

publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

publisher.on('error', (err) => {
  console.log('Redis client could not connect to the server', err);
});

// 메시지를 발행하는 함수
function publishMessage(channel, message) {
  publisher.publish(channel, message, (error, count) => {
    if (error) {
      console.error('Failed to publish message', error);
    } else {
      console.log(`Message sent to ${count} subscribers`);
    }
  });
}

// 'test-channel' 채널에 'Hello, World!' 메시지를 발행
publishMessage('test-channel', 'Hello, World!');