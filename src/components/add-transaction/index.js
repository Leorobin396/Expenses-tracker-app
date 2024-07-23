import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Select,
  } from "@chakra-ui/react";
  import { useContext } from "react";
  import { GlobalContext } from "../../context";
  
  export default function TransactionForm({ onClose, isOpen }) {
    const { formData, setFormData, value, setValue, handleFormSubmit } = useContext(GlobalContext);
  
    function handleFormChange(event) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  
    function handleRadioChange(value) {
      setValue(value); // Update the local state for the radio group
      setFormData({
        ...formData,
        type: value, // Ensure formData type is updated
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      
      // Check if description is empty and set it to the selected category if so
      const updatedFormData = {
        ...formData,
        description: formData.description || formData.category,
      };
  
      handleFormSubmit(updatedFormData);
  
      // Clear form data after submitting
      setFormData({
        type: "income",
        amount: 0,
        description: "",
        date: "",
        category: "Food"
      });
  
      // Close the modal
      onClose();
    }
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Enter Description</FormLabel>
                <Input
                  placeholder="Enter Transaction description"
                  name="description"
                  type="text"
                  onChange={handleFormChange}
                  value={formData.description}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Enter Amount</FormLabel>
                <Input
                  placeholder="Enter Transaction amount"
                  name="amount"
                  type="number"
                  onChange={handleFormChange}
                  value={formData.amount}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Enter Date</FormLabel>
                <Input
                  placeholder="Enter Transaction date"
                  name="date"
                  type="date"
                  onChange={handleFormChange}
                  value={formData.date}
                />
              </FormControl>
              <FormControl mb={4}>
                    <FormLabel>Select Category</FormLabel>
                    <Select name="category" onChange={handleFormChange} value={formData.category}>
                        <option value="Groceries">Groceries</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Dining Out">Dining Out</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Rent/Mortgage">Rent/Mortgage</option>
                        <option value="Education">Education</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Personal Care">Personal Care</option>
                    </Select>
                    </FormControl>

              <RadioGroup mt={5} value={value} onChange={handleRadioChange}>
                <Radio value="income" colorScheme="blue">
                  Income
                </Radio>
                <Radio value="expense" colorScheme="red">
                  Expense
                </Radio>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button mr={4} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    );
  }
  