provider "aws" {
  region = "us-east-1"
}

# NOTE:
# We'll add kubernetes/helm providers AFTER the EKS cluster exists,
# because they need kubeconfig details from that cluster.