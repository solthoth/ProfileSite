project_name         = "solthoth-profilesite"
environment          = "prod"
sku_tier             = "Free"
application_insights = true
custom_domain        = "solthoth.com"

tags = {
  owner       = "solthoth"
  environment = "prod"
  managed_by  = "opentofu"
  source      = "github.com/solthoth/ProfileSite"
}
