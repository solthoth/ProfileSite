project_name         = "solthoth-profilesite"
environment          = "prod"
sku_tier             = "Free"
application_insights = true
custom_domain        = null # set to "solthoth.com" once the CNAME delegation record is in place at the registrar

tags = {
  owner       = "solthoth"
  environment = "prod"
  managed_by  = "opentofu"
  source      = "github.com/solthoth/ProfileSite"
}
