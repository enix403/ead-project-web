import { Button } from "~/components/Button/Button";
import { Input, TextArea } from "~/components/Input/Input";
import { StepCallbacks } from "./common";

import { useState } from "react";

type QuestionEntry = {
  id: number;
  question: string;
};

function QuestionsForm() {
  const [questions, setQuestions] = useState<QuestionEntry[]>([
    { id: 1, question: "" },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, question: "" }]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id: number, value: string) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, question: value } : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Add Questions for Applicants</h2>
      {questions.map((q, index) => (
        <div key={q.id} className="flex gap-4 mb-4">
          <div className="flex-1">
            <Input
              className="w-full"
              placeholder={`Question ${index + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(q.id, e.target.value)}
            />
          </div>
          <Button
            tabIndex={-1}
            variant="filled"
            onClick={() => removeQuestion(q.id)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button onClick={addQuestion}>Add another question</Button>
    </div>
  );
}

export function QuestionsStep({ onNext, onCancel }: StepCallbacks) {
  return (
    <>
      <h1 className="font-semibold text-2xl text-center md:text-left">
        Employee Questions
      </h1>

      <div className="bg-teal/5 p-7 mt-7 rounded-xl space-y-6">
        <QuestionsForm />

        <div className="pt-6">
          <div className="flex gap-x-3">
            <Button onClick={onNext} fullRounded>
              Next
            </Button>
            <Button onClick={onCancel} variant="outlined" fullRounded>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}