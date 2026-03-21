variable "resource_group_name" {
  description = "Name of the Azure resource group to create."
  type        = string
}

variable "location" {
  description = "Azure region where resources will be deployed."
  type        = string
  default     = "East US"
}

variable "static_webapp_name" {
  description = "Name of the Azure Static Web App resource."
  type        = string
}
