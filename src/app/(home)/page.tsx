import { HomeView } from "@/modules/home/ui/views/home-view";
import { HydrateClient, trpc } from "@/trpc/server";

export default function Home() {
  void trpc.articles.getMany.prefetch();
  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
