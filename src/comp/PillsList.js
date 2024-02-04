import PillDetail from "../comp/PillDetail";
import {pilldata} from '../data/pillsdata.js'
export default function HomePage() {
return(
    <div>
        {
        pilldata.data.map( pill=>(
            <PillDetail data={pill}></PillDetail>
        ))
        }
    
    </div>
    
)

}