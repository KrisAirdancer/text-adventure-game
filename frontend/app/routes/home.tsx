import type { Route } from "./+types/home";
import { MainGameplayPage } from "../main/mainGameplayPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Thistle RPG" }
  ];
}

export default function Home() {
  return <MainGameplayPage />;
}
