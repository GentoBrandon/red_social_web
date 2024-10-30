import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import style from '../../styles/Publication.module.css';
function Publication() {
    return (
        <div className={style.publication}>
            <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className={style.btn}>¿Qué estás pensando hoy?</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Crear publicacion </DialogTitle>
                    <Separator/>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Titulo
                        </Label>
                        <Input id="name" className="col-span-3" required/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Descripcion
                        </Label>
                        <Input id="username" className="col-span-3" type="text" required/>
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit">Publicar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            </div>
        </div>
    );
}
export default Publication;