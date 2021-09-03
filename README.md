# vue-test-aws-s3-deploy

### Instruction to deploy
1. Create the folder *.github* with a folder *workflows* in it on project root level
2. Set AWS S3 and CloudFront configuration on you AWS account.    



2. Add github action yml file with next content
    ```yaml
    name: deploy-app-on-s3
    
    on:
      pull_request:
        branches: [master]
        types: [closed]
    jobs:
      deploy:
        runs-on: ubuntu-latest
        env:
          AWS_S3_BUCKET_NAME: ${{ secrets.AWS_SECRET_S3_BUCKET }}
          AWS_CF_DISTRIBUTION_ID: ${{ secrets.AWS_SECRET_CLOUDFRONT_DISTRIBUTION_ID }}
        strategy:
          matrix:
            node-version: [10.x]
        steps:
          - uses: actions/checkout@master
          - name: Use Node.js ${{ matrix.node-version }}
            uses: actions/setup-node@v1
            with:
              node-version: ${{ matrix.node-version }}
    
          - name: Install Dependencies
            run: npm install
    
          - name: Build Application
            run: npm run-script build
    
          - uses: jakejarvis/s3-sync-action@master
            name: Upload App to S3 Bucket
            with:
              args: --follow-symlinks --delete
            env:
              AWS_S3_BUCKET: ${{ env.AWS_S3_BUCKET_NAME }}
              AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
              AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
              AWS_REGION: ${{ secrets.AWS_SECRET_REGION }}
              SOURCE_DIR: "dist"
    
          - name: Create CloudFront Cache Invalidation
            uses: chetan/invalidate-cloudfront-action@master
            env:
              DISTRIBUTION: ${{ env.AWS_SECRET_CLOUDFRONT_DISTRIBUTION_ID }}
              PATHS: "/*"
              AWS_REGION: ${{ secrets.AWS_SECRET_REGION }}
              AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
              AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    ```
    How to work with github action you can read [here](url=https://github.com/github/actions-cheat-sheet/blob/master/actions-cheat-sheet.pdf)
    1. Name of action
    ```yaml
    name: deploy-app-on-s3
    ```

    2. Start action when we push new files to **master** branch
    ```yaml
    on:
        pull_request:
        branches: [master]
        types: [closed]
    ```
    3. Jobs collection (*jobs:*) and job name (*deploy*). Jobs working on ubuntu (*runs-on: ubuntu-latest*) with *env* environment settings. **strategy** is showing which configuration use (*node-version: [10.x]* in our case)  
    ```yaml
    jobs:
       deploy:
          runs-on: ubuntu-latest
          env:
              AWS_S3_BUCKET_NAME: ${{ secrets.AWS_SECRET_S3_BUCKET }}
              AWS_CF_DISTRIBUTION_ID: ${{ secrets.AWS_SECRET_CLOUDFLARE_DISTRIBUTION_ID }}
          strategy:
              matrix:
                node-version: [10.x]   
    ```   
   4. Steps we use to deploy
    ```yaml
        steps:
          - uses: actions/checkout@master
          - name: Use Node.js ${{ matrix.node-version }}
            uses: actions/setup-node@v1
            with:
              node-version: ${{ matrix.node-version }}
    
          - name: Install Dependencies
            run: npm install
    
          - name: Build Application
            run: npm run-script build
    
          - uses: jakejarvis/s3-sync-action@master
            name: Upload App to S3 Bucket
            with:
              args: --follow-symlinks --delete
            env:
              AWS_S3_BUCKET: ${{ env.AWS_S3_BUCKET_NAME }}
              AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
              AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
              AWS_REGION: ${{ secrets.AWS_SECRET_REGION }}
              SOURCE_DIR: "dist"
    
          - name: Create CloudFront Cache Invalidation
            uses: chetan/invalidate-cloudfront-action@master
            env:
              DISTRIBUTION: ${{ env.AWS_CF_DISTRIBUTION_ID }}
              PATHS: "/*"
              AWS_REGION: ${{ secrets.AWS_SECRET_REGION }}
              AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
              AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    ```