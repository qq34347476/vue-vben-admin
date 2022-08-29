import type { Router } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';

import { usePermissionStoreWithOut } from '/@/store/modules/permission';

import { useUserStoreWithOut } from '/@/store/modules/user';

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    } else {
      await userStore.loginByToken();
      next(PageEnum.BASE_HOME);
    }
  });
}
