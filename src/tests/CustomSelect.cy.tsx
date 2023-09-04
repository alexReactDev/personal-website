import CustomMultipleSelect from "@/components/CustomMultipleSelect"

const optionsMock = [
	{ value: 1, name: "Lorem"},
	{ value: 2, name: "Ipsum"},
	{ value: 3, name: "Dolor"}
]

describe("Custom select", () => {
	it("Should render", () => {
		cy.mount(<CustomMultipleSelect options={[]} value={[]} onChange={() => console.log("Click")} placeholder="Custom select" />);

		cy.getByTestId("custom-select-title").should("be.visible");
		cy.getByTestId("custom-select-title").contains(/custom select/i);
	})

	it("Should render options", () => {
		const stub = cy.stub();

		cy.mount(<CustomMultipleSelect options={optionsMock} value={[2]} onChange={stub} placeholder="Custom select" />);

		//Should have title of selected option
		cy.getByTestId("custom-select-title").contains(/ipsum/i);

		cy.getByTestId("custom-select-title").click();
		cy.get('[data-testid^="custom-select-option"]').should("be.visible").should("have.length", 3);

		//Should be selected
		cy.getByTestId("custom-select-option-2").find("img").should("be.visible");

		expect(stub).not.be.calledOnce;
		cy.getByTestId("custom-select-option-3").click().then(() => {
			expect(stub).be.calledOnce;
			expect(stub).be.calledWith([3, 2]);
		});
	})
})