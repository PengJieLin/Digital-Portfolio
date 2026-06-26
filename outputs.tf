output "website_url" {
  description = "The endpoint URL for the static website"
  value       = aws_s3_bucket_website_configuration.resume_site.website_endpoint
}