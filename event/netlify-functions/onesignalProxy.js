const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const response = await fetch('https://cdn.onesignal.com/sdks/OneSignalPageSDKES6.js?v=151601');
    const text = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://eventx.social', // Replace with your custom domain
        'Content-Type': 'text/javascript',
      },
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};