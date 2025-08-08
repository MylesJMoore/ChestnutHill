variable "project" {
  description = "Project name for tagging and naming."
  type        = string
  default     = "chestnut-hill"
}

variable "state_bucket_name" {
  description = "Globally-unique S3 bucket name for Terraform state."
  type        = string
}

variable "tags" {
  description = "Global tags."
  type        = map(string)
  default = {
    Project = "ChestnutHill"
    Env     = "global"
    Owner   = "Myles"
  }
}