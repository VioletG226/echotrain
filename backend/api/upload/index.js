const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
  const { audio, filename } = req.body;

  const AZURE_STORAGE_CONNECTION_STRING = process.env.SPEECH_STORAGE;
  const containerName = 'echotrain-recordings';

  try {
    const buffer = Buffer.from(audio, 'base64');
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: 'audio/wav' }
    });

    const blobUrl = blockBlobClient.url;

    context.res = {
      body: { url: blobUrl }
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: '上传失败', detail: err.message }
    };
  }
};
