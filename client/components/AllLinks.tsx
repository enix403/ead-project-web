import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { useViewMode } from "~/app/providers/auth-state";

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

export function AllLinks() {
  const viewMode = useViewMode();
  return (
    <>
      <AppLink href={`/`}>Home</AppLink>
      <AppLink href={`/community`}>Community</AppLink>
      {viewMode === "employer" && (
        <>
          <AppLink href={`/create-job`}>Create job</AppLink>
          <AppLink href={`/postings`}>Postings</AppLink>
        </>
      )}
      <AppLink href={`/information`}>Information</AppLink>
      <AppLink href={`/services`}>Services</AppLink>
      <AppLink href={`/about`}>About us</AppLink>
      <AppLink href={`/contact`}>Contact us</AppLink>
    </>
  );
}
