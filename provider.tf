# Core AWS provider configuration and version pinning
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Target AWS region for all portfolio resources
provider "aws" {
  region = "us-east-2"
}