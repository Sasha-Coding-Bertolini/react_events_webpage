import React, { useState } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventDeleteConfirmation = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleDeleteConfirmation = async () => {
    try {
      const eventResponse = await fetch(
        `http://localhost:3000/events/${eventId}`
      );

      if (eventResponse.ok) {
        const eventData = await eventResponse.json();
        const userId = eventData.createdBy;
        console.log(userId);

        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Event deleted successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });

          const allEventsResponse = await fetch(`http://localhost:3000/events`);
          const allEventsData = await allEventsResponse.json();
          const createdByList = allEventsData.map((event) => event.createdBy);
          console.log(createdByList);

          if (!createdByList.includes(userId)) {
            const userResponse = await fetch(
              `http://localhost:3000/users/${userId}`,
              {
                method: "DELETE",
              }
            );

            if (userResponse.ok) {
              console.log("Deleted user.");
            } else {
              console.log(
                "Error deleting user.",
                userResponse.status,
                userResponse.statusText
              );
              toast.error("Error deleting user...", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          }

          const searchParams = new URLSearchParams();
          searchParams.append("toast", "Event deleted successfully!");
          navigate({
            pathname: "/",
            search: `?${searchParams.toString()}`,
          });
        } else {
          console.log(
            "Error deleting event:",
            response.status,
            response.statusText
          );
          toast.error("Error deleting event...", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        console.log("Event not found:", eventResponse.status);
        toast.error("Event not found...", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <Button
        colorScheme="red"
        onClick={() => setIsConfirmationOpen(true)}
        marginTop={3}
      >
        Delete Event
      </Button>
      <AlertDialog
        isOpen={isConfirmationOpen}
        leastDestructiveRef={undefined}
        onClose={handleCloseConfirmation}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this event? This action is
              irreversible.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCloseConfirmation}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteConfirmation}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EventDeleteConfirmation;
