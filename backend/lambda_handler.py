from app import app

def handler(event, context):
    """AWS Lambda handler for Flask app"""
    from serverless_wsgi import handle_request
    return handle_request(app, event, context) 