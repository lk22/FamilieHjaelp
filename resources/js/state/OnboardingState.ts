interface ScenarioStepProperties {
    id: number;
    stepName: string;
    question: string;
    description: string;
    completed: boolean;
    data: {
        [key: string]: any;
    };
}

interface ScenarioProperties {
    id: string;
    title: string;
    currentStep?: string;
    steps: ScenarioStepProperties[];
}

type ProgressStatus =
    'not_started' |
    'in_progress' |
    'completed' |
    'paused';

export interface InitialOnboardingStateInterface {
    onboardingCompleted: boolean;
    currentScenario: string;
    progress: ProgressStatus;
    scenarios: ScenarioProperties[];
}

export const InitialOnboardingState: InitialOnboardingStateInterface = {
    onboardingCompleted: false,
    currentScenario: '',
    progress: 'not_started',
    scenarios: [
        {
            id: 'abortion',
            title: 'Abortion',
            currentStep: 'one',
            steps: [
                {
                    id: 1,
                    stepName: 'one',
                    question: 'Fortæl os lidt om dig selv',
                    description: 'Dette hjælper os med at tilpasse informationen til dig og sikre, at vi giver dig den bedst mulige vejledning gennem abortprocessen.',
                    completed: false,
                    data: {
                        name: '',
                        age: '',
                        ageOfPartner: '',
                        gender: '',
                        hasCprNumber: null,
                    }
                },
                {
                    id: 2,
                    stepName: 'two',
                    question: 'Hvor langt er du i dit forløb',
                    description: 'Dette er afgørende for hvilke muligheder du har. Før uge 18+0 har du fri abort uden tilladelse. Efter uge 18 skal du søge tilladelse fra det Nationale Abortnævn.',
                    completed: false,
                    data: {
                        abortionWeeks: 0,
                        hasDoctorsPermit: null,
                        abortionMethod: null,
                    }
                },
                {
                    id: 3,
                    stepName: 'three',
                    question: 'Har du brug for tolk?',
                    description: 'Du har ret til gratis tolk ved abortforløb i Danmark, så du fuldt ud forstår informationen og forløbet.',
                    completed: false,
                    data: {
                        needsInterpreter: null,
                    }
                },
                {
                    id: 4,
                    stepName: 'four',
                    question: 'Ønsker du anonym og uvildig støttesamtale?',
                    description: 'Du kan tale fortroligt og anonymt med erfarne rådgivere hos Mødrehjælpen, Sex & Samfund eller Abortlinien. De kan hjælpe dig med at sortere dine tanker uden at påvirke din beslutning.',
                    completed: false,
                    data: {
                        wantsSupportConversation: null,
                    }
                },
                {
                    id: 5,
                    stepName: 'five',
                    question: 'Ønsker du information om præventionsvejledning efter aborten?',
                    description: 'Du kan få gratis præventionsvejledning og prævention i forbindelse med aborten, så du er godt beskyttet fremadrettet.',
                    completed: false,
                    data: {
                        wantsContraceptionInfo: null,
                    }
                },
                {
                    id: 6,
                    stepName: 'six',
                    question: 'Har du brug for information om efterfødselssamtaler/psykologisk støtte efter abort?',
                    description: 'Mange har brug for at tale om deres oplevelse bagefter. Du kan få gratis samtaler gennem sundhedsvæsenet eller frivillige organisationer.',
                    completed: false,
                    data: {
                        needsPostpartumSupportInfo: null,
                    }
                },
                {
                    id: 7,
                    stepName: 'seven',
                    question: 'Kender du til din ret til fortrolighed?',
                    description: 'Alt omkring din abort er omfattet af tavshedspligt. Informationen deles ikke med andre, heller ikke dine forældre (hvis du er over 15 år).',
                    completed: false,
                    data: {
                        knowsConfidentialityRights: null,
                    }
                }
            ]
        },
        {
            id: 'stillbirth',
            title: 'Stillbirth',
            steps: [
                {
                    id: 1,
                    stepName: 'one',
                    question: 'Fortæl os lidt om dig selv',
                    description: 'Dette hjælper os med at tilpasse informationen til dig og sikre, at vi giver dig den bedst mulige vejledning gennem abortprocessen.',
                    completed: false,
                    data: {
                        name: null,
                        age: null,
                        ageOfPartner: null,
                        gender: null,
                        hasCprNumber: null,
                    }
                },
                {
                    id: 2,
                    stepName: 'two',
                    question: 'Er jeres barn født før eller efter uge 22+0?',
                    description: 'Dette er vigtigt, da det påvirker jeres rettigheder og de muligheder for støtte, I har. Ved dødfødsel fra uge 22 har I flere juridiske rettigheder og støtteordninger sammenlignet med før uge 22.',
                    completed: false,
                    data: {
                        weekNumber: null,
                    }
                },
                {
                    id: 3,
                    stepName: 'three',
                    question: 'Er I stadig på hospitalet eller er I hjemme?',
                    description: 'Dette hjælper os med at vise jer den rigtige information. På hospitalet får I akut støtte, mens hjemme skal I navigere i praktiske opgaver og kontakt til myndigheder.',
                    completed: false,
                    data: {
                        placedLocation: null,
                    }
                },
                {
                    id: 4,
                    stepName: 'four',
                    question: 'Har I fået information om sorgorlov/sygemelding?',
                    description: 'Som forældre til et dødfødt barn har I ret til sorgorlov. Lønmodtagere får orlov via arbejdsgiver, mens selvstændige skal ansøge i NemRefusion. Vi kan hjælpe jer med at forstå jeres rettigheder og processen.',
                    completed: false,
                    data: {
                        informedAboutBereavementLeave: null,
                    }
                },
                {
                    id: 5,
                    stepName: 'five',
                    question: 'Ønsker I at navngive/få kaldenavn til jeres barn?',
                    description: 'Mange forældre finder det vigtigt at give deres barn et navn. Ved dødfødsel fra uge 22 får barnet et administrativt CPR-nummer, og I kan vælge navn. Før uge 22 kan I stadig vælge et kaldenavn.',
                    completed: false,
                    data: {
                        wantsToNameChild: null,
                    }
                },
                {
                    id: 6,
                    stepName: 'six',
                    question: 'Har I brug for hjælp til begravelse/bisættelse?',
                    description: 'Ved registreret liv (fra uge 22) har I ret til begravelseshjælp på 10.800 kr. Vi kan guide jer gennem kontakt til bedemand, valg af ceremoni og praktiske ting omkring begravelsen. Før uge 22 er begravelse valgfrit, men muligt.',
                    completed: false,
                    data: {
                        needsToPlanFuneral: null,
                    }
                },
                {
                    id: 7,
                    stepName: 'seven',
                    question: 'Har I fået nedgravningsattest eller dødsattest?',
                    description: 'Før uge 22 får I en nedgravningsattest (hvis I ønsker begravelse). Fra uge 22 får I en dødsattest. Disse dokumenter er nødvendige for begravelse og administration.',
                    completed: false,
                    data: {
                        hasReceivedDeathCertificate: null,
                    }
                },
                {
                    id: 8,
                    stepName: 'eight',
                    question: 'Ønsker I information om obduktion?',
                    description: 'En obduktion kan nogle gange give svar på hvorfor jeres barn døde. Det er jeres valg, og vi kan hjælpe jer med at forstå processen og hvad den kan betyde for jer.',
                    completed: false,
                    data: {
                        wantsInformationAboutAutopsy: null,
                    }
                },
                {
                    id: 9,
                    stepName: 'nine',
                    question: 'Har I andre børn derhjemme, som I skal tale med om sorgen?',
                    description: 'Søskende reagerer forskelligt på tab. Vi kan guide jer til ressourcer om hvordan I taler med jeres børn om deres døde søskende på en alderssvarende måde.',
                    completed: false,
                    data: {
                        hasOtherChildrenAtHome: null,
                    }
                },
                {
                    id: 10,
                    stepName: 'ten',
                    question: 'Kender i til jeres støttemuligheder',
                    description: 'Der findes gratis professionel hjælp: Terapeutiske samtaler hos Familier & Sorg, sorggrupper hvor I møder andre i samme situation, og psykologsamtaler gennem sundhedsvæsenet. I er ikke alene.',
                    completed: false,
                    data: {
                        knowsSupportOptions: null,
                    }
                },
                {
                    id: 11,
                    stepName: 'eleven',
                    question: 'Skal I have hjælp til at ansøge om sorgorlov?',
                    description: 'Hvis I er lønmodtagere, indberetter jeres arbejdsgiver orloven. Hvis I er selvstændige, skal I selv ansøge i NemRefusion senest 8 uger efter første orlovsdag. Vi kan guide jer gennem processen.',
                    completed: false,
                    data: {
                        needsHelpApplyingForBereavementLeave: null,
                    }
                },
            ]
        },
        {
            id: 'parenting',
            title: 'Parenting',
            steps: [
                {
                    id: 1,
                    stepName: 'one',
                    question: 'Hvornår blev jeres barn født?',
                    description: 'Datoen hjælper os med at guide jer til den rigtige information baseret på barnets alder og hvilke besøg/undersøgelser der skal ske hvornår.',
                    completed: false,
                    data: {
                        birthDate: '',
                    }
                },
                {
                    id: 2,
                    stepName: 'two',
                    question: 'Er I kommet hjem fra hospitalet?',
                    description: 'Dette fortæller os om I stadig har adgang til akut hjælp på hospitalet, eller om I skal navigere hjemme med jordemoderbesøg og sundhedspleje.',
                    completed: false,
                    data: {
                        hasReturnedHome: null,
                    }
                },
                {
                    id: 3,
                    stepName: 'three',
                    question: 'Er det jeres første barn?',
                    description: 'Førstegangsforældre har ofte brug for mere grundlæggende information, mens erfarne forældre måske søger specifik hjælp eller har andre spørgsmål.',
                    completed: false,
                    data: {
                        isFirstChild: null,
                    }
                },
                {
                    id: 4,
                    stepName: 'four',
                    question: 'Har I fået kontakt fra jordemoder og sundhedspleje?',
                    description: 'Jordemoder kontakter jer dag 2-3 efter fødsel, og sundhedsplejersken dag 4-5. Hvis de ikke har ringet, skal I selv tage kontakt. De er jeres vigtigste støtte de første uger.',
                    completed: false,
                    data: {
                        contactedByMidwifeOrHealthVisitor: null,
                    }
                },
                {
                    id: 5,
                    stepName: 'five',
                    question: 'Er der planlagt hælblodprøve og høretest?',
                    description: 'Hælblodprøven (PKU-test) tages dag 2-3 og screener for 23 sjældne sygdomme. Høretesten skal ske inden for de første 10 dage. Begge er vigtige for barnets sundhed.',
                    completed: false,
                    data: {
                        childTestProcessPlanned: null,
                    }
                },
                {
                    id: 6,
                    stepName: 'six',
                    question: 'Har I brug for information om barselsorlov og dagpenge?',
                    description: 'Mor har ret til op til 24 ugers orlov efter de 2 ugers tvungne barsel. Far/medmor har ret til op til 24 ugers orlov. 11 uger er øremærket til hver (kan ikke overdrages), mens 13 uger kan deles. Det er vigtigt I kender jeres rettigheder, så I kan planlægge tiden sammen med jeres barn.',
                    completed: false,
                    data: {
                        needsInfoOnParentalLeave: null,
                    }
                },
                {
                    id: 7,
                    stepName: 'seven',
                    question: 'Kender I til børneydelse, lægeundersøgelse og efterfødselsundersøgelse?',
                    description: 'Børneydelse udbetales automatisk fra Udbetaling Danmark. Jeres barn skal til 5-ugers lægeundersøgelse, og mor skal til 8-ugers efterfødselsundersøgelse. Vi kan hjælpe jer med at huske disse vigtige aftaler.',
                    completed: false,
                    data: {
                        knowsChildBenefitsAndCheckups: null,
                    }
                },
                {
                    id: 8,
                    stepName: 'eight',
                    question: 'Hvordan går det med amning/madning, søvn og trivsel?',
                    description: 'De første uger kan være hårde. Det er normalt at have udfordringer med amning, søvn og at finde rytmen. Jordemoderen og sundhedsplejersken kan hjælpe jer, og det er vigtigt I søger hjælp hvis I har brug for det.',
                    completed: false,
                    data: {
                        wellbeingChallenges: [],
                    }
                },
                {
                    id: 9,
                    stepName: 'nine',
                    question: 'Har I brug for støtte omkring fødselsdepression eller fødselstraume?',
                    description: 'Op til 15% af mødre oplever fødselsdepression, og nogle oplever traumatiske fødsler. Sundhedsplejersken screener for dette, men I kan altid søge hjælp hvis I har det svært. Der findes effektiv behandling.',
                    completed: false,
                    data: {
                        needsSupportForPostpartumIssues: null,
                    }
                },
                {
                    id: 10,
                    stepName: 'ten',
                    question: 'Ønsker I at deltage i mød regruppe eller fædregruppe?',
                    description: 'Forældregrupperne er en god måde at møde andre i samme situation, få socialt netværk og dele erfaringer. Sundhedsplejersken kan hjælpe jer med at komme med i en gruppe.',
                    completed: false,
                    data: {
                        wantsToJoinParentGroups: null,
                    }
                },
                {
                    id: 11,
                    stepName: 'eleven',
                    question: 'Har I planlagt vuggestue/dagpleje?',
                    description: 'Ventelister kan være lange i nogle kommuner. I skal skrive jeres barn op mindst 3 måneder før I har brug for pladsen - gerne tidligere.',
                    completed: false,
                    data: {
                        hasPlannedDaycare: null,
                    }
                },
                {
                    id: 12,
                    stepName: 'twelve',
                    question: 'Kender I til Sundhedsplejens besøgsplan i din kommune?',
                    description: 'Sundhedsplejersken kommer på 6 hjemmebesøg det første år (ved 2-3 uger, 2-3 måneder, 4-6 måneder, 8-10 måneder). De følger barnets udvikling, vejleder jer og er jeres faste kontakt.',
                    completed: false,
                    data: {
                        knowsHealthVisitorSchedule: null,
                    }
                },
                {
                    id: 13,
                    stepName: 'thirteen',
                    question: 'Er der særlige bekymringer om barnets eller mors sundhed?',
                    description: 'Bekymringer om barnets vægt, gulsot, amning eller mors fysiske gener (bristninger, blødning, smerter) skal altid tages alvorligt. Vi kan guide jer til hvor I skal søge hjælp.',
                    completed: false,
                    data: {
                        hasHealthConcerns: null,
                    }
                }
            ]
        }
    ],
}
