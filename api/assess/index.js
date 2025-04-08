const axios = require('axios');

module.exports = async function (context, req) {
  const { audio, text, id, taskId } = req.body;
  const subscriptionKey = process.env.SPEECH_ASSESS;
  const region = process.env.AZURE_REGION;

  const buffer = Buffer.from(audio, 'base64');

  const url = `https://${region}.api.cognitive.microsoft.com/speechtotext/v3.0/evaluation`;

  try {
    const response = await axios.post(url, buffer, {
      params: {
        displayText: text
      },
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'audio/wav'
      }
    });

    const result = response.data;
    result.id = id;
    result.taskId = taskId;
    result.timestamp = new Date().toISOString();

    context.res = {
      body: result
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: '评分失败', detail: error.message }
    };
  }
};
