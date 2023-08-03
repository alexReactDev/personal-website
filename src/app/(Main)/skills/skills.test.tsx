import Skills from "./page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { mockFetchResult } from "@/misc/mockFetch";

const mockFetch = global.fetch = jest.fn();
mockFetch.mockImplementation((path: string) => {
	console.log("CALL")
	if(path === "/api/scopes") return mockFetchResult(["frontend", "backend", "other"]);
	if(path === "/api/skills/withscopes") return mockFetchResult([
		{
		"name": "Javascript ES6+",
		"scopes": [
		  "frontend", "backend"
		]
	  },
	  {
		"name": "Node.js",
		"scopes": [
		  "backend"
		]
	  },
	  {
		"name": "SCSS",
		"scopes": [
		  "frontend"
		]
	  },
	  {
		"name": "Docker",
		"scopes": [
		  "other"
		]
	  }
	])
});

describe("Skills page", () => {

	beforeEach(() => {
		render(<Skills />);
	})

	it("Should render", () => {
		const SkillsPage = screen.getByText(/my skills/i);

		expect(SkillsPage).toBeInTheDocumentquery
	})

	it("Should display skills by scope", async () => {
		const scopeCheckbox = await screen.findByText(/frontend/i);

		await userEvent.click(scopeCheckbox);

		const javascript = await screen.findByText(/javascript/i);
		const scss = await screen.findByText(/scss/i);

		expect(javascript).toBeInTheDocument();
		expect(scss).toBeInTheDocument();
	})

	it("Should display skills out of selected scopes", async () => {
		const scopeCheckbox = await screen.findByText(/other/i);

		await userEvent.click(scopeCheckbox);

		const docker = screen.getByText(/docker/i);
		const scss = screen.queryByText(/scss/i);

		expect(docker).toBeInTheDocument();
		expect(scss).not.toBeInTheDocument();
	})
})