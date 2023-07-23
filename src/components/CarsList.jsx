import { useQuery } from '@tanstack/react-query';
import { getAllCars } from '../api/carsApi';
import { Spinner, Text, Card, CardBody, Heading, SimpleGrid } from '@chakra-ui/react';
import CarCard from './CarCard';

const CarsList = (props) => {
  
  const getCarsQuery = useQuery({
    queryKey: ['cars'],
    queryFn: getAllCars
  });

  if(getCarsQuery.isLoading) {
    return <Spinner size="xl" />;
  }

  if(getCarsQuery.isError) {
    return <Text>An Error had occured: <pre>{JSON.stringify(getCarsQuery.error)}</pre></Text>;
  }

  const dataJSX = getCarsQuery.data.map(carData => {
    return <CarCard key={carData.id} carData={carData} />
  });

  return (
    <SimpleGrid columns={1} spacing={8}>
      {dataJSX}
    </SimpleGrid>
  );

};

export default CarsList;