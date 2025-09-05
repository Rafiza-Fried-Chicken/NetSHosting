const fs = require('fs');
* S3/R2 storage (if env present)
*/
async function putS3(buffer, mime) {
const client = new S3Client({
region: process.env.S3_REGION || 'auto',
endpoint: process.env.S3_ENDPOINT,
credentials: {
accessKeyId: process.env.S3_ACCESS_KEY_ID,
secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
},
forcePathStyle: true,
});
const key = `${Date.now()}-${randomUUID()}`;
await client.send(new PutObjectCommand({
Bucket: process.env.S3_BUCKET,
Key: key,
Body: buffer,
ContentType: mime || 'application/octet-stream',
}));
return { key, url: null }; // signed per-request
}


async function signedS3(key) {
if (!getSignedUrl) return null;
const client = new S3Client({
region: process.env.S3_REGION || 'auto',
endpoint: process.env.S3_ENDPOINT,
credentials: {
accessKeyId: process.env.S3_ACCESS_KEY_ID,
secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
},
forcePathStyle: true,
});
const cmd = new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });
const url = await getSignedUrl.getSignedUrl(client, cmd, { expiresIn: 60 * 10 });
return url;
}


async function putObject(buffer, mime) {
if (DRIVER === 's3' && process.env.S3_BUCKET) return putS3(buffer, mime);
return putLocal(buffer, mime);
}


async function getSignedUrlFor(key) {
if (DRIVER === 's3' && process.env.S3_BUCKET) return signedS3(key);
return signedLocal(key);
}


module.exports = { putObject, getSignedUrlFor };

