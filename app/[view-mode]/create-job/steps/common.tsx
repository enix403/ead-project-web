import type { ReactNode } from "react";

export type StepProps = {
  onNext: VoidFunction;
  onCancel: VoidFunction;
  progressView?: ReactNode | undefined;
}