import { Card, CardBody, Heading, Text, IconButton, Flex, Divider } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';
import { deleteCar } from '../api/carsApi';
import { useState } from 'react';
import AddUpdateCarForm from './AddUpdateCarForm';

const CarCard = (props) => {
  const { carData } = props;

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  
  const queryClient = useQueryClient();

  const deleteCarMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: (args) => {
      queryClient.invalidateQueries({
        queryKey: ['cars']
      });
    }
  });

  return (
    <Card key={carData.id}>
      <CardBody>
        <Heading as="h6" size="md">{carData.company}</Heading>
        <Text>{carData.carName}</Text>
        <Flex>
          <IconButton
            colorScheme='blue'
            aria-label='Edit Info'
            icon={<FaPencil />}
            marginRight={4}
            onClick={() => setShowUpdateForm(prev => !prev)}
          />
          <IconButton
            colorScheme='red'
            aria-label='Delete'
            icon={<FaTrashCan />}
            onClick={() => deleteCarMutation.mutate(carData.id)}
          />
        </Flex>
        <Divider marginTop={1} marginBottom={1} />
        { showUpdateForm && <AddUpdateCarForm forUpdate carData={carData} setShowUpdateForm={setShowUpdateForm} /> }
      </CardBody>
    </Card>
  );
};

export default CarCard;