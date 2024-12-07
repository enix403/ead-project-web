import { useState, type PropsWithChildren, type ReactNode } from "react";
import type { UseFormRegister } from 'react-hook-form';
import type { SelectionController } from "../page";
export type { SelectionController } from "../page";

import type { QuestionsBank } from "../page";
export type { QuestionsBank } from "../page";

export type StepProps = {
  onNext: VoidFunction;
  onCancel: VoidFunction;
  progressView?: ReactNode | undefined;
  register: UseFormRegister<any>;
  selCtrl: SelectionController;
  qsBank: QuestionsBank;
};

export function StepForm({
  children,
  onNext,
}: Pick<StepProps, 'onNext'> & PropsWithChildren) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onInvalid={() => {
        setSubmitted(true);
      }}
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
        return false;
      }}
      data-submitted={submitted}
      className="contents"
    >
      {children}
    </form>
  );
}
