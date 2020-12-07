exports.handler = async (event, context) => {
  console.log(event);
  try {
    return { statusCode: 200, body: 'Testing the serverless functions' };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
