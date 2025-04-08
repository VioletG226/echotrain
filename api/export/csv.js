const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
  const containerName = 'echotrain-recordings';
  const blobName = 'progress-records.json';

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.SPEECH_STORAGE);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);

    const buffer = await blobClient.downloadToBuffer();
    const content = JSON.parse(buffer.toString());

    const headers = ['id', 'taskId', 'accuracy', 'fluency', 'pronunciation', 'completeness', 'audioUrl', 'timestamp'];
    const csv = [
      headers.join(','),
      ...content.map(r => headers.map(k => r[k] || '').join(','))
    ].join('\n');

    context.res = {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="records.csv"'
      },
      body: csv
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: '无法导出 CSV', detail: err.message }
    };
  }
};
