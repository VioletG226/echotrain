const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
  const record = req.body; // 包含 id, taskId, accuracy, audioUrl, timestamp 等

  const AZURE_STORAGE_CONNECTION_STRING = process.env.SPEECH_STORAGE;
  const containerName = 'echotrain-recordings';
  const blobName = 'progress-records.json';

  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  let records = [];

  try {
    const download = await blobClient.downloadToBuffer();
    const text = download.toString();
    records = JSON.parse(text);
  } catch (err) {
    context.log('记录初始化为空');
  }

  records.push(record);

  try {
    const uploadBuffer = Buffer.from(JSON.stringify(records, null, 2));
    await blobClient.uploadData(uploadBuffer, { overwrite: true });

    context.res = {
      body: { success: true }
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: '记录保存失败', detail: error.message }
    };
  }
};
