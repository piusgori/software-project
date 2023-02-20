import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import AuthNavigation from './AuthNavigation'
import ContentNavigation from './ContentNavigation'

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <AuthNavigation></AuthNavigation>
    </NavigationContainer>
  )
}

export default MainNavigation