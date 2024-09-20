import React from 'react';
import { Authenticator, Button, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut } from '@aws-amplify/auth';
import FetchData from './FetchData';
import './App.css'; 
function App() {
  async function handleSignOut() {
    try {
      await signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  const AuthenticatedApp = () => {
    return (
      <div className="container">
        <View>
          <h1>Welcome</h1>
          <FetchData />
          <Button onClick={handleSignOut}>Sign Out</Button>
        </View>
      </div>
    );
  };

  return (
    <Authenticator>
      {() => <AuthenticatedApp />}
    </Authenticator>
  );
}

export default App;
