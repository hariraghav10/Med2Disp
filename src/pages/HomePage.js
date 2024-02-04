import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Header from '../comp/Header'
import PillDetail from "../comp/PillDetail";
import PillsList from "../comp/PillsList";
export default function HomePage() {

    return(

        <>
           <Header title="Pills in the Dispenser"></Header>
           <div style={{width:'90%', margin:"auto"}}>
                <PillsList></PillsList>
           </div>
            

        </>

    )}