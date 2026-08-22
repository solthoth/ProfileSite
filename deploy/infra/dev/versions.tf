terraform {
  required_version = ">= 1.6.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

# Subscription and OIDC credentials are supplied at runtime via the azure/login
# action's `az` CLI session in the reusable CI/CD workflow (no explicit
# credentials here, so the azurerm provider defaults to `use_cli = true`).
provider "azurerm" {
  features {}
}
