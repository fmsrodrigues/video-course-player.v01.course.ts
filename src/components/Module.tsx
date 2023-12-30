import * as Collapsible from '@radix-ui/react-collapsible';

import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";

// import { useAppDispatch, useAppSelector } from '../store';
// import { play } from '../store/slices/player';

import { useStore } from '../zustand-store';

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(state => {
    return {
      currentLessonIndex: state.currentLessonIndex,
      currentModuleIndex: state.currentModuleIndex,
      play: state.play,
      lessons: state.course?.modules[state.currentModuleIndex].lessons
    }
  })

  // const dispatch = useAppDispatch()
  // const { currentModuleIndex, currentLessonIndex } = useAppSelector(store => {
  //   const { currentModuleIndex, currentLessonIndex } = store.player

  //   return { currentModuleIndex, currentLessonIndex }
  // })
  // const lessons = useAppSelector(store => {
  //   return store.player.course?.modules[moduleIndex].lessons
  // })

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">
            {title}
          </strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {!!lessons && lessons.map((lesson, lessonIndex) => {
            const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex

            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                // onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
                onPlay={() => play([moduleIndex, lessonIndex])}
                isCurrent={isCurrent}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}