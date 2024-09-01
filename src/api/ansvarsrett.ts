import { WizardDefinition } from "losen";

const data: WizardDefinition = {
  meta: {
    title: "Erklæring om ansvarsrett",
    name: "veiviser_ansvar",
    footer: "Your footer here!",
  },
  schema: [
    {
      id: "page1",
      type: "Page",
      heading: "Informasjon om firmaet ditt",
      lead: "<p>Dersom firmaet ditt har norsk organisasjonsnummer vil informasjon om firmaet ditt hentes fra Brønnøysundregistrene.</p><p>Representerer du et utenlandsk firma, må du fylle inn informasjonen manuelt.</p>",
      children: [
        {
          id: "companytype",
          property: "companytype",
          type: "Radio",
          heading: "Hvem representerer du?",
          options: [
            {
              id: "companytype.norwegian",
              type: "Answer",
              heading: "Et norsk firma",
              value: "norwegian",
            },
            {
              id: "companytype.foreign",
              type: "Answer",
              heading: "Et utenlandsk firma",
              value: "foreign",
            },
          ],
        },
        {
          type: "Branch",
          id: "companyinfo",
          branches: [
            {
              test: {
                field: "companytype",
                operator: "eq",
                value: "norwegian",
              },
              children: [
                {
                  id: "orgNr",
                  property: "orgnr",
                  type: "FetchOrg",
                  heading: "Organisasjonsnummer",
                  text: "<p>Eksempel: 123 456 789 eller 123456789</p>",
                  placeholder: "987 654 321",
                  source: "https://data.brreg.no/enhetsregisteret/api/enheter/",
                  information:
                    'Er firmaets navn eller adresse feil? Da må du endre denne informasjonen via skjemaet <a href="https://www.altinn.no/no/Starte-og-drive-bedrift/Drive/Andre-driftsoppgaver/Flytting-og-omorganisering/Hvordan-meldes-flytting-og-andre-endringer/">Samordnet registermelding</a> i Altinn før du fortsetter.',
                  fetchSG: true,
                  SGheading:
                    "${name} er registrert med sentral godkjenning for følgende områder",
                  invalidapproval:
                    "Vi fant ikke godkjenningen din i systemet vårt",
                  invalidOrg:
                    "Vi fant ikke det organisasjonsnummeret. Kontroller at du har skrevet det riktig.",
                  SGsource: "https://sgregister.dibk.no/api/enterprises/",
                  validator: {
                    object: "orgid",
                    pattern: "(\\d[\\s-]*){8}\\d",
                    error: "Må være gyldig organisasjonsnummer",
                  },
                },
              ],
            },
            {
              test: {
                field: "companytype",
                operator: "eq",
                value: "foreign",
              },
              children: [
                {
                  id: "companyinfo",
                  type: "Group",
                  heading: "Firmainformasjon",
                  children: [
                    {
                      id: "foreigncompany.country",
                      property: "foreigncompany.country",
                      type: "Input",
                      heading: "Land",
                      autocomplete: "country-name",
                    },
                    {
                      id: "foreigncompany.name",
                      property: "foreigncompany.name",
                      type: "Input",
                      heading: "Firmaets navn",
                      autocomplete: "organization",
                    },
                    {
                      id: "foreigncompany.adresse",
                      property: "contactperson.adresse",
                      type: "Input",
                      heading: "Adresse",
                      autocomplete: "street-address",
                    },
                    {
                      id: "foreigncompany.postnummer",
                      property: "contactperson.postnummer",
                      type: "Input",
                      heading: "Postnummer",
                      autocomplete: "postal-code",
                    },
                    {
                      id: "foreigncompany.poststed",
                      property: "contactperson.poststed",
                      type: "Input",
                      heading: "Poststed",
                      autocomplete: "address-level2",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "contactperson",
          type: "Group",
          heading: "Kontaktperson for prosjektet",
          children: [
            {
              id: "contactperson.name",
              property: "contactperson.name",
              type: "Input",
              heading: "Navn",
              autocomplete: "name",
            },
            {
              id: "contactperson.email",
              property: "contactperson.email",
              type: "Input",
              validator: {
                pattern: "\\S+@\\S+\\.\\S+",
                error: "Må være en epost",
              },
              heading: "Epost",
              autocomplete: "email",
            },
            {
              id: "contactperson.phone",
              property: "contactperson.phone",
              type: "Input",
              heading: "Telefon",
              autocomplete: "tel",
            },
          ],
        },
      ],
    },
    {
      id: "page2",
      type: "Page",
      heading: "Har firmaet riktig kompetanse til å erklære ansvar?",
      lead: "<p>Firmaet må ha en faglig ledelse med tilstrekkelig relevant utdanning og relevant erfaring. Den faglige ledelsen må delta i prosjektet som ansvarsretten gjelder, skal ha innflytelse over beslutninger i prosjektet og sikre at kravene i plan- og bygningsloven blir ivaretatt. Den faglige ledelsen kan være innleid i prosjektet.</p>",
      children: [
        {
          id: "competence",
          type: "Group",
          heading:
            "Hvilken relevant utdanning og relevant erfaring har den faglige ledelsen?",
          text: "Du må selv vurdere om den konkret utdanningen og arbeidserfaringen til faglig ledelse er relevant for oppgaven som firmaet skal utføre.",
          children: [
            {
              id: "competence.education",
              property: "competence.education",
              type: "Select",
              heading: "Velg relevant utdanning til faglig ledelse",
              defaultOption: "Velg utdanningsnivå",
              text: '<p><a href="https://dibk.no/byggeregler/sak/3/11/11-2/ ">Les mer om utdanningsnivåer</a> i byggesaksforskriften.</p>',
              options: [
                {
                  id: "competence.education.none",
                  type: "Answer",
                  heading: "Annet",
                  value: 0,
                },
                {
                  id: "competence.education.fagsvenneprove",
                  type: "Answer",
                  heading: "Fag- eller svennebrev",
                  value: 1,
                },
                {
                  id: "competence.education.mesterellerfagskole",
                  type: "Answer",
                  heading: "Mesterbrev",
                  value: 2,
                },
                {
                  id: "competence.education.fagskolegrad",
                  type: "Answer",
                  heading: "Høyere fagskolegrad med 120 studiepoeng",
                  value: 3,
                },
                {
                  id: "competence.education.bachelor",
                  type: "Answer",
                  heading: "Bachelor i ingeniørfag eller høgskolegrad",
                  value: 4,
                },
                {
                  id: "competence.education.sivilarkitekt",
                  type: "Answer",
                  heading: "Sivilarkitekt eller sivilingeniør",
                  value: 5,
                },
                {
                  id: "competence.education.master",
                  type: "Answer",
                  heading: "Master innen ingeniørfag eller arkitektur",
                  value: 6,
                },
              ],
            },
            {
              id: "competence.experience",
              property: "competence.experience",
              type: "Number",
              text: '<p>Arbeidserfaringen må være opparbeidet etter endt relevant utdanning. I tiltaksklasse 1 eller 2 oppgir du arbeidserfaring fra siste 10 år, for tiltaksklasse 3 oppgir du fra siste 15 år.</p><p><a href="https://dibk.no/byggeregler/sak/3/11/11-4/ ">Les mer om krav til praksis</a> i byggesaksforskriften.</p>',
              heading:
                "Velg antall år med relevant arbeidserfaring til faglig ledelse",
              minimum: 0,
              placeholder: "0",
              unit: "år",
            },
            {
              id: "possibleRoles",
              heading: "Hvilke funksjoner kan firmaet ditt erklære ansvar for?",
              text: "<p>Firmaet ditt kan erklære ansvar for følgende funksjoner:</p>",
              type: "Table",
              cells: [
                [
                  {
                    id: "possibleRoles.function",
                    type: "Heading",
                    rowSpan: 2,
                    text: "FUNKSJON",
                  },
                  {
                    id: "possibleRoles.class",
                    type: "Heading",
                    colSpan: 3,
                    text: "TILTAKSKLASSE",
                  },
                ],
                [
                  {
                    id: "possibleRoles.class.1",
                    type: "Heading",
                    text: "Tiltaksklasse 1",
                  },
                  {
                    id: "possibleRoles.class.2",
                    type: "Heading",
                    text: "Tiltaksklasse 2",
                  },
                  {
                    id: "possibleRoles.class.3",
                    type: "Heading",
                    text: "Tiltaksklasse 3",
                  },
                ],
                [
                  {
                    id: "possibleRoles.applicant",
                    type: "Heading",
                    text: "Ansvarlig søker",
                  },
                  {
                    id: "possibleRoles.table.1+applicant",
                    type: "Cell",
                    rowSpan: 2,
                    text: "Mesterbrev eller høyere fagskolegrad + 4 års erfaring fra 10 siste år",
                    test: {
                      type: "and",
                      clauses: [
                        {
                          field: "competence.education",
                          operator: "gte",
                          value: 2,
                        },
                        {
                          field: "competence.experience",
                          operator: "gte",
                          value: 4,
                        },
                      ],
                    },
                  },
                  {
                    id: "possibleRoles.table.2+applicant",
                    type: "Cell",
                    text: "Mesterbrev eller høyere fagskolegrad + 6 års erfaring fra 10 siste år",
                    test: {
                      type: "and",
                      clauses: [
                        {
                          field: "competence.education",
                          operator: "gte",
                          value: 2,
                        },
                        {
                          field: "competence.experience",
                          operator: "gte",
                          value: 6,
                        },
                      ],
                    },
                  },
                  {
                    id: "possibleRoles.table.3+applicant",
                    type: "Cell",
                    rowSpan: 2,
                    text: "Sivilarkitekt, sivilingeniør eller master innen ingeniørfag eller arkitektur + 8 års erfaring fra 15 siste år",
                    test: {
                      type: "and",
                      clauses: [
                        {
                          field: "competence.education",
                          operator: "gte",
                          value: 5,
                        },
                        {
                          field: "competence.experience",
                          operator: "gte",
                          value: 8,
                        },
                      ],
                    },
                  },
                ],
                [
                  {
                    id: "possibleRoles.table.projecting",
                    type: "Heading",
                    text: "Prosjekterende",
                  },
                  {
                    id: "possibleRoles.table.1+projecting",
                    type: "Cell",
                    text: "Høyere fagskolegrad + 10 års erfaring fra 10 siste år<br/><br/><em>eller</em><br/><br/>Bachelor i ingeniørfag eller høgskolegrad + 6 års erfaring fra 10 siste år",
                    test: {
                      type: "or",
                      clauses: [
                        {
                          type: "and",
                          clauses: [
                            {
                              field: "competence.education",
                              operator: "gte",
                              value: 3,
                            },
                            {
                              field: "competence.experience",
                              operator: "gte",
                              value: 10,
                            },
                          ],
                        },
                        {
                          type: "and",
                          clauses: [
                            {
                              field: "competence.education",
                              operator: "gte",
                              value: 4,
                            },
                            {
                              field: "competence.experience",
                              operator: "gte",
                              value: 6,
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
                [
                  {
                    id: "possibleRoles.table.performing",
                    type: "Heading",
                    text: "Utførende",
                  },
                  {
                    id: "possibleRoles.table.1+performing",
                    type: "Cell",
                    text: "Fag- eller svennebrev + 2 års erfaring fra 10 siste år",
                    test: {
                      type: "and",
                      clauses: [
                        {
                          field: "competence.education",
                          operator: "gte",
                          value: 1,
                        },
                        {
                          field: "competence.experience",
                          operator: "gte",
                          value: 2,
                        },
                      ],
                    },
                  },
                  {
                    id: "possibleRoles.table.2+performing",
                    type: "Cell",
                    text: "Mesterbrev eller høyere fagskolegrad + 3 års erfaring fra 10 siste år",
                    test: {
                      type: "and",
                      clauses: [
                        {
                          field: "competence.education",
                          operator: "gte",
                          value: 2,
                        },
                        {
                          field: "competence.experience",
                          operator: "gte",
                          value: 3,
                        },
                      ],
                    },
                  },
                  {
                    id: "possibleRoles.table.3+performing",
                    type: "Cell",
                    text: "Høyere fagskolegrad + 8 års erfaring fra 15 siste år<br/><br/><em>eller</em><br/><br/>Bachelor i ingeniørfag eller høgskolegrad + 5 års erfaring fra 15 siste år",
                    test: {
                      type: "or",
                      clauses: [
                        {
                          type: "and",
                          clauses: [
                            {
                              field: "competence.education",
                              operator: "gte",
                              value: 3,
                            },
                            {
                              field: "competence.experience",
                              operator: "gte",
                              value: 8,
                            },
                          ],
                        },
                        {
                          type: "and",
                          clauses: [
                            {
                              field: "competence.education",
                              operator: "gte",
                              value: 4,
                            },
                            {
                              field: "competence.experience",
                              operator: "gte",
                              value: 5,
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
                [
                  {
                    id: "possibleRoles.table.controlling",
                    type: "Heading",
                    text: "Kontrollerende",
                  },
                  {
                    id: "possibleRoles.table.1+controlling",
                    type: "Cell",
                    text: "Mesterbrev eller høyere fagskolegrad + 4 års erfaring fra 10 siste år",
                    test: {
                      type: "and",
                      clauses: [
                        {
                          field: "competence.education",
                          operator: "gte",
                          value: 2,
                        },
                        {
                          field: "competence.experience",
                          operator: "gte",
                          value: 4,
                        },
                      ],
                    },
                  },
                  {
                    id: "possibleRoles.table.2+controlling",
                    type: "Cell",
                    text: "Bachelor i ingeniørfag eller høgskolegrad + 6 års erfaring fra 10 siste år",
                    test: {
                      type: "and",
                      clauses: [
                        {
                          field: "competence.education",
                          operator: "gte",
                          value: 4,
                        },
                        {
                          field: "competence.experience",
                          operator: "gte",
                          value: 6,
                        },
                      ],
                    },
                  },
                  {
                    id: "possibleRoles.table.3+controlling",
                    type: "Cell",
                    text: "Sivilarkitekt, sivilingeniør eller master innen ingeniørfag eller arkitektur + 8 års erfaring fra 15 siste år",
                    test: {
                      type: "and",
                      clauses: [
                        {
                          field: "competence.education",
                          operator: "gte",
                          value: 5,
                        },
                        {
                          field: "competence.experience",
                          operator: "gte",
                          value: 8,
                        },
                      ],
                    },
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "class",
          property: "class",
          type: "Radio",
          heading: "I hvilken tiltaksklasse er jobben?",
          text: '<p>Snakk med ansvarlig søker hvis du er i tvil om hvilken tiltaksklasse arbeidene du skal gjøre er. <a href="https://dibk.no/byggeregler/sak/3/9/9-4/">Les mer om tiltaksklasser i byggesaksforskriften.</a></p>',
          options: [
            {
              id: "class.1",
              type: "Answer",
              heading: "Tiltaksklasse 1",
              text: "Alt arbeid med eneboliger, tomannsboliger og rekkehus er normalt tiltaksklasse 1. Spesielt vanskelige forhold kan komme i høyere tiltaksklasse. I større bygninger kan noe av arbeidene som ikke er kompliserte settes i tiltaksklasse 1.",
              image: {
                url: "/images/tk1.svg",
                alt: "Lite hus",
              },
              value: "tiltaksklasse1",
              messages: [
                {
                  message: "Faglig ledelse har riktig kompetanse",
                  show: {
                    type: "and",
                    clauses: [
                      {
                        field: "competence.education",
                        operator: "gte",
                        value: 1,
                      },
                      {
                        field: "competence.experience",
                        operator: "gte",
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  message: "Faglig ledelse har ikke riktig kompetanse",
                  warning: true,
                  show: {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.education",
                        operator: "required",
                      },
                      {
                        field: "competence.experience",
                        operator: "required",
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: "class.2",
              type: "Answer",
              heading: "Tiltaksklasse 2",
              text: "For eksempel boligblokker og kontorbygg på 3-4 etasjer. Spesielt vanskelige og kritiske forhold kan komme i høyere tiltaksklasse, mens for mindre vanskelig arbeid kan tiltaksklassen reduseres.",
              image: {
                url: "/images/tk2.svg",
                alt: "Større hus",
              },
              value: "tiltaksklasse2",
              messages: [
                {
                  message: "Faglig ledelse har riktig kompetanse",
                  show: {
                    type: "and",
                    clauses: [
                      {
                        field: "competence.education",
                        operator: "gte",
                        value: 2,
                      },
                      {
                        field: "competence.experience",
                        operator: "gte",
                        value: 3,
                      },
                    ],
                  },
                },
                {
                  message: "Faglig ledelse har ikke riktig kompetanse",
                  warning: true,
                  show: {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.education",
                        operator: "required",
                      },
                      {
                        field: "competence.experience",
                        operator: "required",
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: "class.3",
              type: "Answer",
              heading: "Tiltaksklasse 3",
              text: "Arbeid med store og kompliserte bygninger er i tiltaksklasse 3. Gjelder også for enkelte ansvarsområder i mindre bygninger hvor arbeidet er spesielt vanskelig eller kritiske. For mindre vanskelig arbeid kan tiltaksklassen reduseres.",
              image: {
                url: "/images/tk3.svg",
                alt: "Størst hus",
              },
              value: "tiltaksklasse3",
              messages: [
                {
                  message: "Faglig ledelse har riktig kompetanse",
                  show: {
                    type: "or",
                    clauses: [
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 3,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 8,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 4,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 5,
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  message: "Faglig ledelse har ikke riktig kompetanse",
                  warning: true,
                  show: {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.education",
                        operator: "required",
                      },
                      {
                        field: "competence.experience",
                        operator: "required",
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          id: "function",
          property: "function",
          type: "Radio",
          heading: "Hvilken funksjon har firmaet ditt i prosjektet?",
          text: '<p><a href="https://dibk.no/byggeregler/sak/3/12/innledning/">Les mer om hvilket ansvar du har</a> som ansvarlig søker, prosjekterende, utførende og kontrollerende i byggesaksforskriften.</p>',
          options: [
            {
              id: "function.sok",
              type: "Answer",
              heading: "Ansvarlig søker (SØK)",
              value: "sok",
              messages: [
                {
                  message: "Faglig ledelse har riktig kompetanse",
                  show: {
                    type: "or",
                    clauses: [
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse1",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 2,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 4,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse2",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 2,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 6,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse3",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 5,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 8,
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  message: "Faglig ledelse har ikke riktig kompetanse",
                  warning: true,
                  show: {
                    type: "or",
                    clauses: [
                      {
                        field: "class",
                        operator: "required",
                      },
                      {
                        field: "competence.education",
                        operator: "required",
                      },
                      {
                        field: "competence.experience",
                        operator: "required",
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: "function.pro",
              type: "Answer",
              heading: "Ansvarlig prosjekterende (PRO)",
              value: "pro",
              messages: [
                {
                  message: "Faglig ledelse har riktig kompetanse",
                  show: {
                    type: "or",
                    clauses: [
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse1",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 2,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 4,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse2",
                          },
                          {
                            type: "or",
                            clauses: [
                              {
                                type: "and",
                                clauses: [
                                  {
                                    field: "competence.education",
                                    operator: "gte",
                                    value: 3,
                                  },
                                  {
                                    field: "competence.experience",
                                    operator: "gte",
                                    value: 10,
                                  },
                                ],
                              },
                              {
                                type: "and",
                                clauses: [
                                  {
                                    field: "competence.education",
                                    operator: "gte",
                                    value: 4,
                                  },
                                  {
                                    field: "competence.experience",
                                    operator: "gte",
                                    value: 6,
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse3",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 5,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 8,
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  message: "Faglig ledelse har ikke riktig kompetanse",
                  warning: true,
                  show: {
                    type: "or",
                    clauses: [
                      {
                        field: "class",
                        operator: "required",
                      },
                      {
                        field: "competence.education",
                        operator: "required",
                      },
                      {
                        field: "competence.experience",
                        operator: "required",
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: "function.utf",
              type: "Answer",
              heading: "Ansvarlig utførende (UTF)",
              value: "utf",
              messages: [
                {
                  message: "Faglig ledelse har riktig kompetanse",
                  show: {
                    type: "or",
                    clauses: [
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse1",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 1,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 2,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse2",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 2,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 3,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse3",
                          },
                          {
                            type: "or",
                            clauses: [
                              {
                                type: "and",
                                clauses: [
                                  {
                                    field: "competence.education",
                                    operator: "gte",
                                    value: 3,
                                  },
                                  {
                                    field: "competence.experience",
                                    operator: "gte",
                                    value: 8,
                                  },
                                ],
                              },
                              {
                                type: "and",
                                clauses: [
                                  {
                                    field: "competence.education",
                                    operator: "gte",
                                    value: 4,
                                  },
                                  {
                                    field: "competence.experience",
                                    operator: "gte",
                                    value: 5,
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  message: "Faglig ledelse har ikke riktig kompetanse",
                  warning: true,
                  show: {
                    type: "or",
                    clauses: [
                      {
                        field: "class",
                        operator: "required",
                      },
                      {
                        field: "competence.education",
                        operator: "required",
                      },
                      {
                        field: "competence.experience",
                        operator: "required",
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: "function.krp",
              type: "Answer",
              heading: "Ansvarlig kontrollerende (kontroll)",
              value: "krp",
              messages: [
                {
                  message: "Faglig ledelse har riktig kompetanse",
                  show: {
                    type: "or",
                    clauses: [
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse1",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 2,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 4,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse2",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 4,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 6,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse3",
                          },
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 5,
                          },
                          {
                            field: "competence.experience",
                            operator: "gte",
                            value: 8,
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  message: "Faglig ledelse har ikke riktig kompetanse",
                  warning: true,
                  show: {
                    type: "or",
                    clauses: [
                      {
                        field: "class",
                        operator: "required",
                      },
                      {
                        field: "competence.education",
                        operator: "required",
                      },
                      {
                        field: "competence.experience",
                        operator: "required",
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          type: "Branch",
          id: "competence",
          branches: [
            {
              test: {
                type: "or",
                clauses: [
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse1",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "function",
                            operator: "eq",
                            value: "sok",
                          },
                          {
                            field: "function",
                            operator: "eq",
                            value: "pro",
                          },
                        ],
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 4,
                          },
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 2,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse1",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "utf",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 2,
                          },
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 1,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse1",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "krp",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 4,
                          },
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 2,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse2",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "sok",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 6,
                          },
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 2,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse2",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "function",
                            operator: "eq",
                            value: "pro",
                          },
                          {
                            field: "function",
                            operator: "eq",
                            value: "krp",
                          },
                        ],
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 6,
                          },
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 3,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse2",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "function",
                            operator: "eq",
                            value: "pro",
                          },
                          {
                            field: "function",
                            operator: "eq",
                            value: "krp",
                          },
                        ],
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 6,
                          },
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 3,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse2",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "utf",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 3,
                          },
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 2,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse3",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "function",
                            operator: "eq",
                            value: "sok",
                          },
                          {
                            field: "function",
                            operator: "eq",
                            value: "pro",
                          },
                          {
                            field: "function",
                            operator: "eq",
                            value: "krp",
                          },
                        ],
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 8,
                          },
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 4,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    clauses: [
                      {
                        field: "class",
                        operator: "eq",
                        value: "tiltaksklasse3",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "utf",
                      },
                      {
                        type: "or",
                        clauses: [
                          {
                            field: "competence.education",
                            operator: "lt",
                            value: 3,
                          },
                          {
                            type: "and",
                            clauses: [
                              {
                                field: "competence.education",
                                operator: "eq",
                                value: 3,
                              },
                              {
                                field: "competence.experience",
                                operator: "lt",
                                value: 8,
                              },
                            ],
                          },
                          {
                            type: "and",
                            clauses: [
                              {
                                field: "competence.education",
                                operator: "gte",
                                value: 4,
                              },
                              {
                                field: "competence.experience",
                                operator: "lt",
                                value: 5,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              children: [
                {
                  id: "competencyError",
                  heading: "Firmaet ditt kan ikke erklære ansvar",
                  type: "ErrorOk",
                  children: [
                    {
                      type: "Branch",
                      id: "competencyError.branch",
                      branches: [
                        {
                          test: {
                            type: "and",
                            clauses: [
                              {
                                field: "class",
                                operator: "eq",
                                value: "tiltaksklasse1",
                              },
                              {
                                field: "function",
                                operator: "neq",
                                value: "krp",
                              },
                            ],
                          },
                          children: [
                            {
                              id: "applymunicipality",
                              type: "Group",
                              children: [
                                {
                                  id: "insufficientCompentency",
                                  type: "Text",
                                  text: "<strong>Firmaet ditt kan ikke erklære ansvar, men kan søke kommunen om ansvarsrett</strong>",
                                },
                                {
                                  id: "failedButCanGoOn",
                                  type: "Text",
                                  text: "<p>Firmaet ditt mangler formell kompetanse til å erklære ansvar. Vi kan hjelpe deg å fylle ut en søknad til kommunen om å likevel få tillatelse til å gjøre jobben.</p>",
                                },
                                {
                                  id: "competence.additional",
                                  property: "competence.additional",
                                  type: "Textarea",
                                  heading:
                                    "Beskriv relevant kompetanse og erfaring til firmaet. Dette kan for eksempel være kurs, etterutdanning eller lignende prosjekter.",
                                  text: "<p>Kommunen vil ta dette i betraktning når de behandler søknaden din.</p>",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          test: {
                            field: "class",
                            operator: "required",
                          },
                          children: [
                            {
                              id: "applymunicipality",
                              type: "Error",
                              children: [
                                {
                                  type: "Reference",
                                  nodeId: "insufficientCompentency",
                                },
                                {
                                  id: "failedButCanGoOn",
                                  type: "Text",
                                  text: '<p>Du kan fortsatt gå videre i veiviseren, men du vil ikke kunne erklære ansvar for arbeidet som skal gjøres. Vil du vite mer om kravene? <a href="https://dibk.no/byggeregler/sak/3/11/11-3/">Les mer om krav til utdanning og praksis på DiBKs nettsider.</a></p>',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "responsibility",
      type: "Page",
      heading: "Hva skal firmaet ta ansvar for?",
      lead: "Beskriv det du skal gjøre så nøyaktig og presist som mulig. Dette er viktig for å unngå å ende opp med ansvar for byggearbeider som andre foretak skulle tatt ansvar for.",
      children: [
        {
          id: "responsibility.description",
          property: "responsibility.description",
          type: "Textarea",
          heading: "Beskriv kort arbeidet som firmaet ditt tar ansvar for",
          information:
            "Husk at det du beskriver her vil firmaet bli stilt til ansvar for",
          summary: "Se eksempler",
          details:
            "<h3>Grunnarbeider</h3><p>Graving og sprengning av byggegrop, kulting og komprimering, legging av radonsperre, samt graving og gjenfylling av grøfter.</p><h3>Plassering</h3><p>Utstikking av høyde og plan før graving. Kvalitetssikre plassering av såle og grunnmur.</p><h3>Arkitektur</h3><p>Prosjektering av situasjonsplan, visuell utforming og terrengtilpasning, innvendig planløsning.</p>",
        },
        {
          type: "Branch",
          id: "responsibility.branch",
          branches: [
            {
              test: {
                field: "sgdata",
                operator: "eq",
                value: true,
              },
              children: [
                {
                  id: "responsibility.area",
                  property: "responsibility.area",
                  type: "Radio",
                  heading:
                    "Dekkes ansvarsområdet av firmaets sentrale godkjenning?",
                  options: [
                    {
                      id: "responsibility.area.yes",
                      type: "Answer",
                      heading: "Ja, hele ansvarsområdet er dekket",
                      value: "yes",
                    },
                    {
                      id: "responsibility.area.part",
                      type: "Answer",
                      heading: "Deler av ansvarsområdet er dekket",
                      value: "part",
                    },
                    {
                      id: "responsibility.area.no",
                      type: "Answer",
                      heading:
                        "Nei, ansvarsområdet dekkes ikke av den sentrale godkjenningen",
                      value: "no",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Branch",
          id: "responsibility.branch2",
          branches: [
            {
              test: {
                field: "function",
                operator: "neq",
                value: "sok",
              },
              children: [
                {
                  id: "responsiblefirm",
                  property: "responsiblefirm",
                  type: "Input",
                  heading: "Hvilket firma er ansvarlig søker?",
                  text: "<p>Skriv inn  navnet på firmaet.</p>",
                  autocomplete: "organization",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "declarationofconformityutf",
      type: "Page",
      heading: "Når regner du med å sende samsvarserklæring?",
      lead: '<p>Når du har gjort jobben, må du erklære at arbeidet er forskriftsmessig utført ved å sende en Samsvarserklæring til ansvarlig søker.</p><p>Det er vanlig å gjøre dette når du er helt ferdig, men du kan også lage flere erklæringer underveis. Dette må du gjøre om arbeidet ditt skal være ferdig ved søknad om igangsettingstillatelse, midlertidig brukstillatelse eller når det skal søkes om ferdigattest.</p><p>Det viktige er at du ikke krysser av for at du er ferdig med arbeidet før du faktisk er det!</p><p><a href="https://dibk.no/byggeregler/sak/1/1/1-2/?_t_id=icu3BVXVvaK3ddH6i8JK6Q%3d%3d&_t_q=samsvarserkl%C3%A6ring&_t_tags=language%3ano%2csiteid%3aa8fed669-6208-4354-8fe6-9c93cb91a133&_t_ip=195.159.248.98%3a59714&_t_hit.id=EPiServer_Templates_DIBK_PageTypes_Veiledninger_ParagrafPageType/_a0b64d87-7db5-42f9-a6cb-238f9d1daebc_no&_t_hit.pos=1">Les mer om samsvarserklæring i SAK10 § 1-2</a><p>',
      show: {
        field: "function",
        operator: "eq",
        value: "utf",
      },
      children: [
        {
          id: "conformity.type",
          property: "conformity.type",
          type: "Checkbox",
          heading:
            "Ved hvilken delsøknad regner du å sende inn samsvarserklæring?",
          options: [
            {
              id: "conformity.type.3",
              type: "Answer",
              heading: "Midlertidig brukstillatelse",
              text: "Dette er en søknad om tillatelse til å bruke et byggverk midlertidig, selv om det ikke er helt ferdig. Det må allikevel gjenstå såpass lite at kommunen må finne det forsvarlig å kunne ta det i bruk. Det er vanlig at samsvarserklæringer på utførelse foreligger her.",
              value: "3",
              image: {
                url: "/images/samsvar3.svg",
                alt: "Midlertidig brukstillatelse",
              },
            },
            {
              id: "conformity.type.4",
              type: "Answer",
              heading: "Ferdigattest",
              text: "Alle tiltak du må søke om, må også avsluttes med en ferdigattest som du får av kommunen. En ferdigattest skal foreligge før bygget tas i bruk, ellers må man søke om en “midlertidig brukstillatelse”. Før du får ferdigattest må samsvarserklæringer som erklærer at arbeidet er helt ferdig foreligge for alle ansvarsområder. Er disse allerede sendt, trenger du ikke sende de på nytt.",
              value: "4",
              image: {
                url: "/images/samsvar4.svg",
                alt: "Ferdigattest",
              },
            },
          ],
        },
      ],
    },
    {
      id: "declarationofconformitynotutf",
      type: "Page",
      heading: "Når regner du med å sende samsvarserklæring?",
      lead: '<p>Når du har gjort jobben, må du erklære at arbeidet er forskriftsmessig utført ved å sende en Samsvarserklæring til ansvarlig søker.</p><p>Det er vanlig å gjøre dette når du er helt ferdig, men du kan også lage flere erklæringer underveis. Dette må du gjøre om arbeidet ditt skal være ferdig ved søknad om igangsettingstillatelse, midlertidig brukstillatelse eller når det skal søkes om ferdigattest.</p><p>Det viktige er at du ikke krysser av for at du er ferdig med arbeidet før du faktisk er det!</p><p><a href="https://dibk.no/byggeregler/sak/1/1/1-2/?_t_id=icu3BVXVvaK3ddH6i8JK6Q%3d%3d&_t_q=samsvarserkl%C3%A6ring&_t_tags=language%3ano%2csiteid%3aa8fed669-6208-4354-8fe6-9c93cb91a133&_t_ip=195.159.248.98%3a59714&_t_hit.id=EPiServer_Templates_DIBK_PageTypes_Veiledninger_ParagrafPageType/_a0b64d87-7db5-42f9-a6cb-238f9d1daebc_no&_t_hit.pos=1">Les mer om samsvarserklæring i regelverket</a><p>',
      show: {
        type: "and",
        clauses: [
          {
            field: "function",
            operator: "neq",
            value: "sok",
          },
          {
            field: "function",
            operator: "neq",
            value: "utf",
          },
        ],
      },
      children: [
        {
          id: "conformity.type",
          property: "conformity.type",
          type: "Checkbox",
          heading:
            "Ved hvilken delsøknad regner du å sende inn samsvarserklæring?",
          options: [
            {
              id: "conformity.type.1",
              type: "Answer",
              heading: "Rammetillatelse",
              text: "Det første steget i en byggesak er en søknad om rammetillatelse. Her beskrives det hva man skal bygge, endre eller utbedre. Det er sjelden at du trenger å sende inn samsvarserklæring ved rammetillatelse",
              value: "1",
              image: {
                url: "/images/samsvar1.svg",
                alt: "Rammetillatelse",
              },
            },
            {
              id: "conformity.type.2",
              type: "Answer",
              heading: "Igangsettelse",
              text: "Dette er en søknad om hvorvidt man kan begynne selve byggearbeidet. Det er viktig å ikke ta ett eneste spadetak før man har fått godkjent denne! De fleste samsvarserklæringer for prosjektering bør være på plass ved denne søknaden.",
              value: "2",
              image: {
                url: "/images/samsvar2.svg",
                alt: "Igangsettelse",
              },
            },
            {
              id: "conformity.type.3",
              type: "Answer",
              heading: "Midlertidig brukstillatelse",
              text: "Dette er en søknad om tillatelse til å bruke et byggverk midlertidig, selv om det ikke er helt ferdig. Det må allikevel gjenstå såpass lite at kommunen må finne det forsvarlig å kunne ta det i bruk. Det er vanlig at samsvarserklæringer på utførelse foreligger her.",
              value: "3",
              image: {
                url: "/images/samsvar3.svg",
                alt: "Midlertidig brukstillatelse",
              },
            },
            {
              id: "conformity.type.4",
              type: "Answer",
              heading: "Ferdigattest",
              text: "Alle tiltak du må søke om, må også avsluttes med en ferdigattest som du får av kommunen. En ferdigattest skal foreligge før bygget tas i bruk, ellers må man søke om en “midlertidig brukstillatelse”. Før du får ferdigattest må samsvarserklæringer som erklærer at arbeidet er helt ferdig foreligge for alle ansvarsområder. Er disse allerede sendt, trenger du ikke sende de på nytt.",
              value: "4",
              image: {
                url: "/images/samsvar4.svg",
                alt: "Ferdigattest",
              },
            },
          ],
        },
      ],
    },
    {
      id: "responsible",
      type: "Page",
      heading: "Informasjon om byggeplassen",
      lead: "Dette gjør det enklere å knytte erklæringen til riktig byggesak.",
      children: [
        {
          id: "where",
          type: "Group",
          heading: "Hvor skal arbeidet gjøres?",
          text: "Fyll ut de feltene som finnes for eiendommen",
          children: [
            {
              id: "where.municipality",
              property: "where.municipality",
              type: "Input",
              heading: "Navn på kommune",
              autocomplete: "address-level2",
            },
            {
              id: "where.section",
              property: "where.section",
              type: "Number",
              heading: "Gårdsnummer",
              minimum: 0,
            },
            {
              id: "where.number",
              property: "where.number",
              type: "Number",
              heading: "Bruksnummer",
              minimum: 0,
            },
            {
              id: "where.seksjonsnummer",
              property: "where.seksjonsnummer",
              type: "Number",
              heading: "Seksjonsnummer",
              minimum: 0,
              optional: true,
            },
            {
              id: "where.address",
              property: "where.address",
              type: "Input",
              heading: "Gateadresse",
              autocomplete: "street-address",
              optional: true,
            },
          ],
        },
      ],
    },
    {
      type: "Branch",
      id: "declarationofconformity",
      branches: [
        {
          test: {
            type: "or",
            clauses: [
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse1",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "function",
                        operator: "eq",
                        value: "sok",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "pro",
                      },
                    ],
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.experience",
                        operator: "lt",
                        value: 4,
                      },
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 2,
                      },
                    ],
                  },
                ],
              },
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse1",
                  },
                  {
                    field: "function",
                    operator: "eq",
                    value: "utf",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.experience",
                        operator: "lt",
                        value: 2,
                      },
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 1,
                      },
                    ],
                  },
                ],
              },
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse1",
                  },
                  {
                    field: "function",
                    operator: "eq",
                    value: "krp",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.experience",
                        operator: "lt",
                        value: 4,
                      },
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 2,
                      },
                    ],
                  },
                ],
              },
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse2",
                  },
                  {
                    field: "function",
                    operator: "eq",
                    value: "sok",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.experience",
                        operator: "lt",
                        value: 6,
                      },
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 2,
                      },
                    ],
                  },
                ],
              },
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse2",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "function",
                        operator: "eq",
                        value: "pro",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "krp",
                      },
                    ],
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.experience",
                        operator: "lt",
                        value: 6,
                      },
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 3,
                      },
                    ],
                  },
                ],
              },
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse2",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "function",
                        operator: "eq",
                        value: "pro",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "krp",
                      },
                    ],
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.experience",
                        operator: "lt",
                        value: 6,
                      },
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 3,
                      },
                    ],
                  },
                ],
              },
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse2",
                  },
                  {
                    field: "function",
                    operator: "eq",
                    value: "utf",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.experience",
                        operator: "lt",
                        value: 3,
                      },
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 2,
                      },
                    ],
                  },
                ],
              },
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse3",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "function",
                        operator: "eq",
                        value: "sok",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "pro",
                      },
                      {
                        field: "function",
                        operator: "eq",
                        value: "krp",
                      },
                    ],
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.experience",
                        operator: "lt",
                        value: 8,
                      },
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 4,
                      },
                    ],
                  },
                ],
              },
              {
                type: "and",
                clauses: [
                  {
                    field: "class",
                    operator: "eq",
                    value: "tiltaksklasse3",
                  },
                  {
                    field: "function",
                    operator: "eq",
                    value: "utf",
                  },
                  {
                    type: "or",
                    clauses: [
                      {
                        field: "competence.education",
                        operator: "lt",
                        value: 3,
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "competence.education",
                            operator: "eq",
                            value: 3,
                          },
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 8,
                          },
                        ],
                      },
                      {
                        type: "and",
                        clauses: [
                          {
                            field: "competence.education",
                            operator: "gte",
                            value: 4,
                          },
                          {
                            field: "competence.experience",
                            operator: "lt",
                            value: 5,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          children: [
            {
              id: "competencyError",
              heading: "Firmaet ditt kan ikke erklære ansvar",
              type: "Error",
              children: [
                {
                  type: "Branch",
                  id: "competencyError.branch",
                  branches: [
                    {
                      test: {
                        type: "and",
                        clauses: [
                          {
                            field: "class",
                            operator: "eq",
                            value: "tiltaksklasse1",
                          },
                          {
                            field: "function",
                            operator: "neq",
                            value: "krp",
                          },
                        ],
                      },
                      children: [
                        {
                          id: "class1exceptionresult",
                          type: "Result",
                          heading: {
                            complete: "Firmaet ditt kan søke om ansvarsrett",
                            incomplete: "Du har ikke svart på alle spørsmålene",
                            incompleteWithError:
                              "Du har ikke svart på alle spørsmålene og har feil i svarene dine",
                            completeWithError: "Du har feil i svarene dine",
                          },
                          lead: {
                            complete:
                              "<p>Firmaet ditt har ikke tilstrekkelig kompetanse til å kunne erklære ansvar for arbeidet som skal gjøres, men dere kan søke kommunen om ansvarsrett.</p><p><strong>Se over og skriv ut søknaden</strong><br />Les nøye gjennom søknaden før du fortsetter, og sjekk at du har svart riktig på alle spørsmålene. I oppsummeringen under kan du klikke deg inn på hvert steg i veiviseren for å legge til og endre svarene dine. Når du har forsikret deg om at alt stemmer, kan du skrive ut søknaden nederst på siden.</p>",

                            incomplete:
                              "<p>Vi kan derfor ikke gi deg et resultat ennå. Du kan se hvilke spørsmål du ikke har svart på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.</p>.",
                            incompleteWithError:
                              "<p>Vi kan derfor ikke gi deg et resultat ennå. Du kan se hvilke spørsmål du ikke har svart på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.</p>.",
                            completeWithError:
                              "<p>'Du har svart feil på noen spørsmål. Du kan se hvilke spørsmål du har svart feil på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.'</p>",
                          },
                          children: [
                            {
                              id: "statement",
                              type: "Text",
                              printonly: true,
                              text: "<strong>Ved å sende inn denne søknaden bekrefter du at:</strong><br />&ndash; Foretaket er kjent med reglene om straff og sanksjoner i plan- og bygningsloven kap. 32 og at det kan medføre reaksjoner dersom det gis uriktige opplysninger.<br />&ndash; Foretaket forplikter seg til å stille med nødvendig kompetanse i tiltaket, jf. SAK10 kap. 10 og 11.<br />&ndash; Opplysningene gitt i denne søknaden er korrekte, og firmaet har rutiner for kvalitetssikring slik det står i SAK10 § 10-1 første ledd.",
                            },
                            {
                              type: "Branch",
                              id: "responsable.branch",
                              branches: [
                                {
                                  test: {
                                    field: "function",
                                    operator: "eq",
                                    value: "pro",
                                  },
                                  children: [
                                    {
                                      id: "responsable",
                                      type: "Text",
                                      printonly: true,
                                      text: "<strong>Ansvarlig prosjekterende erklærer at prosjekteringen skal være planlagt, gjennomført og kvalitetssikret i henhold til plan- og bygningsloven jf. SAK10 §12-3.</strong>",
                                    },
                                  ],
                                },
                                {
                                  test: {
                                    field: "function",
                                    operator: "eq",
                                    value: "krp",
                                  },
                                  children: [
                                    {
                                      id: "responsable",
                                      type: "Text",
                                      printonly: true,
                                      text: "<strong>Ansvarlig kontrollerende erklærer uavhengighet, jf. SAK10 § 14-1, og vil redegjøre for endringer som kan påvirke uavhengigheten jf. SAK10 §12-5.</strong>",
                                    },
                                  ],
                                },
                                {
                                  test: {
                                    field: "function",
                                    operator: "eq",
                                    value: "utf",
                                  },
                                  children: [
                                    {
                                      id: "responsable",
                                      type: "Text",
                                      printonly: true,
                                      text: "<strong>Ansvarlig utførende erklærer at arbeidet ikke skal starte før det foreligger kvalitetssikret produksjonsunderlag for respektive del av utførelsen jf SAK10 § 12-4.</strong>",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "signature",
                              type: "Signature",
                            },
                            {
                              type: "Branch",
                              id: "responsable.branch2",
                              branches: [
                                {
                                  test: {
                                    field: "function",
                                    operator: "neq",
                                    value: "sok",
                                  },
                                  children: [
                                    {
                                      id: "summary.sok",
                                      type: "Text",
                                      printhide: true,
                                      heading:
                                        "Er alt korrekt? Skriv ut søknaden!",
                                      text: '<p>Da kan du skrive ut søknaden, signere den, og sende den til din kommune. Hvis søknaden blir godkjent, vil du motta et vedtaksbrev fra kommunen som du kan sende videre til ansvarlig søker.</p><p><strong>Husk at firmaet ditt kan bli stilt til ansvar for det som er beskrevet i denne søknaden! Firmaet må også ha rutiner for kvalitetssikring slik det står i <a href="https://dibk.no/byggeregler/sak/3/10/10-1"/>SAK10 § 10-1 første ledd</a>.</strong></p>',
                                    },
                                  ],
                                },
                                {
                                  test: {
                                    field: "function",
                                    operator: "eq",
                                    value: "sok",
                                  },
                                  children: [
                                    {
                                      id: "end.correct",
                                      type: "Text",
                                      printhide: true,
                                      heading:
                                        "Er alt korrekt? Skriv ut søknaden!",
                                      text: '<p>Da kan du skrive ut søknaden, signere den, og sende den til din kommune. Hvis søknaden blir godkjent, vil du motta et vedtaksbrev fra kommunen som du kan sende inn sammen med gjennomføringsplanen.</p><p><strong>Husk at firmaet ditt kan bli stilt til ansvar for det som er beskrevet i denne søknaden! Firmaet må også ha rutiner for kvalitetssikring slik det står i <a href="https://dibk.no/byggeregler/sak/3/10/10-1"/>SAK10 § 10-1 første ledd</a>.</strong></p>',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      test: {
                        field: "class",
                        operator: "required",
                      },
                      children: [
                        {
                          id: "failedButCanGoOnresult",
                          type: "Result",
                          heading: {
                            complete:
                              "Firmaet ditt har ikke tilstrekkelig kompetanse til å gjøre jobben",
                            incomplete:
                              "Firmaet ditt har ikke tilstrekkelig kompetanse til å gjøre jobben",
                            incompleteWithError:
                              "Firmaet ditt har ikke tilstrekkelig kompetanse til å gjøre jobben",
                            completeWithError:
                              "Firmaet ditt har ikke tilstrekkelig kompetanse til å gjøre jobben",
                          },
                          lead: {
                            complete:
                              'Dette skyldes at arbeidet som skal gjøres krever mer relevant utdanning og/eller erfaring enn det firmaet ditt har. <a href="https://dibk.no/byggeregler/sak/3/11/11-3/">Les mer om krav til utdanning og praksis på DiBKs nettsider.</a>',
                            incomplete:
                              'Dette skyldes at arbeidet som skal gjøres krever mer relevant utdanning og/eller erfaring enn det firmaet ditt har. <a href="https://dibk.no/byggeregler/sak/3/11/11-3/">Les mer om krav til utdanning og praksis på DiBKs nettsider.</a>',
                            incompleteWithError:
                              'Dette skyldes at arbeidet som skal gjøres krever mer relevant utdanning og/eller erfaring enn det firmaet ditt har. <a href="https://dibk.no/byggeregler/sak/3/11/11-3/">Les mer om krav til utdanning og praksis på DiBKs nettsider.</a>',
                            completeWithError:
                              'Dette skyldes at arbeidet som skal gjøres krever mer relevant utdanning og/eller erfaring enn det firmaet ditt har. <a href="https://dibk.no/byggeregler/sak/3/11/11-3/">Les mer om krav til utdanning og praksis på DiBKs nettsider.</a>',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "hooray",
      type: "Result",
      heading: {
        complete: "Firmaet ditt kan erklære ansvar",
        incomplete: "Du har ikke svart på alle spørsmålene",
        incompleteWithError:
          "Du har ikke svart på alle spørsmålene og har feil i svarene dine",
        completeWithError: "Du har feil i svarene dine",
      },
      lead: {
        complete:
          "<p><strong>Se over og skriv ut</strong><br />Les nøye gjennom erklæringen før du fortsetter, og sjekk at du har svart riktig på alle spørsmålene. I oppsummeringen under kan du klikke deg inn på hvert steg i veiviseren for å legge til og endre svarene dine. Når du har forsikret deg om at alt stemmer, kan du skrive ut erklæringen nederst på siden.</p>",
        incomplete:
          "<p>Vi kan derfor ikke gi deg et resultat ennå. Du kan se hvilke spørsmål du ikke har svart på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.</p>.",
        incompleteWithError:
          "<p>Vi kan derfor ikke gi deg et resultat ennå. Du kan se hvilke spørsmål du ikke har svart på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.</p>.",
        completeWithError:
          "'Du har svart feil på noen spørsmål. Du kan se hvilke spørsmål du har svart feil på i oppsummeringen under. Der kan du også klikke deg inn på hvert steg i veiviseren for å legge til og endre dine svar.'",
      },

      exporter: "dataExport",
      children: [
        {
          id: "statement",
          type: "Text",
          printonly: true,
          text: "<strong>Ved å sende inn denne erklæringen bekrefter du at:</strong><br />&ndash; Foretaket er kjent med reglene om straff og sanksjoner i plan- og bygningsloven kap. 32 og at det kan medføre reaksjoner dersom det gis uriktige opplysninger.<br />&ndash; Foretaket forplikter seg til å stille med nødvendig kompetanse i tiltaket, jf. SAK10 kap. 10 og 11.",
        },
        {
          type: "Branch",
          id: "responsable.branch4",
          branches: [
            {
              test: {
                field: "function",
                operator: "eq",
                value: "pro",
              },
              children: [
                {
                  id: "responsable",
                  type: "Text",
                  printonly: true,
                  text: "<strong>Ansvarlig prosjekterende erklærer at prosjekteringen skal være planlagt, gjennomført og kvalitetssikret i henhold til plan- og bygningsloven jf. SAK10 §12-3.</strong>",
                },
              ],
            },
            {
              test: {
                field: "function",
                operator: "eq",
                value: "krp",
              },
              children: [
                {
                  id: "responsable",
                  type: "Text",
                  printonly: true,
                  text: "<strong>Ansvarlig kontrollerende erklærer uavhengighet, jf. SAK10 § 14-1, og vil redegjøre for endringer som kan påvirke uavhengigheten jf. SAK10 §12-5.</strong>",
                },
              ],
            },
            {
              test: {
                field: "function",
                operator: "eq",
                value: "utf",
              },
              children: [
                {
                  id: "responsable",
                  type: "Text",
                  printonly: true,
                  text: "<strong>Ansvarlig utførende erklærer at arbeidet ikke skal starte før det foreligger kvalitetssikret produksjonsunderlag for respektive del av utførelsen jf SAK10 § 12-4.</strong>",
                },
              ],
            },
          ],
        },
        {
          id: "signature",
          type: "Signature",
        },
        {
          type: "Branch",
          id: "responsable.branch3",
          branches: [
            {
              test: {
                field: "function",
                operator: "neq",
                value: "sok",
              },
              children: [
                {
                  id: "summary.sok",
                  type: "Text",
                  printhide: true,
                  heading: "Er alt korrekt? Skriv ut erklæringen!",
                  text: "<p>Da kan du skrive ut erklæringen, signere den, og sende den til ansvarlig søker. Ansvarlig søker vil sende erklæringen videre til kommunen sammen med sin gjennomføringsplan.</p><p><strong>Husk at firmaet ditt kan bli stilt til ansvar for det som er beskrevet i denne erklæringen!</strong></p>",
                },
              ],
            },
            {
              test: {
                field: "function",
                operator: "eq",
                value: "sok",
              },
              children: [
                {
                  id: "end.correct",
                  type: "Text",
                  printhide: true,
                  heading: "Er alt korrekt? Skriv ut erklæringen!",
                  text: "<p>Da kan du skrive ut erklæringen, signere den, og sende den videre til kommunen sammen med gjennomføringsplanen.</p><p><strong>Husk at firmaet ditt kan bli stilt til ansvar for det som er beskrevet i denne erklæringen!</strong></p>",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default data;
