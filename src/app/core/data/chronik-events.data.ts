// src/app/data/chronik-events.data.ts

// Interface für ein Timeline-Event (dieses wird aus timeline.component.ts verschoben)
export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  imageLeft?: string;
  imageRight?: string;
  isImportant?: boolean;
  icon?: string;
  founders?: string[];
}

export const NEXT_EVENTS: TimelineEvent[] = [
  {
    date: '15. November 2025',
    title: 'Hagiball 2025',
    description: '',
    imageLeft: '/assets/hagi-logo.png', // Passe den Pfad an
    icon: 'event'
  },
  {
    date: '16./17. Januar 2026',
    title: '44 Jahre Grieseschnalle',
    description: '',
    imageRight: '/assets/griesbach.png', // Passe den Pfad an
    icon: 'event'
  },
  {
    date: '23. Januar 2026',
    title: 'Narrenbaumhock',
    description: '',
    imageLeft: '/assets/logo.png', // Passe den Pfad an
    icon: 'event'
  },
  {
    date: '30. Januar 2026',
    title: 'Eröffnungssitzung PNZ',
    description: '',
    imageRight: '/assets/pnz.png', // Passe den Pfad an
    icon: 'event'
  },
  {
    date: '07. Februar 2026',
    title: 'Eröffnungssitzung Bad Griesbach',
    description: '',
    imageLeft: '/assets/griesbach-alle.png', // Passe den Pfad an
    icon: 'event'
  },
  {
    date: '12. Februar 2026',
    title: 'SchmuDo',
    description: '',
    imageRight: '/assets/logo.png', // Passe den Pfad an
    icon: 'event'
  },
  {
    date: '14. Februar 2026',
    title: 'Kinderball / Maskenball',
    description: '',
    imageLeft: '/assets/pnz.png', // Passe den Pfad an
    icon: 'event'
  },
  {
    date: '16. Februar 2026',
    title: 'Umzug Nordrach / Oberhamersbach',
    description: '',
    imageRight: '/assets/pnz.png', // Passe den Pfad an
    icon: 'event'
  },
  {
    date: '17. Februar 2026',
    title: 'Dorffasent / Umzug Lautenbach',
    description: '',
    imageLeft: '/assets/pnz.png', // Passe den Pfad an
    icon: 'event'
  },
]
// Das Array der Chronik-Events
export const CHRONIK_EVENTS: TimelineEvent[] = [
  {
    date: '1985',
    title: 'Gründung der Quellegeister Bad Peterstal e.V.',
    description: 'sowie Eintritt in die Peterstaler Narrenzunft',
    founders: [
      'Michael und Stefan Eggert',
      'Klemens Hermann',
      'Susanne Hildenbrand',
      'Jörg Huber',
      'Stefanie Reydel',
      'Sabine und Tina Tomaszewski',
      'Franz Zimmermann',
      'Ralf Zimmermann'
    ],
    imageLeft: '/assets/Entwurf-Quellegeist-2-175x300.jpg',
    icon: 'event'
  },
  {
    date: '1989',
    title: 'Unser Wagen',
    description: '1989 wurde erstmals der Quelliwagen bei Umzügen mitgeführt. Hier handelt es sich um einen umgebauten VW- Käfer. Mit seiner aufgesetzten Badewanne (Quelle), ist wegen der winterlichen Jahreszeit der Fasent leider nur ein Konfetti-Bad möglich.',
    imageRight: '/assets/Quelliwagen-2-300x212.jpg', // Passe den Pfad an
    icon: 'toys'
  },
  {
    date: '26. Januar 2005',
    title: 'Eintragung',
    description: 'Am 26.01.2005 wurden die Quellegeister Bad Peterstal e.V. ins Vereinsregister eingetragen.',
    imageLeft: '/assets/Gruppenbild-aktuell-2-1024x516.jpg',
    icon: 'check'
  },
  {
    date: '13. Januar 2007',
    title: '22 Jähriges Jubiläum',
    description: 'Am 13.01.2007 feierten die Quellegeister ihr 22.- jähriges Jubiläum „im und um“ das Gasthaus Engel herum. Der Gewölbekeller des Gasthauses wurde kurzerhand in einen Rockkeller umfunktioniert.  Auf dem großen Parkplatz feierten die Gäste im Apres-Ski-Zelt und im Obergeschoß des Engels konnten bei der Beach- Party Cocktails geschlürft werden.',
    imageRight: '/assets/Bild-22-Jahre-2-300x241.jpg',
    icon: 'celebration'
  },
  {
    date: '02. Februar 2018',
    title: '33 Jähriges Jubiläum',
    description: 'Der 02.02.2018 wurde für dei Quellis zu einem ihrer bisher größten Feiertage. Es wurde das komplette Kurhaus in Bad Peterstal gemietet und mit vielen befreundeten Gruppen ausgelassen das 33-jährige Bestehen der Quellegeister gefeiert.',
    imageLeft: '/assets/Plakat-JUBI-2018-Quellis-02-624x882.jpg',
    icon: 'celebration'
  },
  // Füge hier weitere Ereignisse hinzu
];
