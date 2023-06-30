import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const EventModal = ({
  categories,
  isModalOpen,
  handleModalClose,
  handleFormSubmit,
  handleInputChange,
  newEvent,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Event</ModalHeader>
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <FormControl mb={4}>
              <FormLabel>Created By</FormLabel>
              <Input
                name="createdBy"
                value={newEvent.createdBy}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Creator Image URL</FormLabel>
              <Input
                name="userImage"
                value={newEvent.userImage}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="image"
                value={newEvent.image}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                name="startTime"
                value={newEvent.startTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                name="endTime"
                value={newEvent.endTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Categories</FormLabel>
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  value={category.id}
                  isChecked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </FormControl>
            <Button type="submit">Add</Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleModalClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
