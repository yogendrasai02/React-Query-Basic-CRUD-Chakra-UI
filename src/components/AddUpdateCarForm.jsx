import { useState } from "react";
import { FormControl, FormLabel, Input, Button, Spinner, Text, Code } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar, updateCar } from "../api/carsApi";

const AddUpdateCarForm = (props) => {

  const { forUpdate = false, carData } = props; 

  const [company, setCompany] = useState(forUpdate ? carData.company : '');
  const [carName, setCarName] = useState(forUpdate ? carData.carName : '');

  const queryClient = useQueryClient();

  const addCarMutation = useMutation({
    mutationFn: addCar,
    onSuccess: (args) => {
      queryClient.invalidateQueries({
        queryKey: ['cars']
      });
    }
  });

  const updateCarMutation = useMutation({
    mutationFn: updateCar,
    onSuccess: (args) => {
      queryClient.invalidateQueries({
        queryKey: ['cars']
      });
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if(!forUpdate) {
      const newCarData = {
        id: uuidv4(),
        company,
        carName
      };
      addCarMutation.mutate(newCarData);
    } else {
      updateCarMutation.mutate({...carData, company, carName});
      props.setShowUpdateForm(false);
    }
  };

  if(addCarMutation.isLoading || updateCarMutation.isLoading) {
    return <Spinner size="xl" />;
  }

  if(addCarMutation.isError || updateCarMutation.isError) {
    return <Code colorScheme="red">{addCarMutation.error || updateCarMutation.error}</Code>;
  }

  return (
    <form onSubmit={submitHandler}>
      <FormControl>
        <FormLabel>Company</FormLabel>
        <Input type='text' value={company} onChange={e => setCompany(e.target.value)} />
      </FormControl>
      <FormControl marginTop={4}>
        <FormLabel>Car Name</FormLabel>
        <Input type='text' value={carName} onChange={e => setCarName(e.target.value)} />
      </FormControl>
      <Button colorScheme='blue' type='submit' marginTop={4}>
        { forUpdate ? 'Update Car Info' : 'Add Car Info' }
      </Button>
    </form>
  );
};

export default AddUpdateCarForm;