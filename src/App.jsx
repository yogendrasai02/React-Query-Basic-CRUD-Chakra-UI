import { Card, CardBody, Container, Heading } from '@chakra-ui/react';
import './App.css'
import CarsList from './components/CarsList';
import AddUpdateCarForm from './components/AddUpdateCarForm';

function App() {
  return (
    <div className="app">
      <Heading as="h1" color="teal.500" textAlign="center">React Query (Tanstack Query) CRUD App</Heading>
      <Container marginTop="8">
        <Card marginBottom={8}>
          <CardBody>
            {/* For ADDING a new car */}
            <AddUpdateCarForm />
          </CardBody>
        </Card>
        <CarsList />
      </Container>
    </div>
  );
}

export default App
