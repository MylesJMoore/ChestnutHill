output "vpc_id" { value = module.vpc.vpc_id }
output "public_subnets" { value = module.vpc.public_subnets }
output "private_subnets" { value = module.vpc.private_subnets }
output "ecr_backend_url" { value = module.ecr_backend.repository_url }
output "ecr_frontend_url" { value = module.ecr_frontend.repository_url }
output "s3_images_bucket" { value = module.s3_images.s3_bucket_id }
# SSM parameter NAMES only (not values)
output "ssm_param_names" {
  value = [
    aws_ssm_parameter.app_key.name,
    aws_ssm_parameter.db_password.name,
  ]
}
