import { week0Data, type WeekData } from './weeks/week0';
import { week1Data } from './weeks/week1';
import { week2Data } from './weeks/week2';
import { week3Data } from './weeks/week3';
import { week4Data } from './weeks/week4';

export type { WeekData, WeekPhoto } from './weeks/week0';

export const PROTOSEM_WEEKS: WeekData[] = [
  week0Data,
  week1Data,
  week2Data,
  week3Data,
  week4Data,
  ...Array.from({ length: 15 }, (_, i) => {
    const weekNum = i + 5;
    return {
      weekNum,
      title: `Week ${weekNum}`,
      subtitle: `ProtoSem Week ${weekNum} Overview`,
      content: `Update your Week ${weekNum} notes, explanation, and summary here...`,
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          caption: `Add your Week ${weekNum} photo link here`
        }
      ]
    };
  })
];
