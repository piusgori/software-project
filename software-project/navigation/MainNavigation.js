import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { AuthContext } from '../services/auth-context'
import AuthNavigation from './AuthNavigation'
import ContentNavigation from './ContentNavigation'

const MainNavigation = () => {

  const { isAuth } = useContext(AuthContext);

  return (
    <NavigationContainer>
        {isAuth ? <ContentNavigation></ContentNavigation> : <AuthNavigation></AuthNavigation>}
    </NavigationContainer>
  )
}

export default MainNavigation