export const requireTenant = (req, res, next) => {
  if (!req.user?.tenant) {
    return res.status(403).json({ message: "No store registered for this account" });
  }
  req.tenantId = req.user.tenant;
  next();
};

// Use on public storefront routes where tenant comes from the URL slug
export const scopeByParamSlug = async (req, res, next, TenantModel) => {
  const tenant = await TenantModel.findOne({ slug: req.params.slug, status: "approved" });
  if (!tenant) return res.status(404).json({ message: "Store not found" });
  req.tenantId = tenant._id;
  req.tenant = tenant;
  next();
};