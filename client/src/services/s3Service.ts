import AWS from "aws-sdk";

const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: process.env.REACT_APP_AWS_REGION,
});

export const uploadToS3 = async (
    file: File,
    bucketName: string,
    folderName: string,
) => {
    const params = {
        Bucket: bucketName,
        Key: `${folderName}/${file.name}`,
        Body: file,
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (error) {
        throw error;
    }
};
