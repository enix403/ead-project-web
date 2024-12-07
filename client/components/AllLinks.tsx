import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export type ViewMode = "employer" | "employee";

function AppLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  return (
    <>
      <Link
        {...props}
        className={clsx(pathname === props.href && "text-teal")}
      />
    </>
  );
}

export function AllLinks({ viewMode }: { viewMode: ViewMode }) {
  return (
    <>
      <AppLink href={`/${viewMode}`}>Home</AppLink>
      <AppLink href={`/${viewMode}/community`}>Community</AppLink>
      {viewMode === "employer" && (
        <>
          <AppLink href={`/${viewMode}/create-job`}>Create job</AppLink>
          <AppLink href={`/${viewMode}/postings`}>Postings</AppLink>
        </>
      )}
      <AppLink href={`/${viewMode}/information`}>Information</AppLink>
      <AppLink href={`/${viewMode}/services`}>Services</AppLink>
      <AppLink href={`/${viewMode}/about`}>About us</AppLink>
      <AppLink href={`/${viewMode}/contact`}>Contact us</AppLink>
    </>
  );
}
