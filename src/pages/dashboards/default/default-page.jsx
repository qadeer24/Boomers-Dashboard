import { useSettings } from '@/providers/settings-provider';
import {
  Demo1LightSidebarPage,
  Demo2Page,
  Demo3Page,
  Demo4Page,
  Demo5Page,
} from '../';

const DefaultPage = () => {
  const { settings } = useSettings();

    return <Demo1LightSidebarPage />;
};

export { DefaultPage };
