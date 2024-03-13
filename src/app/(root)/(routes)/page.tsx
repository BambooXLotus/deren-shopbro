"use client";

import { api } from "@/trpc/react";

import { Welcome } from "../_components/welcome";

export default function HomePage() {
  const { data: stores, isLoading } = api.store.getAll.useQuery();

  console.log(stores);
  //IF no stores show the welcome thingy
  //TODO: Get stores associated with user logged in

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">deren-shop</h2>
      {!stores || (stores.length == 0 && <Welcome />)}
      <div>
        {stores?.map((store) => <div key={store.id}>{store.name}</div>)}
      </div>
    </div>
  );
}
