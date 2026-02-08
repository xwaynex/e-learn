"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Create a NEW instance of params based on current URL
      // This ensures we keep 'subject' or other filters while changing 'topic'
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (searchQuery) {
        current.set("topic", searchQuery);
      } else {
        current.delete("topic");
      }

      // Generate the new query string
      const search = current.toString();
      const query = search ? `?${search}` : "";

      // toString() sorts keys automatically in some environments, but to be safe
      // and prevent loops, we check if the relevant value actually changed
      // OR if the entire string is identical.
      if (current.toString() === searchParams.toString()) {
        // The URL is already exactly what we want. Do not push.
        return;
      }

      // Push to router
      router.replace(`${pathname}${query}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, pathname, router, searchParams]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-3 py-1 h-fit">
      <Image src="/icons/search.svg" alt="Search" width={15} height={15} />
      <input
        placeholder="Search Companions ..."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
