'use client'

import { createContext, useState } from "react"

export const MenuContext = createContext({});

function MenuContextProvider({ children }: { children: React.ReactNode}) {
	const [ isOpen, setIsOpen ] = useState(false);

	function switcher() {
		setIsOpen(!isOpen);
	}

	return (
		<MenuContext.Provider value={{ isOpen, switcher }}>
			{children}
		</MenuContext.Provider>
	)
}

export default MenuContextProvider;