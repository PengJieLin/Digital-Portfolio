# Project Context: AWS Digital Portfolio

## Project Architecture & Tech Stack
- **Frontend**: Static site built with HTML5, CSS3, and vanilla JavaScript (hosted on AWS S3, served via CloudFront CDN).
- **Backend**: Microservice serverless logic written in Python 3.12 running on AWS Lambda (triggered via API Gateway).
- **Infrastructure as Code (IaC)**: Terraform for defining all cloud resources.
- **CI/CD**: GitHub Actions workflows for automated linting, terraform plan/apply, and asset deployment.

---

## Code Generation & Development Rules

### 1. Terraform & AWS Best Practices
- **Security First**: 
  - S3 buckets **must** block public access. Serve content exclusively through CloudFront using Origin Access Control (OAC).
  - Lambda execution roles must strictly follow the Principle of Least Privilege (IAM).
- **State & Structure**:
  - Keep environment configuration isolated using standard Terraform variables (`variables.tf`, `outputs.tf`, `main.tf`).
  - Always output resource details needed for deployment (e.g., S3 bucket names, API Gateway URLs, CloudFront distribution IDs).
- **Format**: Run `terraform fmt` style logic on generated HCL.

### 2. AWS Lambda & Python
- **Function Structure**: Keep the main handler concise (`def lambda_handler(event, context)`).
- **Error Handling & Response**:
  - Always return standard HTTP responses with proper status codes (200, 400, 500) and headers.
  - Return CORS headers (`Access-Control-Allow-Origin`) for API Gateway integration.
- **Type Hints & Logging**: Use standard `logging` module (never `print()`) and Python typing.

### 3. Frontend (HTML / JS / CSS)
- **Vanilla Approach**: Use clean, modern standard JavaScript (ES6+) without unnecessary heavy frameworks unless requested.
- **Configuration Isolation**: API endpoints pointing to API Gateway should be parameterized or loaded via a simple configuration file (`config.js`).
- **Performance**: Ensure CSS and JS references are clean and production-ready.

### 4. GitHub Actions (CI/CD)
- **Secrets Management**: Never hardcode credentials. Use `secrets.AWS_ROLE_TO_ASSUME` or standard GitHub secrets with OIDC where applicable.
- **Workflow Steps**:
  - Step 1: Lint & format checks (Terraform, Python flake8/ruff).
  - Step 2: Infrastructure deployment (`terraform plan`/`apply`).
  - Step 3: Frontend deployment (S3 Sync + CloudFront Cache Invalidation).

---

## Output Expectations
- When asked to add or modify features, output full code snippets or file diffs rather than fragments.
- When generating Terraform code, include the corresponding GitHub Action step or Python configuration if relevant to complete the end-to-end implementation.
- Avoid introducing unnecessary heavy external dependencies.
