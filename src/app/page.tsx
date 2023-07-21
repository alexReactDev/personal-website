import Backend from "@/components/Backend";
import ContactMe from "@/components/ContactMe";
import Fullscreen from "@/components/Fullscreen";
import Optimizations from "@/components/Optimizations";
import Principles from "@/components/Principles";
import React from "@/components/React";
import Showcase from "@/components/Showcase";

export default function HelloPortfolio() {
	return (
		<>
			<Fullscreen />
			<React />
			<Optimizations />
			<Principles />
			<Showcase />
			<Backend />
			<ContactMe />
		</>
	)
}