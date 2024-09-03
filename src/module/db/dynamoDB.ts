import AWS from 'aws-sdk'
export default class DynamoDataBase {

    constructor() {}
    dynamoClient() {
        return new AWS.DynamoDB.DocumentClient()
    }

}
