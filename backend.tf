# Remote backend configuration for Terraform state storage and locking
terraform {
  backend "s3" {
    bucket         = "pjl-terraform-states" 
    key            = "static_resume/terraform.tfstate"
    region         = "us-east-2"
    encrypt        = true
    # dynamodb_table = "your-lock-table" # Recommended: enable DynamoDB state locking for concurrent CI/CD pipelines
  }
}