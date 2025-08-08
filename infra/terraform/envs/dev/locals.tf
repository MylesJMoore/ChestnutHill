locals {
  project      = "ChestnutHill"
  environment  = "dev"

  tags = {
    Project = local.project
    Env     = local.environment
    Owner   = "Myles"
  }
}