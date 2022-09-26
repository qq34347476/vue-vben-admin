import type { GlobConfig } from '/#/config';

import { warn } from '/@/utils/log';
import { getAppEnvConfig } from '/@/utils/env';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_ETHERPAD_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_OAUTH_URL,
    VITE_GLOB_CLIENT_ID,
    VITE_GLOB_TENANTS_CODE,
    VITE_GLOB_FORUM_API_URL,
    VITE_GLOB_SYSTEM_API_URL,
  } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    etherpadUrl: VITE_GLOB_ETHERPAD_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
    authUrl: VITE_GLOB_OAUTH_URL,
    clientId: VITE_GLOB_CLIENT_ID,
    tenantsCode: VITE_GLOB_TENANTS_CODE,
    forumApiUrl: VITE_GLOB_FORUM_API_URL,
    systemApiUrl: VITE_GLOB_SYSTEM_API_URL,
  };
  return glob as Readonly<GlobConfig>;
};
