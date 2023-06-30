import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";

const EventEditModal = ({
  isOpen,
  event,
  handleInputChange,
  handleFormSubmit,
  handleCancelClick,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={undefined}
      onClose={handleCancelClick}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Edit Event</AlertDialogHeader>
          <AlertDialogBody>
            <form onSubmit={handleFormSubmit}>
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={event.title}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={event.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="text"
                  name="startTime"
                  value={event.startTime}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="text"
                  name="endTime"
                  value={event.endTime}
                  onChange={handleInputChange}
                />
              </FormControl>
            </form>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button type="submit" onClick={handleFormSubmit} ml={3}>
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default EventEditModal;
