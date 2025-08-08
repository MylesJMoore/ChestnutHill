# Chestnut Hill — Phase 3 Infrastructure & DevOps Changelog

This document tracks every step taken to set up AWS infrastructure for Chestnut Hill using Terraform, Kubernetes (EKS), and Helm.  
The goal is to make the app production-ready, scalable, and well-monitored.

---

## 2025-08-07 — Phase 3 Kickoff

**Goal:** Set up Terraform with remote state management for AWS infrastructure.

### Actions:

1. **Decided on initial AWS + Terraform plan:**

   - Region: `us-east-1`
   - Database: PostgreSQL (RDS) for semantic search capability (`pgvector`)
   - Redis (ElastiCache) for queues & caching
   - Single AWS account with multiple K8s namespaces for environments
   - Temporary AWS ELB hostname for dev environment (Route 53/Cloudflare later)
   - Container registry: AWS ECR

2. **Installed prerequisites:**

   - Terraform CLI v1.12.2
   - AWS CLI
   - Configured AWS CLI with IAM user `terraform` (AdministratorAccess for bootstrap)

3. **Enabled account safety measures:**

   - Enabled **Billing Alerts**
   - Created **Monthly Budget** for $1
   - Created **Free Tier usage alerts**
   - Disabled root account access for daily work

4. **Created IAM user for Terraform:**

   - Programmatic access only (no console login)
   - Generated Access Key + Secret Key
   - Stored credentials locally via `aws configure`

5. **Bootstrapped Terraform remote state:**

   - Created **S3 bucket**: `chestnut-hill-tfstate-myles123` (versioned, encrypted)
   - Created **DynamoDB table**: `chestnut-hill-tf-lock` for state locking
   - Stored Terraform state for bootstrap stack locally

6. **Configured `envs/dev` Terraform stack to use remote state:**
   - `terraform init` with S3 backend + DynamoDB lock
   - Verified with `"hello"` output from Terraform

### Outcome:

- AWS + Terraform connectivity confirmed
- Remote state storage & locking in place
- Ready to begin infrastructure build (VPC, ECR, EKS)

### Analysis:

In this step, we laid the groundwork for managing AWS infrastructure with **Infrastructure as Code (IaC)** using Terraform. Instead of manually creating servers, networks, and databases in the AWS console, Terraform lets us declare everything in code so it’s version-controlled and repeatable.

Before doing any infrastructure, we created a brand new AWS account with the free tier enabled and immediately set up:

- **Billing alerts** so we get notified of any charges above $0.01.
- **Monthly cost budget** of $1 to catch runaway usage.
- **Free tier usage alerts** so we know if we approach AWS's free limits.
- A dedicated **IAM user for Terraform** with programmatic access only (no console login), so the root account stays locked away and secure.

We then bootstrapped a secure, shared location (S3 bucket) to store Terraform’s “memory” of what’s deployed — called the **state file** — and a DynamoDB table to lock it so two deployments can’t overwrite each other. This remote state setup is a best practice for teams and ensures our infrastructure history is safe, auditable, and portable.

After setting up the backend, we deployed a **minimal dev environment stack** in `envs/dev` containing only an output variable (`hello`). This wasn’t about creating resources yet — it was about proving that Terraform in `envs/dev` could successfully:

1. Authenticate with AWS using our IAM user.
2. Write its state to the shared S3 bucket.
3. Lock state changes via DynamoDB during apply.

Seeing the `hello` output confirmed that our remote backend is working exactly as intended. By doing this before building anything else, we’ve set up a reliable foundation that allows multiple environments (dev, prod) to share the same approach, reduces manual errors, and supports automation later via CI/CD pipelines — while also protecting against surprise bills and accidental misuse of the root account.

### By doing this before building anything else, we’ve set up a reliable foundation that allows multiple environments (dev, prod) to share the same approach, reduces manual errors, and supports automation later via CI/CD pipelines — while also protecting against surprise bills and accidental misuse of the root account.

## Next Planned Step

- Create **VPC** with public/private subnets, internet/NAT gateways, and security groups.
- Create **ECR** repository for storing Docker images (Laravel & React).
- Begin **EKS cluster** deployment.

---

## 2025-08-07 — AWS Secrets Exposure Detected and Mitigated

**Goal:** Address a potential AWS secrets exposure in the Terraform bootstrap folder.

### Actions:

1. **Detection:**

   - While reviewing the `global/backend-bootstrap` directory in GitHub, noticed that the AWS CLI installer directory (`aws/`) had been committed.
   - Although no active credentials were present in the committed files, confirmed this folder was unnecessary for infrastructure code.

2. **Mitigation:**

   - Immediately rotated and deleted the AWS IAM access keys associated with the Terraform service account to eliminate any potential risk.
   - Verified new credentials worked via:
     ```bash
     aws sts get-caller-identity
     ```
   - Removed the `infra/terraform/global/backend-bootstrap/aws/` directory from Git tracking.
   - Updated `.gitignore` to permanently exclude this directory and other sensitive file patterns (e.g., `.tfvars`, `.env`, key files).

3. **Prevention:**
   - Implemented `.gitignore` rules to prevent accidental future commits of AWS installers, credentials, or sensitive configuration files.
   - Added this incident to the changelog as documentation of the detection and remediation process.
   - Plan to optionally perform a full git history cleanup in a later maintenance window to permanently remove the folder from all past commits.

### Outcome:

- Potential secrets exposure fully mitigated.
- AWS IAM keys rotated and confirmed secure.
- Future commits protected by `.gitignore` rules.
- Process documented for transparency and as a portfolio example of real-world incident handling.
- Postmortem Analysis

### Analysis:

This incident mirrors a realistic production scenario in which an engineer detects a possible security exposure in version control and also serves as a postmortem analysis.  
By acting quickly to rotate credentials, remove unneeded files from source control, and put preventative measures in place, the issue was contained with minimal disruption.  
The rapid detection–mitigation–prevention cycle demonstrates familiarity with cloud security best practices, incident response workflows, and disciplined DevOps hygiene.
