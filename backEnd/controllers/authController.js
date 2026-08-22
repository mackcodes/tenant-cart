import * as authService from "../services/authService.js";

export const registerAccount = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const user = await authService.createAccount({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    const token = authService.signToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenant: user.tenant,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const registerStore = async (
  req,
  res,
  next
) => {
  try {
    const {
      storeName,
      slug,
      description,
      category,
      businessEmail,
      businessPhone,
      address,
      branding,
    } = req.body;

    if (!storeName || !slug) {
      return res.status(400).json({
        message: "Store name and slug are required",
      });
    }

    const normalizedSlug = slug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (!normalizedSlug) {
      return res.status(400).json({
        message: "A valid store address is required",
      });
    }

    const result =
      await authService.createStoreForUser(
        req.user._id,
        {
          storeName: storeName.trim(),
          slug: normalizedSlug,
          description: description?.trim() || "",
          category: category || "other",
          businessEmail:
            businessEmail?.trim().toLowerCase() || "",
          businessPhone:
            businessPhone?.trim() || "",
          address: {
            line1: address?.line1?.trim() || "",
            line2: address?.line2?.trim() || "",
            city: address?.city?.trim() || "",
            state: address?.state?.trim() || "",
            postalCode:
              address?.postalCode?.trim() || "",
            country:
              address?.country?.trim() || "India",
          },
          branding: {
            logoUrl: branding?.logoUrl || "",
            primaryColor:
              branding?.primaryColor || "#4F46E5",
            templateId:
              branding?.templateId || "default",
          },
        }
      );

    return res.status(201).json({
      message: "Store created successfully",
      tenant: result.tenant,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await authService.validateLogin(
      email.trim().toLowerCase(),
      password
    );

    const token = authService.signToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenant: user.tenant,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  return res.json({
    user: req.user,
  });
};