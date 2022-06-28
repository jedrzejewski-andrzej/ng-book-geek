import { ActivatedRouteSnapshot } from '@angular/router';

export namespace RouterDataModel {
  export function getDataFromSnapshotTree(
    name: string,
    activatedRouteSnapshot: ActivatedRouteSnapshot | null,
  ): any {
    if (activatedRouteSnapshot?.data[name]) {
      return activatedRouteSnapshot.data[name];
    }

    // search in parents
    let parentActivatedRouteSnapshot = activatedRouteSnapshot?.parent;

    while (parentActivatedRouteSnapshot) {
      if (parentActivatedRouteSnapshot?.data[name]) {
        return parentActivatedRouteSnapshot.data[name];
      }
      parentActivatedRouteSnapshot =
        parentActivatedRouteSnapshot?.parent ?? null;
    }

    // search in children
    let childActivatedRouteSnapshot =
      activatedRouteSnapshot?.children?.[0] ?? null;

    while (childActivatedRouteSnapshot) {
      if (childActivatedRouteSnapshot?.data[name]) {
        return childActivatedRouteSnapshot.data[name];
      }
      childActivatedRouteSnapshot =
        childActivatedRouteSnapshot?.children?.[0] ?? null;
    }
  }
}
