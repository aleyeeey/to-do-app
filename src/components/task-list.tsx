import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styled'
import { Text } from 'native-base'
import shortid from 'shortid'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: string
  date: Date
  subject: string
  done: boolean
}

interface TaskListProps {
  data: Array<TaskItemData>
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove
  } = props
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])
  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject]
  )
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])
  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])
  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        isEditing={isEditing}
        isDone={data.done}
        subject={data.subject}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onPressLabel={handlePressLabel}
        onFinishEditing={handleFinishEditing}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

const TaskList = (props: TaskListProps) => {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem
  } = props
  const refScrollView = useRef(null)

  const groups = data.reduce((groups, game) => {
    const date = game.date.toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(game)
    return groups
  }, {})

  const groupArrays = Object.keys(groups).map(date => {
    return {
      date,
      dateId: shortid.generate(),
      tasks: groups[date]
    }
  })

  return (
    <StyledScrollView ref={refScrollView} w="full">
      {groupArrays.map((group: any) => (
        <AnimatePresence>
          <Text px={4}>{group.date}</Text>
          {group.tasks.map((item: any) => (
            <AnimatedTaskItem
              key={item.id}
              data={item}
              simultaneousHandlers={refScrollView}
              isEditing={item.id === editingItemId}
              onToggleItem={onToggleItem}
              onChangeSubject={onChangeSubject}
              onFinishEditing={onFinishEditing}
              onPressLabel={onPressLabel}
              onRemove={onRemoveItem}
            />
          ))}
        </AnimatePresence>
      ))}
      {/*<AnimatePresence>*/}
      {/*  {data.map(item => (*/}
      {/*    <AnimatedTaskItem*/}
      {/*      key={item.id}*/}
      {/*      data={item}*/}
      {/*      simultaneousHandlers={refScrollView}*/}
      {/*      isEditing={item.id === editingItemId}*/}
      {/*      onToggleItem={onToggleItem}*/}
      {/*      onChangeSubject={onChangeSubject}*/}
      {/*      onFinishEditing={onFinishEditing}*/}
      {/*      onPressLabel={onPressLabel}*/}
      {/*      onRemove={onRemoveItem}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</AnimatePresence>*/}
    </StyledScrollView>
  )
}

export default TaskList
