import { redirect } from "next/navigation";

export function GET() {
  return redirect("/job-user");
}
