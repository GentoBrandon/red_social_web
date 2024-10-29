import NavBar from "../Nav/NavBar";
import { ReactNode } from 'react';

function Principal({ children }: { children: ReactNode }) {
    return (
        <>
        <NavBar/>
        <main>
            {children}
        </main>
        </>
    )
}
export default Principal;