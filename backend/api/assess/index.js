const { app } = require('@azure/functions');
const axios = require('axios');

app.http('assess', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const { audio, text, id, taskId } = await request.json();
    const subscriptionKey = process.env.SPEECH_ASSESS;
    const region = process.env.REGION;

    const buffer = Buffer.from(audio, 'base64');
    const url = `https://${region}.api.cognitive.microsoft.com/speechtotext/v3.0/evaluation`;

    try {
      const response = await axios.post(url, buffer, {
        params: { displayText: text },
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'audio/wav',
        },
      });

      const result = response.data;
      result.id = id;
      result.taskId = taskId;
      result.timestamp = new Date().toISOString();

      return { jsonBody: result };
    } catch (error) {
      return {
        status: 500,
        jsonBody: {
          error: '评分失败',
          detail: error.message,
        },
      };
    }
  },
});
