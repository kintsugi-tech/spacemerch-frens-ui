import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
} from '@chakra-ui/react'
import designs from '../data/designs.json';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function HookForm() {
  const {
    handleSubmit,
    register,
    watch,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm()

  const [sizes, setSizes] = useState([]);

  const watchFields = watch(["design"]);

  let onSubmit = async (values) => {

    let data = {
      size: values.size.toLowerCase(),
      model: values.design,
      recepient: values.address
    };

    let res = await axios.post(process.env.NEXT_PUBLIC_API_URL, data);

    if (res.data.transactionHash !== undefined) {
      setSuccess(`Minted! ${res.data.transactionHash}`)
    } else {
      SpeechSynthesisErrorEvent("Error")
    }
    console.log(res)
  }

  let loadSizes = (design_id) => {
    setSizes([])
    let design = designs.find((el) => el.id === design_id);

    if (design !== undefined) {
        setSizes(design.sizes)
    }
  }

  useEffect(() => {
    const subscription = watch((value, {name}) => {

        if (name === "design") {
            resetField("size")
            loadSizes(value.design)
        }
        
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      

      <FormControl isInvalid={errors.design} mb="4">
        <FormLabel htmlFor='name'>Design</FormLabel>
        <Select placeholder='Select Design' {...register("design")}>
            {designs.map((el) => (<option key={el.id} value={el.id}>{el.name}</option>))}
        </Select>
        <FormErrorMessage>
          {errors.design && errors.design.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.size} mb="4">
        <FormLabel htmlFor='name'>Size</FormLabel>
        <Select placeholder='Select Size' {...register("size")}>
            {sizes.map((el) => (<option key={el.type} value={el.type}>{el.type}</option>))}
        </Select>
        <FormErrorMessage>
          {errors.size && errors.size.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.address} mb="4">
        <FormLabel htmlFor='name'>Address</FormLabel>
        <Input
          id='address'
          placeholder='stars1...'
          {...register('address', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.address && errors.address.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme='yellow' isLoading={isSubmitting} type='submit' width={"100%"}>
        Mint NFT
      </Button>
    </form>
  )
}