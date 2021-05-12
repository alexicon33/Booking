import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';

import Header from './components/Header/Header';

import styles from './App.module.css';
import EventsTab from './components/EventsTab/EvetnsTab';
import BuildingPlan from './components/BuildingPlan/BuildingPlan';
import EventPage from './components/EventPage/EventPage';
import Rooms from './components/Rooms/Rooms';
import LoginPage from './components/LoginPage/LoginPage';
import Cabinet from './components/Cabinet/Cabinet';
import BookingForm from './components/BookingForm/BookingForm';
import { useDispatch } from 'react-redux';
import { loadUserData } from './redux/User/actions';

import particlesConfig from './particles-config.json';
import Particles from 'react-particles-js';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = sessionStorage.getItem('BookingServiceUser');
    if (user !== null) {
      dispatch(loadUserData(JSON.parse(user)));
    }
  }, [dispatch])
  

  return (
    <div className={styles.App}>
      <div className={styles.particlesWrapper}>
        <Particles height="100vh" width="100vw" params={particlesConfig as any} />
      </div>
      <Header />
      <div className={styles.body}>
        <Switch>
          <Route exact path='/' component={BuildingPlan} />
          <Route exact path='/events' component={EventsTab} />
          <Route path='/events/:eventId' component={EventPage} />
          <Route path='/rooms' component={Rooms} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegistrationPage} />
          <Route path='/cabinet' component={Cabinet} />
          <Route path='/booking' component={BookingForm} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
