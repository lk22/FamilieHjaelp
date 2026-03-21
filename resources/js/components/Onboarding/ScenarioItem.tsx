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
  handleScenarioChange
}: ScenarioSelectorItem) {
  return (
    <div className="border rounded-lg p-4 cursor-pointer hover:bg-blue-100" onClick={() => handleScenarioChange && handleScenarioChange(scenario)}>
      <div className="flex items-center gap-4 mb-2">
        <div className="text-2xl">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="text-gray-60 ml-4">{description}</p>
    </div>
  );
}