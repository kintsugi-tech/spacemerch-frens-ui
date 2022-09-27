import { useForm } from "react-hook-form";
import { Flex, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import designs from "../data/designs.json";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HookForm() {
  const {
    handleSubmit,
    register,
    watch,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  const [sizes, setSizes] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [minted, setMinted] = useState("false");

  useEffect(() => {
    // storing input name
    let already_minted = localStorage.getItem("minted");
    if (already_minted == "true") {
      setMinted("true");
    }
  }, []);

  const watchFields = watch(["design"]);

  let onSubmit = async (values) => {
    try {
      let data = {
        size: values.size.toLowerCase(),
        model: values.design,
        recipient: values.address,
      };

      let res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/mint",
        data
      );

      if (res.data.transactionHash !== undefined) {
        localStorage.setItem("minted", "true");
        setSuccess(res.data.transactionHash);
      } else {
        throw new Error("Address already minted");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      let message = "Address already minted";
      if (error.response.data !== undefined) {
        message = error.response.data.error;
      }
      setError(message);
    }
  };

  let loadSizes = (design_id) => {
    setSizes([]);
    let design = designs.find((el) => el.id === design_id);

    if (design !== undefined) {
      setSizes(design.sizes);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "design") {
        resetField("size");
        loadSizes(value.design);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  if (minted === "true") {
    return (
      <Flex direction="column" justify="center" align="center" maxW="300px">
        <Alert status="success">
          <AlertIcon />
          You have already minted the NFT!
        </Alert>
      </Flex>
    );
  }

  if (success !== null) {
    return (
      <Flex direction="column" justify="center" align="center" maxW="300px">
        <Alert status="success">
          <AlertIcon />
          <Link href={"https://www.mintscan.io/stargaze/txs/" + success}>
            Minted! Check the tx 🚀
          </Link>
        </Alert>
      </Flex>
    );
  }

  return (
    <Flex direction="column" justify="center" align="center">
      {error && (
        <Alert status="error" mb="4" maxW="300px">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="20px" isInvalid={errors.design} maxW="300px">
          <FormLabel fontWeight="bold" htmlFor="name">
            Design
          </FormLabel>
          <Select
            bgColor="brand.200"
            borderWidth="2px"
            borderColor="brand.100"
            placeholder="Select Design"
            _hover={{
              borderColor: "brand.300",
            }}
            {...register("design")}
          >
            {designs.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.design && errors.design.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="25px" isInvalid={errors.size} maxW="300px">
          <FormLabel fontWeight="bold" htmlFor="name">
            Size
          </FormLabel>
          <Select
            bgColor="brand.200"
            borderWidth="2px"
            borderColor="brand.100"
            placeholder="Select Size"
            _hover={{
              borderColor: "brand.300",
            }}
            {...register("size")}
          >
            {sizes.map((el) => (
              <option key={el.type} value={el.type}>
                {el.type}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.size && errors.size.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="50px" isInvalid={errors.address}>
          <FormLabel fontWeight="bold" htmlFor="name">
            Address
          </FormLabel>
          <Input
            bgColor="brand.200"
            borderWidth="2px"
            borderColor="brand.100"
            id="address"
            _hover={{
              borderColor: "brand.300",
            }}
            placeholder="stars1..."
            {...register("address", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.address && errors.address.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          bgColor="brand.100"
          color="brand.200"
          isLoading={isSubmitting}
          type="submit"
          width={"100%"}
          _hover={{
            bgColor: "brand.300",
          }}
        >
          Mint NFT
        </Button>
      </form>
    </Flex>
  );
}
