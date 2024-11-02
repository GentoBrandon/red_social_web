import { Separator } from "@/components/ui/separator";
import EditProfile from "@/component/Profile/EditProfile";

function Information() {
    return (
        <div>
            <h1>Information Brandon Gento</h1>
            <div>
                <div>
                    <h3>Nombre</h3>
                    <p>Brandon Gento</p>
                </div>
            </div>
            <div>
                <div>
                    <h3>Direccion</h3>
                    <p>Retalhuleu</p>
                </div>
            </div>
            <div>
                <div>
                    <h3>Numero de telefono</h3>
                    <p>+502 58400144</p>
                </div>
            </div>
            <div>
                <div>
                    <h3>Trabajo</h3>
                    <p>Brandon Gento</p>
                </div>
            </div>
            <div>
                <div>
                    <h3>Universidad</h3>
                    <p>Universidad Mariano Galvez</p>
                </div>
            </div>
            <div>
                <EditProfile />
            </div>

        </div>
    );
}
export default Information;