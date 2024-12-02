import Link from "next/link";

export type ViewMode = "employer" | "employee";

export function AllLinks({ viewMode }: { viewMode: ViewMode }) {
  return (
    <>
      <Link href={`/${viewMode}/`}>Home</Link>
      <Link href={`/${viewMode}/about`}>About us</Link>
      <Link href={`/${viewMode}/community`}>Community</Link>
      {viewMode === "employer" && (
        <>
          <Link href={`/${viewMode}/create-job`}>Create job</Link>
          <Link href={`/${viewMode}/postings`}>Postings</Link>
        </>
      )}
      <Link href={`/${viewMode}/information`}>Information</Link>
      <Link href={`/${viewMode}/contact`}>Contact us</Link>
    </>
  );
}
