import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from '../../CloseButton';

type FeedbackTypeStepProps = {
  onFeedbackTypeChanged: (key: FeedbackType | null) => void;
};

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
}: FeedbackTypeStepProps) {
  function handleSetFeedbackType(feedbackType: FeedbackType) {
    return () => onFeedbackTypeChanged(feedbackType);
  }

  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, { title, image }]) => {
          return (
            <button
              key={key}
              type="button"
              onClick={handleSetFeedbackType(key as FeedbackType)}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            >
              <img src={image.source} alt={image.alt} />
              <span>{title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
