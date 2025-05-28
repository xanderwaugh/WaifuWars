declare module "@eslint-community/eslint-plugin-eslint-comments/configs" {
  import type { Linter } from "eslint";

  export const recommended: {
    rules: Linter.RulesRecord;
  };
}

declare module "eslint-plugin-jsx-a11y" {
  import type { Linter } from "eslint";

  export const configs: {
    recommended: Linter.LegacyConfig;
    strict: Linter.LegacyConfig;
  };
  export const flatConfigs: {
    recommended: Linter.Config;
    strict: Linter.Config;
  };
}

declare module "eslint-plugin-tailwindcss" {
  import type { Linter } from "eslint";

  export const configs: {
    "flat/recommended": Linter.Config[];
    recommended: Linter.LegacyConfig;
  };
}

declare module "eslint-plugin-only-warn" {
  import type { Linter } from "eslint";

  export const configs: {
    recommended: Linter.Config;
  };
  export const rules: Linter.RulesRecord;

  // export = Linter.Plugin;
}

declare module "eslint-plugin-import" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const flatConfigs: {
    recommended: ConfigArray;
  };

  export const rules: Record<string, Rule.RuleModule>;

  // export = Linter.Plugin;
}
