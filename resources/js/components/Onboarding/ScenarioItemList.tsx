import ScenarioItem from '@/components/Onboarding/ScenarioItem';

type ScenarioItemListType = {
  handleScenarioChange: (scenario: string) => void;
}

export default function ScenarioItemList({handleScenarioChange}: ScenarioItemListType) {
    return (
        <ul>
            <li>
                <ScenarioItem
                    name='Jeg står midt i en abort / har oplevet en abort'
                    description='Står du i en situation hvor du er midt i eller har oplevet en abort?'
                    scenario='abortion'
                    icon={null}
                    handleScenarioChange={handleScenarioChange}
                />
            </li>
            <li className="my-4">
                <ScenarioItem
                    name='Er blevet forældretil et dødfødt barn'
                    description='Står du mid i en situation hvor du enten eller er blevet forældre til et dødfødt barn'
                    scenario='stillbirth'
                    icon={null}
                    handleScenarioChange={handleScenarioChange}
                />
            </li>
            <li>
                <ScenarioItem
                    name='Er blevet forældre og kommet igennem en rask fødsel'
                    description='Er du kommet igennem en rask fødsel, og er usikre på hvad der nu skal ske?'
                    scenario='parenting'
                    icon={null}
                    handleScenarioChange={handleScenarioChange}
                />
            </li>
        </ul>
    )
}