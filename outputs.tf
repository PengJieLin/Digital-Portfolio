# Purpose: Outputs Website URL and APIs

output "website_url" {
  description = "Endpoint URL for the static website"
  value       = aws_s3_bucket_website_configuration.resume_site.website_endpoint
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}

output "cloudfront_url" {
  value       = "https://${aws_cloudfront_distribution.s3_distribution.domain_name}"
  description = "HTTPS portfolio URL"
}