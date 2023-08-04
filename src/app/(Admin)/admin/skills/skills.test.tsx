import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { mockFetchResult } from "@/misc/mockFetch";

jest.mock("axios");
import axios from "axios";

let mockAxios = jest.mocked(axios);

const mockFetch = global.fetch = jest.fn();
mockFetch.mockImplementation((path: string) => {
	if(path === "/api/scopes") return mockFetchResult(["frontend", "backend", "other"]);
	if(path === "/api/skills") return mockFetchResult(["Javascript", "HTML", "CSS"]);
	if(path === "/api/projects") return mockFetchResult([{
		"id": 1,
		"name": "Freestyle page",
	}]);
})

import Skills from "./page";

describe("Skills page", () => {
	beforeEach(() => {
		render(<Skills />)
	})

	afterEach(() => {
		mockAxios.delete.mockRestore();
		mockAxios.post.mockRestore();
	})

	it("Should render", () => {
		const skillsPage = screen.getByText(/skills/i);

		expect(skillsPage).toBeInTheDocument();
	})

	it("Should render skills", () => {
		const html = screen.getByText(/HTML/i);
		const css = screen.getByText(/CSS/i);

		expect(html).toBeInTheDocument();
		expect(css).toBeInTheDocument();
	})

	it("Should render scopes", () => {
		const frontend = screen.getAllByText(/frontend/i);
		const other = screen.getAllByText(/other/i);

		expect(frontend[0]).toBeInTheDocument();
		expect(other[0]).toBeInTheDocument();
	})

	it("Should render skill adding form", () => {
		const skillsPageForm = screen.getByText(/add skill/i);

		expect(skillsPageForm).toBeInTheDocument();
	})

	it("Should remove skill", async () => {
		const removeBtn = screen.getByTestId(/remove-css/i);

		await userEvent.click(removeBtn);

		expect(mockAxios.delete).toBeCalledTimes(1);
		expect(mockAxios.delete).toBeCalledWith("/api/skills/CSS");
	})

	it("Should remove scope", async () => {
		const removeBtn = screen.getByTestId(/remove-item-frontend/i);

		await userEvent.click(removeBtn);

		expect(mockAxios.delete).toBeCalledTimes(1);
		expect(mockAxios.delete).toBeCalledWith("/api/scopes/frontend");
	})

	it("Should add skill", async () => {
		const submit = screen.getByTestId("skill-submit");
		const input = screen.getByTestId("skill-text-input");

		await userEvent.type(input, "docker");
		await userEvent.click(submit);

		expect(axios.post).toBeCalledTimes(1);
		expect(axios.post).toBeCalledWith("/api/skills", {name: "docker", projects: "", scopes: ""});
	})

	it("Should add skill with project and scope", async () => {
		const submit = screen.getByTestId("skill-submit");
		const input = screen.getByTestId("skill-text-input");
		const projectSelect = screen.getByTestId("skill-project-select");
		const scopeSelect = screen.getByTestId("skill-scope-select");

		await userEvent.type(input, "docker");
		await userEvent.selectOptions(scopeSelect, "frontend");
		await userEvent.selectOptions(projectSelect, "1");
		await userEvent.click(submit);

		expect(axios.post).toBeCalledTimes(1);
		expect(axios.post).toBeCalledWith("/api/skills", {name: "docker", projects: ["1"], scopes: ["frontend"]});
	})

	it("Should scope", async () => {
		const submit = screen.getByTestId("scope-submit");

		await userEvent.click(submit); //Open select

		const input = screen.getByTestId("scope-input");
		await userEvent.type(input, "docker");

		await userEvent.click(submit); //Submit

		expect(axios.post).toBeCalledTimes(1);
		expect(axios.post).toBeCalledWith("/api/scopes", { data: "docker" });
	})
})