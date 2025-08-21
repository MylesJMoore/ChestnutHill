############################################
# VPC (cost-safe: NO NAT gateway) 
#Terraform: $0 VPC + empty ECR repos
############################################
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${local.project}-${local.environment}-vpc"
  cidr = "10.20.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.20.0.0/24", "10.20.1.0/24"]
  private_subnets = ["10.20.10.0/24", "10.20.11.0/24"]

  enable_dns_hostnames = true
  enable_dns_support   = true

  # Keep costs at $0: no NAT, no EIPs
  enable_nat_gateway = false

  # Internet Gateway is free; useful later for ALB in public subnets
  create_igw = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
  }

  tags = local.tags
}

######################
# ECR (repos only)
######################
module "ecr_backend" {
  source  = "terraform-aws-modules/ecr/aws"
  version = "~> 1.6"

  repository_name         = "ch-backend"
  create_lifecycle_policy = false # 🔧 let us manage it ourselves
  tags                    = local.tags
}

module "ecr_frontend" {
  source  = "terraform-aws-modules/ecr/aws"
  version = "~> 1.6"

  repository_name         = "ch-frontend"
  create_lifecycle_policy = false # 🔧 let us manage it ourselves
  tags                    = local.tags
}

# Lifecycle policies (native AWS resources)
resource "aws_ecr_lifecycle_policy" "backend" {
  repository = "ch-backend"
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = { type = "expire" }
    }]
  })

  depends_on = [module.ecr_backend] # ✅ ensure repo exists first
}

resource "aws_ecr_lifecycle_policy" "frontend" {
  repository = "ch-frontend"
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = { type = "expire" }
    }]
  })

  depends_on = [module.ecr_frontend] # ✅ ensure repo exists first
}
