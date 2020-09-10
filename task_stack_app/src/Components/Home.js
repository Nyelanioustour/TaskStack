import React, { useState, useEffect } from 'react';
import {
  Image,
  Button,
  Header,
  Icon,
  Search,
  Divider,
  Grid,
  Segment,
} from 'semantic-ui-react'
import '../App.css';
import 'semantic-ui-css/semantic.min.css'
import SignUpModal from './SignUpModal.js'
import LogInModal from './LogInModal.js'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory } from 'react-router-dom';
import NewTaskModal from './NewTaskModal';
import ViewTaskModal from './ViewTaskModal';
import TaskStack from './TaskStack';
import { getQueriesForElement } from '@testing-library/react';

const TASKURL = 'http://localhost:3000/tasks'

function Home(props) {
  
  return (
      <div>
            <Image src='./Main.png' size='massive' centered />
      </div>


      );
    }
    
export default Home;
