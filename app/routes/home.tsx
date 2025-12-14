import { Welcome } from '../welcome/welcome';
import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Calculator.m | mamaya' },
    { name: 'description', content: 'A calculator app created by mamaya' },
  ];
}

export default function Home() {
  return <Welcome />;
}
