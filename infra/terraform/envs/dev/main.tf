# Placeholder to confirm remote state works.
# Next step we’ll add VPC/EKS/ECR modules here.

output "hello" {
  value = "Terraform remote state is configured for ${local.project}-${local.environment}"
}