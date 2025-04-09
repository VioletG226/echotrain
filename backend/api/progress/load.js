const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
  const userId = req.query.id;
  const AZURE_STORAGE_CONNECTION_STRING = process.env.SPEECH_STORAGE;
  const containerName = 'echotrain-recordings';
  const blobName = 'progress-records.json';

  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const buffer = await blobClient.downloadToBuffer();
    const text = buffer.toString();
    const records = JSON.parse(text);

    const userRecords = records.filter(r => r.id === userId);
    context.res = {
      body: userRecords
    };
  } catch (error) {
    context.res = {
      body: []
    };
  }
};
