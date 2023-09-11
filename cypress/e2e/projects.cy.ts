//For data origin see @model/mock.js

describe("Skills page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/projects");

		cy.intercept("GET", "/api/skills", [
			"javascript",
			"html",
			"css",
			"node.js"
		])
		cy.intercept("GET", "/api/projects", [
			{
				"id": 1,
				"name": "Backend app",
				"title": "Cupiditate omnis similique magnam libero eligendi, nobis at minima quas dignissimos ipsum, vitae, explicabo, quibusdam hic.",
				"link": "https://www.google.com/",
				"repo": "https://www.github.com/",
				"description": "Fish are aquatic, craniate, gill-bearing animals that \n\tlack limbs with digits. Included in this definition are \n\tthe living hagfish, lampreys, and cartilaginous and bony \n\tfish as well as various extinct related groups. \n\tApproximately 95% of living fish species are ray-finned \n\tfish, belonging to the class Actinopterygii, with around \n\t99% of those being teleosts.",
				"date": "2023 Jan - 2023 Feb",
				"preview": "/images/projects/1/preview.png",
				"skills": [
					"node.js"
				]
			},
			{
				"id": 2,
				"name": "Freestyle page",
				"title": "Omnis assumenda sapiente praesentium doloribus earum laboriosam, temporibus",
				"link": "https://www.google.com/",
				"repo": "https://www.github.com/",
				"description": "Fish are aquatic, craniate, gill-bearing animals that \n\tlack limbs with digits. Included in this definition are \n\tthe living hagfish, lampreys, and cartilaginous and bony \n\tfish as well as various extinct related groups. \n\tApproximately 95% of living fish species are ray-finned \n\tfish, belonging to the class Actinopterygii, with around \n\t99% of those being teleosts.",
				"date": "2023 Feb - 2021 Aug",
				"preview": "/images/projects/2/preview.png",
				"skills": [
					"html", "css"
				]
			},
			{
				"id": 3,
				"name": "Aggregator",
				"title": "Omnis assumenda sapiente praesentium doloribus earum laboriosam, temporibus",
				"link": "https://www.google.com/",
				"repo": "https://www.github.com/",
				"description": "Fish are aquatic, craniate, gill-bearing animals that \n\tlack limbs with digits. Included in this definition are \n\tthe living hagfish, lampreys, and cartilaginous and bony \n\tfish as well as various extinct related groups. \n\tApproximately 95% of living fish species are ray-finned \n\tfish, belonging to the class Actinopterygii, with around \n\t99% of those being teleosts.",
				"date": "2023 Nov - 2022 Nov",
				"preview": "/images/projects/3/preview.png",
				"skills": [
					"javascript"
				]
			}
		])
	})

	it("Should render projects and skills", () => {
		cy.getByTestIdStart("project").should("have.length", 3);
		cy.getByTestIdStart("item").should("have.length", 4);
		
		cy.getByTestId("item-javascript").click();
		cy.getByTestIdStart("project").should("have.length", 1);
		cy.getByTestId("project-3").should("be.visible");
		cy.getByTestId("project-1").should("not.exist");
		
		cy.getByTestId("item-javascript").click();
		cy.getByTestIdStart("project").should("have.length", 3);
		cy.getByTestId("project-1").should("be.visible");
	})

	it("Should render project", () => {
		cy.getByTestId("project-1").within(() => {
			cy.get("h4").click();
		});

		cy.location("pathname").should("equal", "/projects/1");

		cy.get(".title").contains(/nice page/i);

		cy.getByTestId("project-skill").should("have.length", 1);
		cy.getByTestId("project-skill").contains("javascript");

		cy.getByTestIdStart("project-preview-picture").should("have.length", 4);

		cy.getByTestIdPart("test.jpg").should("be.visible");
		cy.getByTestIdPart("test2.jpg").click();
		cy.getByTestId("portal-trigger").within(() => {
			cy.getByTestIdPart("test2.jpg").should("be.visible");
			cy.getByTestIdPart("test.jpg").should("not.exist");
		})

		cy.getByTestId("portal-trigger").click();
		cy.getByTestId("portal-image-full").should("be.visible");
		cy.getByTestId("portal-close").click();
		cy.getByTestId("portal-image-full").should("not.exist");
	})
})