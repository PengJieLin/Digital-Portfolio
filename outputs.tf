# Runtime infrastructure endpoints and CI/CD authentication identifiers

output "website_url" {
  description = "The direct S3 static website hosting endpoint"
  value       = aws_s3_bucket_website_configuration.resume_site.website_endpoint
}

output "api_url" {
  description = "The HTTP API Gateway REST endpoint for visitor counter invocations"
  value       = "${aws_apigatewayv2_api.http_api.api_endpoint}/counter"
}

output "github_actions_role_arn" {
  description = "IAM Role ARN assumed by GitHub Actions via OIDC for automated deployments"
  value       = aws_iam_role.github_actions.arn
}