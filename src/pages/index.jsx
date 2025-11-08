import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import NotFound from "./NotFound";
import { Home } from "./Home";
import Participantes from "./Participantes";
import Agregar from "./Agregar";
import Buscar from "./Buscar";
import Gafet from "./Gafet";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic />,
        errorElement: <NotFound></NotFound>,
        children:[
            {
                path: "/",
                index: true,
                element: <Home></Home>
            },
            {
                path: "/participantes",
                element: <Participantes></Participantes>
            },
            
            {
                path:"/agregar",
                element: <Agregar></Agregar>
            },
            {
                path: "/buscar",
                element: <Buscar></Buscar>
            },
            {
                path: '/gafet/:id',
                element: <Gafet/>
            }
        ]
    }
])