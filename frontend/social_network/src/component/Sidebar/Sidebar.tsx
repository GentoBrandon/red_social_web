// components/Sidebar.js
import style from "../../styles/Publication.module.css";
export default function Sidebar() {
  return (
      <aside className={`w-64 h-full bg-gray-800 text-white flex flex-col p-4 fixed top-16 right-0 ${style.sideBar}`}>
        <ul>
          <li className="py-2">Inicio</li>
          <li className="py-2">Amigos</li>
          <li className="py-2">Notificaciones</li>
          <li className="py-2">Perfil</li>
        </ul>
      </aside>
  );
}
