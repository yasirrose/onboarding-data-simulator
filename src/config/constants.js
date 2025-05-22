const PORT = process.env.PORT || 3000;
const DATA_INGESTION_URL = process.env.DATA_INGESTION_URL || 'https://dummy-s3-location.com/ingest';
const DATA_INGESTION_TIMEOUT = process.env.DATA_INGESTION_TIMEOUT || 5000;

module.exports = {
  PORT,
  DATA_INGESTION_URL,
  DATA_INGESTION_TIMEOUT
};
