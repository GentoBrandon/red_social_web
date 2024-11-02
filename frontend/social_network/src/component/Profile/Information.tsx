import { Separator } from "@/components/ui/separator";
import EditProfile from "@/component/Profile/EditProfile";
import style from "../../styles/Profile/Information.module.css";

function Information() {
    return (
        <div>
            <h1>Information Brandon Gento</h1>
            <div>
                <img src="/avatar.png" alt="Usuario" className={style.img} />
                <div>
                    <h2 className={style.h2}>Nombre</h2 >
                    <p>Brandon Gento</p>
                </div>
            </div>
            <Separator/>
            <div>
                <img src="/location.png" alt="Direecion" className={style.img}/>
                <div>
                    <h2 className={style.h2}>Direccion</h2 >
                    <p>Retalhuleu</p>
                </div>
            </div>
            <Separator/>
            <div>
                <img src="/phone.png" alt="Numero de telefono" className={style.img} />   
                <div>
                    <h2 className={style.h2}>Numero de telefono</h2 >
                    <p>+502 58400144</p>
                </div>
            </div>
            <Separator/>
            <div>
                <img src="/job.png" alt="Trabajo" className={style.img} />
                <div>
                    <h2 className={style.h2}>Trabajo</h2 >
                    <p>Brandon Gento</p>
                </div>
            </div>
            <Separator/>
            <div>
                <img src="/school.png" alt="Universidad" className={style.img}/>
                <h2 className={style.h2}>Universidad</h2 >
                <div>
                    <p>Universidad Mariano Galvez</p>
                </div>
            </div>
            <Separator/>
            <div className={style.btn}>
                <EditProfile />
            </div>

        </div>
    );
}
export default Information;