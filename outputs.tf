# Purpose: Outputs Website URL and APIs

output "website_url" {
  description = "The endpoint URL for the static website"
  value       = aws_s3_bucket_website_configuration.resume_site.website_endpoint
}

output "api_url" {
  description = "The endpoint URL for the API Gateway counter"
  value       = "${aws_apigatewayv2_api.http_api.api_endpoint}/counter"
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}