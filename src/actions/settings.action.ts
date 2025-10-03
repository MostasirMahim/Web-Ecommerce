"use server";
import { getAuthStatus } from "@/lib/authMiddleware";
import mongodbConnect from "@/lib/connect_Database";
import Settings from "@/models/settings.model";
import User from "@/models/user.model";

export async function generalCuz(data: any) {
  try {
    await mongodbConnect();
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    if (user.role !== "admin") {
      return {
        success: false,
        error: "Access Denied",
      };
    }
    const settingsData = await Settings.findOne({});
    if (!settingsData) {
      const newSettings = new Settings({
        general: {
          siteName: data.siteName || "Default Site Name",
          siteDescription: data.siteDescription || "Default Site Description",
          logo: data.logo || "/logo.png",
          favicon: data.favicon || "/favicon.ico",
          primaryColor: data.primaryColor || "#0f172a",
          accentColor: data.accentColor || "#3b82f6",
        },
      });
      await newSettings.save();
      return {
        success: true,
        message: "Settings created successfully",
        data: newSettings.toObject(),
      };
    }
    settingsData.general.siteName =
      data.siteName || settingsData.general.siteName;
    settingsData.general.siteDescription =
      data.siteDescription || settingsData.general.siteDescription;
    settingsData.general.logo = data.logo || settingsData.general.logo;
    settingsData.general.favicon = data.favicon || settingsData.general.favicon;
    settingsData.general.primaryColor =
      data.primaryColor || settingsData.general.primaryColor;
    settingsData.general.accentColor =
      data.accentColor || settingsData.general.accentColor;
    await settingsData.save();
    return {
      success: true,
      message: "Settings updated successfully",
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in generalCuz:", error);
    throw error;
  }
}

export async function homepageCuz(data: any) {
  try {
    await mongodbConnect();
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        error: "Access Denied",
      };
    }
    const settingsData = await Settings.findOne({});
    if (!settingsData) {
      const newSettings = new Settings({
        homepage: {
          heroTitle: data.heroTitle || "Welcome to Our Store",
          heroSubtitle: data.heroSubtitle || "Best Products at Best Prices",
          heroImage: data.heroImage || "/hero.jpg",
          showFeaturedProducts:
            data.showFeaturedProducts !== undefined
              ? data.showFeaturedProducts
              : true,
          featuredProductsTitle:
            data.featuredProductsTitle || "Featured Products",
          showCategories:
            data.showCategories !== undefined ? data.showCategories : true,
          categoriesTitle: data.categoriesTitle || "Shop by Category",
        },
      });
      await newSettings.save();
      return {
        success: true,
        message: "Homepage settings created successfully",
        data: newSettings.toObject(),
      };
    }
    settingsData.homepage.heroTitle =
      data.heroTitle || settingsData.homepage.heroTitle;
    settingsData.homepage.heroSubtitle =
      data.heroSubtitle || settingsData.homepage.heroSubtitle;
    settingsData.homepage.heroImage =
      data.heroImage || settingsData.homepage.heroImage;
    settingsData.homepage.showFeaturedProducts =
      data.showFeaturedProducts !== undefined
        ? data.showFeaturedProducts
        : settingsData.homepage.showFeaturedProducts;
    settingsData.homepage.featuredProductsTitle =
      data.featuredProductsTitle || settingsData.homepage.featuredProductsTitle;
    settingsData.homepage.showCategories =
      data.showCategories !== undefined
        ? data.showCategories
        : settingsData.homepage.showCategories;
    settingsData.homepage.categoriesTitle =
      data.categoriesTitle || settingsData.homepage.categoriesTitle;
    await settingsData.save();
    return {
      success: true,
      message: "Homepage settings updated successfully",
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in homepageCuz:", error);
    throw error;
  }
}
export async function footerCuz(data: any) {
  try {
    await mongodbConnect();
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        error: "Access Denied",
      };
    }
    const settingsData = await Settings.findOne({});
    if (!settingsData) {
      const newSettings = new Settings({
        footer: {
          showNewsletter:
            data.showNewsletter !== undefined ? data.showNewsletter : true,
          newsletterTitle:
            data.newsletterTitle || "Subscribe to our Newsletter",
          newsletterText:
            data.newsletterText || "Get the latest updates and offers.",
          showSocialLinks:
            data.showSocialLinks !== undefined ? data.showSocialLinks : true,
          facebook: data.facebook || "",
          twitter: data.twitter || "",
          instagram: data.instagram || "",
        },
      });
      await newSettings.save();
      return {
        success: true,
        message: "Footer settings created successfully",
        data: newSettings.toObject(),
      };
    }
    settingsData.footer.showNewsletter =
      data.showNewsletter !== undefined
        ? data.showNewsletter
        : settingsData.footer.showNewsletter;
    settingsData.footer.newsletterTitle =
      data.newsletterTitle || settingsData.footer.newsletterTitle;
    settingsData.footer.newsletterText =
      data.newsletterText || settingsData.footer.newsletterText;
    settingsData.footer.showSocialLinks =
      data.showSocialLinks !== undefined
        ? data.showSocialLinks
        : settingsData.footer.showSocialLinks;
    settingsData.footer.facebook =
      data.facebook || settingsData.footer.facebook;
    settingsData.footer.twitter = data.twitter || settingsData.footer.twitter;
    settingsData.footer.instagram =
      data.instagram || settingsData.footer.instagram;
    await settingsData.save();
    return {
      success: true,
      message: "Footer settings updated successfully",
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in footerCuz:", error);
    throw error;
  }
}

export async function categoryCuz(data: any) {
  try {
    await mongodbConnect();
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        error: "Access Denied",
      };
    }
    if (!data?.category || !data?.subcategory) {
      return {
        success: false,
        error: "Category and Subcategory are required",
      };
    }

    const settingsData = await Settings.findOne({});
    if (!settingsData) {
      const newSettings = new Settings({
        categories: [
          {
            category: data?.category,
            subCategories: data?.subcategory,
          },
        ],
      });
      await newSettings.save();
      return {
        success: true,
        message: "Category settings created successfully",
        data: newSettings.toObject(),
      };
    }
    settingsData.categories.push({
      category: data?.category,
      subCategories: data?.subcategory,
    });
    await settingsData.save();
    return {
      success: true,
      message: "Category settings updated successfully",
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in categoryCuz:", error);
    throw error;
  }
}

export async function productCuz(data: any) {
  try {
    await mongodbConnect();
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        error: "Access Denied",
      };
    }
    const settingsData = await Settings.findOne({});
    if (!settingsData) {
      const newSettings = new Settings({
        product: {
          showRelatedProducts:
            data.showRelatedProducts !== undefined
              ? data.showRelatedProducts
              : true,
          relatedProductsTitle: data.relatedProductsTitle || "Related Products",
          showReviews: data.showReviews !== undefined ? data.showReviews : true,
          enableRatings:
            data.enableRatings !== undefined ? data.enableRatings : true,
        },
      });
      await newSettings.save();
      return {
        success: true,
        message: "Product settings created successfully",
        data: newSettings.toObject(),
      };
    }
    settingsData.product.showRelatedProducts =
      data.showRelatedProducts !== undefined
        ? data.showRelatedProducts
        : settingsData.product.showRelatedProducts;
    settingsData.product.relatedProductsTitle =
      data.relatedProductsTitle || settingsData.product.relatedProductsTitle;
    settingsData.product.showReviews =
      data.showReviews !== undefined
        ? data.showReviews
        : settingsData.product.showReviews;
    settingsData.product.enableRatings =
      data.enableRatings !== undefined
        ? data.enableRatings
        : settingsData.product.enableRatings;
    await settingsData.save();
    return {
      success: true,
      message: "Product settings updated successfully",
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in productCuz:", error);
    throw error;
  }
}

export async function storeCuz(data: any) {
  try {
    await mongodbConnect();
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        error: "Access Denied",
      };
    }
    const settingsData = await Settings.findOne({});
    if (!settingsData) {
      const newSettings = new Settings({
        store: {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          zipCode: data.zipCode || "",
          country: data.country || "",
        },
      });
      await newSettings.save();
      return {
        success: true,
        message: "Store settings created successfully",
        data: newSettings.toObject(),
      };
    }
    settingsData.store.name = data.name || settingsData.store.name;
    settingsData.store.email = data.email || settingsData.store.email;
    settingsData.store.phone = data.phone || settingsData.store.phone;
    settingsData.store.address = data.address || settingsData.store.address;
    settingsData.store.city = data.city || settingsData.store.city;
    settingsData.store.state = data.state || settingsData.store.state;
    settingsData.store.zipCode = data.zipCode || settingsData.store.zipCode;
    settingsData.store.country = data.country || settingsData.store.country;
    await settingsData.save();
    return {
      success: true,
      message: "Store settings updated successfully",
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in storeCuz:", error);
    throw error;
  }
}
export async function contentCuz(data: any) {
  try {
    await mongodbConnect();
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        error: "Access Denied",
      };
    }
    const settingsData = await Settings.findOne();
    if (!settingsData) {
      const newSettings = new Settings({
        content: {
          cauroTitle: data.cauroTitle || "",
          cauroSubtitle: data.cauroSubtitle || "",
          aboutTitle: data.aboutTitle || "About Us",
          aboutContent: data.aboutContent || "",
          privacyContent:
            data.privacyContent || "",
          termsContent: data.termsContent || "",
          shippingContent:
            data.shippingContent || "",
          returnContent: data.returnContent || "",
        },
      });
      await newSettings.save();
      return {
        success: true,
        message: "Content settings created successfully",
        data: newSettings.toObject(),
      };
    }
    settingsData.content.heroTitle =
      data.cauroTitle || settingsData.content.cauroTitle;
    settingsData.content.heroSubtitle =
      data.cauroSubtitle || settingsData.content.cauroSubtitle;
    settingsData.content.aboutTitle =
      data.aboutTitle || settingsData.content.aboutTitle;
    settingsData.content.aboutContent =
      data.aboutContent || settingsData.content.aboutContent;
    settingsData.content.privacyContent =
      data.privacyContent || settingsData.content.privacyContent;
    settingsData.content.termsContent =
      data.termsContent || settingsData.content.termsContent;
    settingsData.content.shippingContent =
      data.shippingContent || settingsData.content.shippingContent;
    settingsData.content.returnContent =
      data.returnContent || settingsData.content.returnContent;
    await settingsData.save();
    return {
      success: true,
      message: "Content settings updated successfully",
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in contentCuz:", error);
    throw error;
  }
}
export async function ownerCuz(data: any) {
  try {
    await mongodbConnect();
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        error: "Access Denied",
      };
    }
    const settingsData = await Settings.findOne({});
    if (!settingsData) {
      const newSettings = new Settings({
        owner: {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          position: data.position || "",
        },
      });
      await newSettings.save();
      return {
        success: true,
        message: "Owner settings created successfully",
        data: newSettings.toObject(),
      };
    }
    settingsData.owner.name = data.name || settingsData.owner.name;
    settingsData.owner.email = data.email || settingsData.owner.email;
    settingsData.owner.phone = data.phone || settingsData.owner.phone;
    settingsData.owner.position = data.position || settingsData.owner.position;
    await settingsData.save();
    return {
      success: true,
      message: "Owner settings updated successfully",
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in ownerCuz:", error);
    throw error;
  }
}
export async function getSettings() {
  try {
    await mongodbConnect();
    const settingsData = await Settings.findOne();
    if (!settingsData) {
      return {
        success: false,
        error: "Settings not found",
      };
    }
    return {
      success: true,
      data: settingsData.toObject(),
    };
  } catch (error) {
    console.error("Error in getSettings:", error);
    throw error;
  }
}
