variable "resource_group_name" {
  description = "Name of the existing Azure resource group to deploy into. Must already exist; the module reads it via a data source and derives the Static Web App's location from it."
  type        = string
}

variable "static_webapp_name" {
  description = "Name of the Azure Static Web App resource."
  type        = string
}
