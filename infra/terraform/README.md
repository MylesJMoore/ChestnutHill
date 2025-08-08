# Chestnut Hill Infra

1. Bootstrap remote state:
   cd infra/terraform/global/backend-bootstrap
   terraform init
   terraform apply -var="state_bucket_name=<unique-bucket-name>"

2. Initialize dev with remote backend:
   cd ../../envs/dev
   terraform init \
    -backend-config="bucket=<unique-bucket-name>" \
    -backend-config="key=envs/dev/terraform.tfstate" \
    -backend-config="region=us-east-1" \
    -backend-config="dynamodb_table=chestnut-hill-tf-lock" \
    -backend-config="encrypt=true"

3. Test:
   terraform plan
   terraform apply
