
type ScenarioSelectorItem = {
  name: string;
  scenario: string;
  description: string;
  icon: React.ReactNode;
  handleScenarioChange?: (scenario: string) => void;
}

export default function ScenarioItem({
  name,
  scenario,
  description,
  icon,
  handleScenarioChange,
}: ScenarioSelectorItem) {

  const ScenarioChangeHandler = () => {
    if (handleScenarioChange) {
      handleScenarioChange(scenario);
    } else {
      console.warn('handleScenarioChange function is not provided');
    }
  }

  return (
    <button
      className="cursor-pointer border rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-100 active:bg-blue-300 focus:bg-blue-300 focus:text-black w-full"
      onClick={ScenarioChangeHandler}
    >
      <div className="flex flex-col items-start justify-center gap-4 mb-2">
        <div className="text-2xl">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-60">{description}</p>
      </div>
    </button>
  );
}