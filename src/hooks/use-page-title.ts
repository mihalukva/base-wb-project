import { useRoute } from 'react-router5';

export const setTitle = (title: string) => {
  document.title = title;
};

export const usePageTitle = (title: string) => {
  const {
    route: {
      params: { project },
    },
  } = useRoute();
  if (project) {
    setTitle(`${title} / ${project} / WB Balancer`);
  } else {
    setTitle(`${title} / WB Balancer`);
  }
};
