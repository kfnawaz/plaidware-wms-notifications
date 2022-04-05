const { admin } = require('.');

/**
 *
 * @param {string} userToken
 * @param {string} title
 * @param {string} body
 * @param {string} type Notification type
 */
const sendToOne = (userToken, title, body, type = '') => {
  // This registration userToken comes from the client FCM SDKs, saved in the users document
  // const userToken = 'USER_REGISTRATION_TOKEN';

  const message = {
    android: {
      notification: {
        title,
        body,
      },
    },
    // below is for iOS
    notification: {
      title,
      body,
    },
    data: {
      type,
    },
    token: userToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.warn('Error sending Firebase notification:', error);
    });
};

const sendToMany = (registrationTokens, title, body) => {
  // These registration tokens come from the client FCM SDKs
  // const registrationTokens = ['USER_REGISTRATION_TOKEN_1', 'USER_REGISTRATION_TOKEN_N'];

  const message = {
    android: {
      notification: {
        title,
        body,
      },
    },
    // below is for iOS
    notification: {
      title,
      body,
    },
    tokens: registrationTokens,
  };

  admin
    .messaging()
    .sendMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(registrationTokens[idx]);
          }
        });
        console.warn('List of tokens that caused failures:', { failedTokens });
      }
    })
    .catch((err) => {
      console.error('Error sending Firebase notification', { err });
    });
};

const sendToSubscribed = (topic, title, body) => {
  // The topic name can be optionally prefixed with "/topics/".
  // const topic = 'highScores';

  const message = {
    android: {
      notification: {
        title,
        body,
      },
    },
    // below is for iOS
    notification: {
      title,
      body,
    },
    topic: topic,
  };

  // Send a message to devices subscribed to the provided topic.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.debug('Successfully sent message:', response);
    })
    .catch((error) => {
      console.warn('Error sending message:', error);
    });
};

const firebaseNotification = {
  sendToOne,
  sendToMany,
  sendToSubscribed,
};

module.exports = firebaseNotification;
