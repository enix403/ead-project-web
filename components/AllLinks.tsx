import Link from "next/link";

export type ViewMode = "employer" | "employee";

export function AllLinks({ viewMode }: { viewMode: ViewMode }) {
  return (
    <>
      <Link href="#">Home</Link>
      <Link href="#">About us</Link>
      <Link href="#">Community</Link>
      {viewMode === "employer" && (
        <>
          <Link href="#">Create job</Link>
          <Link href="#">Postings</Link>
        </>
      )}
      <Link href="#">Information</Link>
      <Link href="#">Contact us</Link>
    </>
  );
}
