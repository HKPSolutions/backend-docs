echo "Generate documentation for backend-serverless-api."
echo "api id?"
echo -n "> "
read apiId
echo "aws stage name?"
echo -n "> "
read stage
echo "output file name?"
echo -n "> "
read file;
aws apigatewayv2 export-api --api-id $apiId --output-type YAML --specification OAS30 --stage-name $stage $file