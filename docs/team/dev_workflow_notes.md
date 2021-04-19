# Dev Workflow Notes

## Dev environment setup
1. Add your AWS account to your aws-cli credentials file. [Learn more](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#use-an-existing-aws-profile).
   
   - Find the aws credential file at `~/.aws/credentials`. The `~` is your home directory; for example, on Windows, it's at `C:\Users\<your_windows_username>`.
   - Add the following to this file:
      ```
      [profileName, e.g. HKP]
      aws_access_key_id=***************
      aws_secret_access_key=***************
      ```


## Setup Resources (optional)
If you need new resources, e.g. new dynamoDB tables, you need to add it to [backend-serverless-resources repository](https://github.com/HKPSolutions/backend-serverless-resources).

1. Follow the example [here](https://github.com/HKPSolutions/backend-serverless-resources/pull/4/files) to add your new table to `lib\DynamoDbStack.js`. 

   - Add your table:
      (NOTE: you don't have to define data schema for dynamoDB tables.)

      ```js
      const resultsTable = new dynamodb.Table(this, "results", {
        partitionKey: {
          name: 'resultId',
          type: dynamodb.AttributeType.STRING
        }
      });
      ```

   - Export your resources:

      ```js
      makeCfnOutput(this, app, "results-table-name", resultsTable.tableName);
      makeCfnOutput(this, app, "results-table-arn", resultsTable.tableArn);
      ```

2. Then, push it back to github and create a PR. It will be deployed by SEED, and the `pr#` of this PR will be used as the `stage` for this deployment. **(TBD: Tag the PR draft with the `draft` label)**


## Develop Serverless functions
If you need to add new serverless functions, you need to add it to [backend-serverless-api repository](https://github.com/HKPSolutions/backend-serverless-api).

1. Initialize your service following the example [here](https://github.com/HKPSolutions/backend-serverless-api/pull/10/commits/d651e1ca863e4daef39ccf7f1c36f96b8f0fc08c). Then use the following command to test it.
   ```sh
   # modify the service_name, function_name, and mock_json_file accordingly.
   cd services/<service_name>
   serverless invoke local -f <function_name> -p <mock_json_file>

   # e.g.
   cd services/result
   serverless invoke local -f createResult -p createResult.json

   # You should be able to get a success result:
   # {
   #  "statusCode": 200,
   #  "headers": {
   #      "Access-Control-Allow-Origin": "*",
   #      "Access-Control-Allow-Credentials": true
   #  },
   #  "body": "{\"echo\":{\"x\":1,\"y\":2,\"operator\":\"add\"}}"
   # }
   ```

2. Push your branch to github and create a PR. Your PR will get deployed by SEED, and you can get your pr#. **(TBD: Tag the PR draft with the `draft` label)**

3. Setup the resources related config following this example [here](https://github.com/HKPSolutions/backend-serverless-api/pull/10/commits/a9eb1bda2877556d0169da9b803fb35f629f24e0).

   - In `services/<your_service>/serverless.yml`, config the table name and iamRoleStatement for your resource :
      ```yml
      provider:
        environment:
          # import the table name 
          # this comes from what we exported in the resources repo
          # we can get this env var in js with "process.env.resultsTableName"
          resultsTableName: !ImportValue '${self:custom.sstApp}-results-table-name'

        # config the iamRoleStatement 
        # so that this service have permission to use the resources
        # NOTE: permit only the needed actions  
        iamRoleStatements:
          - Effect: "Allow"
            Action:
            - dynamodb:PutItem
            Resource: !ImportValue '${self:custom.sstApp}-results-table-arn'
      ```

   - In your serverless function file, e.g. `services/result/createResult.js`, import the resources from the environment variables:
      ```js
      const resultsTableName = process.env.resultsTableName;
      ```

      Then, interact with the dynamo resources using our own library. Add dynamoDB functions in `lib/dynamo.js` as needed. 
        ```js
        import { Dynamo } from '../../libs/dynamo.js';

        export async function handler(event, context) {
          const data = {
            'resultId': "000",
            'result': 1,
          };
          const newResult = await Dynamo.put(data, resultsTableName);

          return success({
            result: newResult,
          });
        }
        ```

4. Add the sstMapping in `serverless.commom.yml` IFF your resource is NOT merged into master branch of resource repo yet.  
    ```yml
    custom:
      sstAppMapping: 
        # add the mapping here following the rule:
        # <pr#_of_your_branch_on_API_repo>: <pr#_of_your_branch_on_RESOURCE_repo>
        pr10: pr4
    ```
   
5. Test it with the following command. 
   When our PR is deployed by SEED, it sets the `stage` to the `pr#`, but `serverless invoke local` won't do that, so we need to specify it. We also need to use our HKP AWS account to interact with the resources on AWS. 
    ```sh
    # modify the service_name, function_name, and mock_json_file accordingly.
    cd services/<service_name>

    serverless invoke local \
    -f <function_name> \
    -p <mock_json_file> \
    --stage <pr\#_of_your_branch_on_API_repo> \
    --aws-profile <profile_name_in_~/.aws/credentials>

    # e.g.
    serverless invoke local \
    -f createResult \
    -p createResult.json \
    --stage pr10 \
    --aws-profile HKP

    # You should be able to get a success result and logs:
    # [INFO] params for Dynamo.put { TableName: 'pr4-beta-infra-dynamodb-results7EA05C64-1PE7G5W5P2M4Z',
    #   Item: { resultId: '000', result: 1 } }
    # {
    #     "statusCode": 200,
    #     "headers": {
    #         "Access-Control-Allow-Origin": "*",
    #         "Access-Control-Allow-Credentials": true
    #     },
    #     "body": "{\"result\":{\"resultId\":\"000\",\"result\":1},\"echo\":{\"x\":1,\"y\":2,\"operator\":\"add\"}}"
    # }
    ```

6. Add the actual business logic and develop your APIs. 
   
7. Test your APIs with `serverless invoke local` to catch any syntax and/or webpack errors that might cause fail deployment with SEED.

8. After you successfully deploy your service with SEED, go to AWS console -> API gateway to find the URL of your build. Test it with Postman. **(NOTE: now SEED is not deploying newly added services, ask Caleb to deploy it manually if needed.)**


## Testing
[Examples of mock.json for serverless invoke local](https://serverless-stack.com/chapters/invoke-lambda-functions-locally.html)


## Useful Git commands
1. stash local changes when you want to checkout to other branch, but don't want to commit these changes.
    ```sh
    # stash local changes
    git stash

    # list all stash
    git stash list

    # apply changes from a stash
    gut stash apply <stash_name>
    ```

2. create and checkout to a new feature branch
    ```sh
    git checkout -b <add-new-feature>
    ```

3. Before pushing your branch to github, merge master/main branch to resolve any potential conflicts.

    ```sh
    # update the master/main branch
    git checkout main
    git pull

    # on your feature branch, merge master
    git checkout <branch_name>
    git merge master

    # push your branch
    # set up the upstream with `-u` at the first push
    # Then you can simply use `git push`
    git push -u origin <branch_name> 
    ```


## Other References
[Serverless Stack Guideline](https://serverless-stack.com/#table-of-contents)
