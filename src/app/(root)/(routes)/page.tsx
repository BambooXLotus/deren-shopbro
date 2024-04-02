"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import { Marketing } from "../_components/marketing";
import { Welcome } from "../_components/welcome";

export default function HomePage() {
  // const { data: stores, isLoading } = api.store.getAll.useQuery();

  // console.log(stores);
  //IF no stores show the welcome thingy
  //TODO: Get stores associated with user logged in

  return (
    <div className="space-y-4">
      {/* {!stores || (stores.length == 0 && <Welcome />)}
      <div>
        {stores?.map((store) => <div key={store.id}>{store.name}</div>)}
      </div> */}
      <SignedOut>
        <Marketing />
      </SignedOut>
      <SignedIn>
        <Welcome />
      </SignedIn>
    </div>
  );
}
