import { fetchHolidays } from "@/api/holiday.api";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "./home-page";

vi.mock("@/api/holiday.api", () => ({
  fetchHolidays: vi.fn().mockResolvedValue([
    {
      name: "New Year's Day",
      date: "2023-01-01",
      observed: "2023-01-02",
      public: true,
      country: "PH",
      uuid: "f8da151e-8953-45f7-8b13-6d847887440e",
    },
  ]),
}));
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: vi.fn(),
  }),
}));
vi.mock("@apollo/client", () => ({
  useQuery: () => ({
    loading: false,
    data: { events: [] },
  }),
  useMutation: () => [vi.fn(), {}],
  gql: vi.fn(),
}));

vi.mock("@/hooks/use-create-modal", () => ({
  useCreateModal: () => ({
    onOpen: vi.fn(),
  }),
}));

describe("HomePage Component", () => {
  it("renders HomePage correctly", () => {
    render(<HomePage />);

    const calendarComponent = screen.getByTestId("calendar");
    const comboBoxComponent = screen.getByRole("combobox");
    const cardListComponent = screen.getByTestId("card-list");
    expect(calendarComponent).toBeInTheDocument();
    expect(comboBoxComponent).toBeInTheDocument();
    expect(cardListComponent).toBeInTheDocument();
  });

  it("fetches holidays api", () => {
    render(<HomePage />);
    const comboBoxComponent = screen.getByRole("combobox");

    fireEvent.change(comboBoxComponent, { target: { value: "2023" } });

    expect(fetchHolidays).toHaveBeenCalledWith({ country: "PH", year: "2023" });
  });

  it("opens modal when plus button is clicked", async () => {
    render(<HomePage />);
    const onOpen = vi.fn();
    const btnNewEvent = screen.getByTestId("new-event-btn");
    btnNewEvent.onclick = onOpen;
    fireEvent.click(btnNewEvent);

    expect(btnNewEvent).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalled();
  });
});
