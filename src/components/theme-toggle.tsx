import React from 'react'
import { Text, HStack, Switch, useColorMode } from 'native-base'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack space={2} alignItems="center">
      <Text>Dunkel</Text>
      <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode} />
      <Text>Hell</Text>
    </HStack>
  )
}

export default ThemeToggle
