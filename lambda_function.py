"""
AWS Lambda Handler: Resume Visitor Counter
Atomically increments and retrieves the page view count from Amazon DynamoDB.
Invoked via AWS API Gateway with CORS support for static frontend integration.
"""

import json
import os
import boto3

# Initialize DynamoDB resource outside handler to leverage Lambda execution context reuse (warm starts)
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

    count = int(response['Attributes']['view_count'])

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'  # Required for cross-origin API Gateway integration
        },
        'body': json.dumps({'count': count})
    }