export interface WeekPhoto {
  url: string;
  caption: string;
}

export interface WeekData {
  weekNum: number;
  title: string;
  subtitle: string;
  content: string;
  photos: WeekPhoto[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
}

export const week0Data: WeekData = {
  weekNum: 0,
  title: 'WEEK 0 — WHERE THE JOURNEY STARTED',
  subtitle: 'A 20-week experience built around people, ideas, experimentation, and growth.',
  content: `The first step into a 20-week experience built around people, ideas, experimentation, and growth.

01 — STEPPING IN
A New Beginning
Week 0 started with an introduction to the Forge environment and the journey ahead. We got a glimpse of how the next 20 weeks would unfold, what Protosem stands for, and how the space would become part of our everyday learning experience.

02 — THE FIRST CONVERSATION
Getting the Bigger Picture
Our first interaction with Meera helped us understand the thinking behind the program. It wasn't just about knowing what we would do, but understanding why the program was designed the way it was and what we could take away from the experience.

03 — MEETING THE PEOPLE
The Team Behind the Journey
A journey like this is shaped by the people around you. Meeting the cohort introduced us to a group with different backgrounds, personalities, ideas, and ways of approaching problems.
These were the people we'd be learning, experimenting, and building alongside throughout the next 20 weeks.

04 — UNDERSTANDING OURSELVES
16Personalities
We explored our individual personalities through the 16Personalities assessment.
My result was “The Advocate” — INFJ-A/T.
Putting everyone's results together gave us an interesting picture of the cohort. It showed that while we may work toward the same goals, the way each person thinks, communicates, and solves problems can be completely different.

05 — BUILDING UNDER PRESSURE
The Spaghetti Challenge
A simple pile of spaghetti, a marshmallow, and a race against time.
Teams had to create the tallest freestanding structure while keeping the marshmallow at the top. What looked like a fun challenge quickly became a lesson in planning, collaboration, trial and error, and adapting when things don't work.
The winning structure wasn't just about the tallest tower — it was about how effectively the team worked together.

THE FIRST WEEK'S LESSON
Different minds. Different approaches.
One team. One shared journey.`,
  photos: [
    {
      url: '/images/week0/16personalities_board.jpg',
      caption: '16Personalities Cohort Assessment Whiteboard Results (INFJ-A/T)'
    },
    {
      url: '/images/week0/genius_quote.jpg',
      caption: 'Everybody is a Genius — Mindset & Approach Philosophy'
    }
  ]
};
