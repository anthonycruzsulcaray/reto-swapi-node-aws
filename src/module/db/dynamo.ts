import AWS from 'aws-sdk'
export default class DynamoDataBase {
    
    dynamoClient() {
        return new AWS.DynamoDB.DocumentClient()
    }

}
