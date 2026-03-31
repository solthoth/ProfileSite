provider "azurerm" {
  features {}
}

module "static_webapp" {
  source = "git::https://github.com/bit-and-byte-ideas/azure-static-webapp-cicd-kit.git//modules/azure-static-webapp?ref=main"

  resource_group_name = var.resource_group_name
  location            = var.location
  static_webapp_name  = var.static_webapp_name

  tags = {
    project    = "ProfileSite"
    managed_by = "opentofu"
  }
}

output "site_url" {
  description = "Public URL of the deployed static web app."
  value       = "https://${module.static_webapp.default_host_name}"
}

output "deployment_api_key" {
  description = "Store this as AZURE_STATIC_WEB_APPS_API_TOKEN in GitHub Actions secrets."
  value       = module.static_webapp.api_key
  sensitive   = true
}
