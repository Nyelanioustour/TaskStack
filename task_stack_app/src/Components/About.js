import React, { useState } from 'react';
import { Tab, Image } from 'semantic-ui-react'



function About() {
  const panes = [
  { menuItem: 'About App', render: () => <Tab.Pane>
    <div className="scrolling">
    <Image src='./What is TS.png' size='massive' centered />
    </div>

  </Tab.Pane> },
  { menuItem: 'How to', render: () => <Tab.Pane>
        <div className="scrolling">
          <Image src='./user_view.png'/>
          <Image src='./task_view.png'/>
          <Image src='./Calendar_view.png'/>
        </div>
  </Tab.Pane> },
]
  
    return (
      <div >
          <Tab panes={panes} />
      </div>
    );
  }
  
  
  export default About;