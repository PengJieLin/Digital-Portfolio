# Purpose: Remote State Mapping

terraform {
  backend "s3" {
    bucket         = "pjl-terraform-states" 
    key            = "static_resume/terraform.tfstate"
    region         = "us-east-2"
    encrypt        = true
    # dynamodb_table = "your-lock-table"
  }
}