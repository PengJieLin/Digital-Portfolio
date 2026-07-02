import json
import os
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = os.environ['TABLE_NAME']
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    # Atomically increment the count for item 'visits'
    response = table.update_item(
        Key={'id': 'visits'},
        UpdateExpression="ADD view_count :inc",
        ExpressionAttributeValues={':inc': 1},
        ReturnValues="UPDATED_NEW"
    )
    
    # Get the updated count
    count = int(response['Attributes']['view_count'])
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' # Required for CORS
        },
        'body': json.dumps({'count': count})
    }