project_name         = "solthoth-profilesite"
environment          = "dev"
sku_tier             = "Free"
application_insights = false

tags = {
  owner       = "solthoth"
  environment = "dev"
  managed_by  = "opentofu"
  source      = "github.com/solthoth/ProfileSite"
}
