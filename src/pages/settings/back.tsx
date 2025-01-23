import BackButton from '@/components/BackButton';

function Back({ content }: { content?: string }): JSX.Element {
  return (
    <div className="common_back_bottom_bar !w-full mx-[auto]">
      <div className="ml-[15px] translate-y-[-50%]">
        <BackButton />
      </div>

      {content && <h3>{content}</h3>}
    </div>
  );
}

Back.displayName = Back.name;

export default Back;
