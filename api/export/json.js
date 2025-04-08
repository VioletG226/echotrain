const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
  const containerName = 'echotrain-recordings';
  const blobName = 'progress-records.json';

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.SPEECH_STORAGE);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);

    const buffer = await blobClient.downloadToBuffer();
    const content = buffer.toString();

    context.res = {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="records.json"'
      },
      body: content
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: '无法导出 JSON 数据', detail: err.message }
    };
  }
};
