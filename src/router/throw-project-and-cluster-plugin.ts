import { Router, State } from 'router5';

export function throwProjectAndClusterPlugin(router?: Router) {
  return {
    onTransitionStart: (toState: State, fromState: State) => {
      if (!router || !fromState) {
        return;
      }
      const { defaultRoute } = router.getOptions();
      if (toState.name === defaultRoute) {
        return;
      }
      const { project: oldProject, cluster: oldCluster } = fromState.params;
      const { project: newProject, cluster: newCluster } = toState.params;

      if (oldProject && oldCluster && !newProject && !newCluster) {
        // eslint-disable-next-line no-param-reassign
        toState.params = {
          project: oldProject,
          cluster: oldCluster,
        };
      }
    },
  };
}
