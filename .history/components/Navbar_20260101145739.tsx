[{
	"resource": "/C:/Users/Windows-SSD/Desktop/mood-matrix/components/Navbar.tsx",
	"owner": "eslint1",
	"code": "react-hooks/static-components",
	"severity": 8,
	"message": "Error: Cannot create components during render\n\nComponents created during render will reset their state each time they are created. Declare components outside of render.\n\nC:\\Users\\Windows-SSD\\Desktop\\mood-matrix\\components\\Navbar.tsx:46:12\n  44 |         {/* === DESKTOP MENU (Escondido no Mobile) === */}\n  45 |         <div className=\"hidden md:flex items-center gap-6 font-poppins\">\n> 46 |           <NavLink href=\"/\">Início</NavLink>\n     |            ^^^^^^^ This component is created during render\n  47 |           <NavLink href=\"/dashboard\">Dashboard</NavLink>\n  48 |           <NavLink href=\"#sobre\">Sobre</NavLink>\n  49 |         </div>\n\nC:\\Users\\Windows-SSD\\Desktop\\mood-matrix\\components\\Navbar.tsx:11:19\n   9 |\n  10 |   // Componente auxiliar para o Link com a animação de sublinhado\n> 11 |   const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (\n     |                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n> 12 |     <Link \n     | ^^^^^^^^^^\n> 13 |       href={href} \n     …\n     | ^^^^^^^^^^\n> 25 |     </Link>\n     | ^^^^^^^^^^\n> 26 |   );\n     | ^^^^ The component is created during render here\n  27 |\n  28 |   return (\n  29 |     <div className=\"fixed top-6 left-0 w-full flex justify-center z-50\">",
	"source": "eslint",
	"startLineNumber": 46,
	"startColumn": 12,
	"endLineNumber": 46,
	"endColumn": 19,
	"origin": "extHost1"
}]