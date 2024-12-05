import { useState, type PropsWithChildren, type ReactNode } from "react";

export type StepProps = {
  onNext: VoidFunction;
  onCancel: VoidFunction;
  progressView?: ReactNode | undefined;
};

export function StepForm({
  children,
  onNext,
}: Pick<StepProps, 'onNext'> & PropsWithChildren) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onInvalid={() => {
        // setSubmitted(true);
        onNext();
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
