import SIconDashboard from "./assets/s-dashboard.svg";
import SIconCompany from "./assets/s-company.svg";
import SIconPost from "./assets/s-post.svg";
import SIconManage from "./assets/s-manage.svg";
import SIconApplicants from "./assets/s-applicant.svg";
import SIconShortlisted from "./assets/s-shortlisted.svg";
import SIconPackages from "./assets/s-package.svg";
import SIconMessages from "./assets/s-message.svg";
import { Button, ButtonProps } from "~/components/Button/Button";

function SidebarButton({
  label, Icon, active, ...rest
}: { label: string; Icon: any; active?: boolean | undefined; } & ButtonProps) {
  return (
    <Button
      variant={active ? "filled" : "text"}
      {...rest}
      className='!min-w-64 !px-5 !justify-start'
    >
      <Icon className='w-5' />
      <p>{label}</p>
    </Button>
  );
}
export function Sidebar() {
  return (
    <nav className='border-black/5 border-r-2 px-5 py-5 space-y-2 self-stretch'>
      <SidebarButton label='Dashboard' Icon={SIconDashboard} />
      <SidebarButton label='Company Profile' Icon={SIconCompany} />
      <SidebarButton active label='Post a New Job' Icon={SIconPost} />
      <SidebarButton label='Manage Jobs' Icon={SIconManage} />
      <SidebarButton label='All Applicants' Icon={SIconApplicants} />
      <SidebarButton label='Shortlisted Resumes' Icon={SIconShortlisted} />
      <SidebarButton label='Packages' Icon={SIconPackages} />
      <SidebarButton label='Messages' Icon={SIconMessages} />
    </nav>
  );
}
