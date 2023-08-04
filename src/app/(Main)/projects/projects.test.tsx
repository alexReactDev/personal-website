import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Projects from "./page";
import { mockFetchResult } from "@/misc/mockFetch";

const mockFetch = global.fetch = jest.fn();

mockFetch.mockImplementation((path) => {
	if(path === "/api/skills") return mockFetchResult(["Javascript", "SCSS", "HTML"]);
	if(path === "/api/projects") return mockFetchResult([{
		"id": 1,
		"name": "Mega page",
		"title": "Omnis assumenda sapiente praesentium doloribus earum laboriosam, temporibus",
		"link": "https://www.google.com/",
		"description": "Fish are aquatic, craniate, gill-bearing animals that \n\tlack limbs with digits. Included in this definition are \n\tthe living hagfish, lampreys, and cartilaginous and bony \n\tfish as well as various extinct related groups. \n\tApproximately 95% of living fish species are ray-finned \n\tfish, belonging to the class Actinopterygii, with around \n\t99% of those being teleosts.",
		"date": "2022 Oct - 2022 Jan",
		"preview": "/images/projects/1/preview.png",
		"skills": [
		  "HTML"
		]
	  },
	  {
		"id": 2,
		"name": "Freestyle page",
		"title": "Omnis assumenda sapiente praesentium doloribus earum laboriosam, temporibus",
		"link": "https://www.google.com/",
		"description": "Fish are aquatic, craniate, gill-bearing animals that \n\tlack limbs with digits. Included in this definition are \n\tthe living hagfish, lampreys, and cartilaginous and bony \n\tfish as well as various extinct related groups. \n\tApproximately 95% of living fish species are ray-finned \n\tfish, belonging to the class Actinopterygii, with around \n\t99% of those being teleosts.",
		"date": "2022 Oct - 2022 Jan",
		"preview": "/images/projects/1/preview.png",
		"skills": [
		  "Javascript"
		]
	  },
	  {
		"id": 3,
		"name": "Stylish page",
		"title": "Omnis assumenda sapiente praesentium doloribus earum laboriosam, temporibus",
		"link": "https://www.google.com/",
		"description": "Fish are aquatic, craniate, gill-bearing animals that \n\tlack limbs with digits. Included in this definition are \n\tthe living hagfish, lampreys, and cartilaginous and bony \n\tfish as well as various extinct related groups. \n\tApproximately 95% of living fish species are ray-finned \n\tfish, belonging to the class Actinopterygii, with around \n\t99% of those being teleosts.",
		"date": "2022 Oct - 2022 Jan",
		"preview": "/images/projects/1/preview.png",
		"skills": [
		  "Javascript",
		  "SCSS",
		]
	  }])
});

describe("Projects page", () => {
	beforeEach(() => {
		render(<Projects/>)
	})

	it("Should render", () => {
		const page = screen.getByText(/my projects/i);

		expect(page).toBeInTheDocument();
	})

	it("Should render projects by skill", async () => {
		const skill = await screen.findByText(/javascript/i);

		await userEvent.click(skill);

		const project1 = screen.getByText(/freestyle page/i);
		const project2 = screen.getByText(/stylish page/i);

		expect(project1).toBeInTheDocument();
		expect(project2).toBeInTheDocument();
	})

	it("Should not render projects without selected skills", async () => {
		const skill = await screen.findByText(/HTML/i);

		await userEvent.click(skill);

		const project1 = screen.getByText(/mega page/i);
		const project2 = screen.queryByText(/stylish page/i);

		expect(project1).toBeInTheDocument();
		expect(project2).not.toBeInTheDocument();
	})
})