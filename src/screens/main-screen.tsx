import React, { useCallback, useState } from 'react'
import { Fab, Icon, useColorModeValue, VStack } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import shortid from 'shortid'
import TaskList from '../components/task-list'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'

const initialData = [
  {
    id: shortid.generate(),
    date: new Date('04/22/22'),
    subject: 'Zur Silvesterparty heute Abend gehen',
    done: false
  },
  {
    id: shortid.generate(),
    date: new Date(),
    subject: 'Millionär werden',
    done: false
  }
]

const MainScreen = () => {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const idx = prevData.indexOf(item)
      newData[idx] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const idx = prevData.indexOf(item)
      newData[idx] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = useCallback(_item => {
    setEditingItemId(null)
  }, [])

  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      return prevData.filter(i => i !== item)
    })
  }, [])
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead
        title="Was geht, Ali?"
        image={require('../assets/masthead3.png')}
      >
        <NavBar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        mt="-20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <TaskList
          data={data}
          editingItemId={editingItemId}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          const date = new Date()
          setData([
            {
              id,
              date,
              subject: '',
              done: false
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}

export default MainScreen
