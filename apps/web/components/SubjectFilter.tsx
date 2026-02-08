"use client";

import { subjects } from "@/app/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSubject = searchParams.get("subject") || "";

  const onSelect = (value: string) => {
    // IMPROVEMENT: Clone current params to preserve other filters (like search query)
    const params = new URLSearchParams(searchParams.toString());

    // Logic to allow unselecting (if you add an "All" option)
    if (value && value !== "all") {
      params.set("subject", value);
    } else {
      params.delete("subject");
    }

    // Use replace() 
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={currentSubject} onValueChange={onSelect}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Select subject" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem value="all" className="capitalize">
            All
          </SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject} className="capitalize">
              {subject}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
