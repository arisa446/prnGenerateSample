//github test

console.log('Loading function');
        
import {S3Client, GetObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';

// import { Readable } from 'stream';

// import sharp from 'sharp';
// import util from 'util';


const s3 = new S3Client({region: 'ap-northeast-1'});



export const handler = async (event, context) => {
  
    // Get the object from the event and show its content
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: srcBucket,
        Key: srcKey,
    }; 
    const dstBucket = srcBucket + "-done";
    const dstKey    = "done-" + srcKey;
    
    try {
        const { ContentType } = await s3.send(new GetObjectCommand(params));
        console.log('FILE NAME:', srcKey);
        console.log('CONTENT TYPE:', ContentType);
        // return ContentType;
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${srcKey} from bucket ${srcBucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
    
    // Put the object
    try {
        const destparams = {
            Bucket: dstBucket,
            Key: dstKey + ".txt",
            Body: "prn!!"
        };
        const putResult = await s3.send(new PutObjectCommand(destparams));
    } catch (error) {
        console.log(error);
        return;
    }
    
};
