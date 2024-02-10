import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation Mutation($createEventInput: CreateEventInput!) {
    createEvent(input: $createEventInput) {
      id
      userId
      title
      description
      date
      createdAt
      updatedAt
      completed
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation Mutation($updateEventInput: UpdateEventInput!) {
    updateEvent(input: $updateEventInput) {
      id
      userId
      title
      description
      date
      createdAt
      updatedAt
      completed
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation Remove($removeEventId: Int!) {
    removeEvent(id: $removeEventId) {
      id
      title
      description
    }
  }
`;

export const GET_EVENT = gql`
  query Query($eventId: Int!) {
    event(id: $eventId) {
      id
      title
      description
      userId
      date
      completed
    }
  }
`;

export const GET_ALL_EVENTS = gql`
  query Events($userId: String!) {
    events(userId: $userId) {
      id
      title
      description
      userId
      date
      completed
    }
  }
`;
