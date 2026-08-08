import { week0Data, type WeekData } from './weeks/week0';
import { week1Data } from './weeks/week1';
import { week2Data } from './weeks/week2';

export type { WeekData, WeekPhoto } from './weeks/week0';

export const PROTOSEM_WEEKS: WeekData[] = [
  week0Data,
  week1Data,
  week2Data,
  ...Array.from({ length: 17 }, (_, i) => {
    const weekNum = i + 3;
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
