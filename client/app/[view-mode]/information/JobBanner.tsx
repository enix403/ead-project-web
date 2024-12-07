import { Button } from "~/components/Button/Button";
import Link from "next/link";

export function JobBanner() {
  return (
    <section className="bg-teal/80 py-20 text-center text-white">
      <div className="app-container">
        <h1 className="text-3xl font-extrabold">Your Dream Jobs Are Waiting</h1>
        <p className="font-semibold mt-2">
          Over 1 million interactions, 50,000 success stories Make yours now.
        </p>

        <div className="flex max-ph:flex-cold justify-center mt-5 gap-2">
          <Link href="/job-user">
            <Button fullRounded theme="white">
              Search Document
            </Button>
          </Link>
          <Button fullRounded theme="white" variant="outlined">
            Apply Job Now
          </Button>
        </div>
      </div>
    </section>
  );
}
