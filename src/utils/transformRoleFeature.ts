import { TRoleFeature } from "@/types/auth.types";

export function transformRoleFeatures(features: TRoleFeature[] | undefined) {
  const navMain = [];
  const navSecondary = [];

  for (const feature of features || []) {
    const { name, path } = feature;
    const item = {
      title: name,
      url: `
        ${feature.name === "Overview" ? `/${path}` : `/dashboard/${path}`}
      `,
    };

    if (["settings", "profile"].includes(path)) {
      navSecondary.push(item);
    } else {
      navMain.push(item);
    }
  }

  return { navMain, navSecondary };
}
