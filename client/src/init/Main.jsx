import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../services/app-context';
import Preloader from './Preloader';
import Routing from './Routing';

const Main = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { getFields, getFirebaseUsers } = useContext(AppContext);

  const initialization = async () => {
    try {
      setIsLoading(true);
      await getFields();
      await getFirebaseUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialization();
  }, [])

  if (isLoading) return <Preloader />

  return <Routing />
}

export default Main;